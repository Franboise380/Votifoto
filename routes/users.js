const User = require('../models/userModels')
var express = require('express');
var app = express.Router();

  //Routing de la page cu compte utilisateur
  app.get('/voir', async(req, res)=>{
    try {
        const connected = req.cookies['user'];
        const user = await User.findOne({ name: connected });
        return res.render("viewAccount", {title: "Votre compte", user: user});
    } catch(error){
        res.status(500).json({message: error.message})
    }
  })

  //Routing de création d'un utilisateur
  app.post('/addUser', async(req, res)=>{
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
  })

  //Routing de la page de connexion
  app.get('/login', (req, res) => {
    res.render('login', {title: "Se connecter"});
  })

  //Routing de la page de création de compte
  app.get('/signup', (req, res) => {
    res.render('signup', {title: "Creer son compte"});
  })

  //Routing de déconnexion
  app.post('/disconnect', (req, res)=>{
    const connected = req.cookies['user'];
    if(connected) {
        res.clearCookie("user");
        res.status(200).redirect("/")
    } else {
        res.status(200).redirect("/")
    }
  })

  //Routing de la page de changement de mot-de-passe
  app.get('/changePassword', (req, res)=>{
    res.render('changePassword', {title: "Changement de mot de passe"});
  })


  //Routing de mise a jour d'utilisateurs
  app.put('/update/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message : "cannot find user"});
        }
        const newUser = await User.findById(id);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })

  /*
  //Routing de la recherche d'un user selon l'id
  router.get('/voir/:id', async(req, res)=>{
      try {
          const {id} = req.params;
          const user = await User.findById(id);
          res.status(200).json(user);
      } catch(error){
          res.status(500).json({message: error.message})
      }
  })*/


module.exports = app;

