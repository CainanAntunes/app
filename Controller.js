const express=require('express');
const cors=require('cors');
const bodyParses=require('body-parser');
const models=require('./models');
const { response } = require('express');
const QRCode = require('qrcode');
const {Expo} = require('expo-server-sdk');
const exphbs  = require('express-handlebars');

const app=express();
app.use(cors());
app.use(bodyParses.urlencoded({extended: false}));
app.use(bodyParses.json());
app.use(express.static('assets'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
let user=models.User;
let traking=models.Traking;
let product=models.Product;
let token=models.Token;
let expo = new Expo();

//login
app.post('/login', async (req,res)=>{
    let response = await user.findOne({
        where: {name:req.body.name, password:req.body.password}
    });
    console.log(response);
    if(response === null)
    {
        res.send(JSON.stringify('error'));
    }
    else
    {
        res.send(response);
    }
});

//alteração de senha
app.post('/verifyPass',async (req,res)=>{
    let response = await user.findOne({
        where: {id:req.body.id, password:req.body.senhaAntiga}
    });
    console.log(response);
    if(response === null)
    {
        res.send(JSON.stringify('Senha antiga inválida'));
    }
    else
    {
        if(req.body.novaSenha === req.body.confNovaSenha)
        {
            response.password=req.body.novaSenha;
            response.save();
            res.send(JSON.stringify('Senha atualizada com sucesso!'));
        }else{
            res.send(JSON.stringify('Os campos Nova Senha e Confirmação são diferentes!'));
        }
        
    }
    console.log(req.body);
});

//Criação do produto no banco
app.post('/create',async (req,res)=>{
    let trakingId='';
   await traking.create({
     userId: req.body.userId,
       code: req.body.code,
       local: req.body.local
   }).then((response)=>{
       trakingId+=response.id;
   });

   await product.create({
       trakingId: trakingId,
       name: req.body.product
   });

   QRCode.toDataURL(req.body.code).then(url=>{
        QRCode.toFile(
            './assets/img/code.png',
            req.body.code
        );
        res.send(JSON.stringify(url));
    })

});

//Pegar os dados do produto
app.post('/searchProduct', async (req,res)=>{
    let response=await traking.findOne({
        include:[{model:product}],
        where: {code: req.body.code}
    });
    res.send(JSON.stringify(response));
});

//Update dos dados da mercadoria
app.post('/update', async (req,res)=>{
    let response=await traking.findOne({
        where: {code: req.body.code},
        include: [{all:true}]
    });
    response.local=req.body.local;
    response.updatedAt=new Date();
    response.Products[0].name=req.body.product;
    response.save();
    response.Products[0].save();
    res.send(JSON.stringify('Dados foram atualizados com sucesso!'));
 });

//Exibir o local do rastreio
app.post('/rastreio', async (req,res)=>{
    let response=await traking.findOne({
        where:{code:req.body.code}
    });
    if(response === null){
        res.send(JSON.stringify(`Nenhum produto encontrado`));
    }else{
        res.send(JSON.stringify(`Sua encomenda,já está a caminho. Localização: ${response.local}.`));
    }
});


//Grava o token no banco
app.post('/token',async(req,res)=>{
    let response=await token.findOne({
        where:{token:req.body.token}
    });
    if(response == null){
        token.create({
            token: req.body.token,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
});

//View de envio de mensagens
app.get('/',async (req,res)=>{
    let response=await token.findAll({
        raw:true
    });
     res.render('mensagem',{users:response});
 });
 
 app.post('/notifications',async (req,res)=>{
     let messages = [];
     let somePushTokens=[];
 
     if(req.body.recipient == ""){
         let response=await token.findAll({
             raw: true
         });
         response.map((elem,ind,obj)=>{
             somePushTokens.push(elem.token);
         });
     }else{
         somePushTokens.push(req.body.recipient);
     }

    for (let pushToken of somePushTokens) {

        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: pushToken,
            sound: 'default',
            title: req.body.title,
            body: req.body.message
        });
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);

                for (let receiptId in receipts) {
                    let { status, message, details } = receipts[receiptId];
                    if (status === 'ok') {
                        continue;
                    } else if (status === 'error') {
                        console.error(
                            `There was an error sending a notification: ${message}`
                        );
                        if (details && details.error) {
                            console.error(`The error code is ${details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});
