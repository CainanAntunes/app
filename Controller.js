const express=require('express');
const cors=require('cors');
const bodyParses=require('body-parser');
const models=require('./models');
const { response } = require('express');

const app=express();
app.use(cors());
app.use(bodyParses.urlencoded({extended: false}));
app.use(bodyParses.json());
let user=models.User;
let traking=models.Traking;
let product=models.Product;

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

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});
