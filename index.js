// const express = require('express');
// let app= express();

let app = require('express')();
const Liste = require('./data/liste')

app.listen(3000 , () =>{
    console.log('Serveur lancé sur le port 3000')
});

app.use('/pages', require('express').static('./client/pages'));
app.use('/assets', require('express').static('./client/assets'));
app.use(require('express').json());

app.get('/', (req,res) =>{
    res.sendFile(__dirname+'/client/index.html');
});
app.get('/liste', (req,res)=>{
    res.send(Liste);
});
app.post('/liste', (req, res) => {
    Liste.push(req.body);
    res.send(Liste);
  });

app.put('/liste', (req,res)=>{
    Liste.forEach( element => {
        if(element.id == req.body.id){
            element.name = req.body.name;
            element.firstName=req.body.firstName;
            element.adherent=req.body.adherent;
        }
    })
    res.send(Liste);
})

app.delete('/liste' , (req ,res)=>{
        Liste.splice(Number(req.body.id)-1 , 1);
        console.log(Liste);
        res.send(Liste);
})
