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

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});
