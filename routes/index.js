var express = require('express');
var router = express.Router();

//Routing de la page d'accueil
module.exports = function(app){
  app.get('/', async (req, res)=>{
    const lessVote = await fetch("http://localhost:3000/voirMoinsVote").then(response => response.json());
  
    const images1 = await fetch("http://localhost:3000/getImagesCateg/1").then(response => response.json());
    const images2 = await fetch("http://localhost:3000/getImagesCateg/2").then(response => response.json());
    const images3 = await fetch("http://localhost:3000/getImagesCateg/3").then(response => response.json());
    const images4 = await fetch("http://localhost:3000/getImagesCateg/4").then(response => response.json());
  
    const connected = req.cookies['user'];
    res.render("index", {title: "Votifoto", data1: images1 , data2: images2 , data3: images3 , data4: images4 , lessVote : lessVote, connected: connected});
  })
}
