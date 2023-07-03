const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Image = require('./models/imageModels')
const app = express();
const formidable = require('formidable');
const fsmodule = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use( express.static("public"));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formRouter = require('./routes/form');
const { publicDecrypt } = require('crypto');

app.use('/users', require('./public/javascripts/viewAccount'));
app.use('/login', require('./public/javascripts/login'));

//main page
app.get('/', async (req, res)=>{
    const lessVote = await fetch("http://localhost:3000/voirMoinsVote").then(response => response.json());
    const images = await fetch("http://localhost:3000/getImagesCateg/n").then(response => response.json());
    res.render("index", {title: "Express", data: images , lessVote : lessVote});
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

//second page
app.get('/blog', (req, res)=>{
    res.render("index", {title: "Prout"});
})

//get all image object in base
app.get('/voir', async(req, res)=>{
    try {
        const image = await Image.find({});
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

// get the 5 less voted images (the vote is in the votes field)
app.get('/voirMoinsVote', async(req, res)=> {
    try {
        const image = await Image.find({}).sort({votes: 1}).limit(5);
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/getImagesCateg/:categ', async(req, res)=> {
    try {
        const {categ} = req.params;
        const image = await Image.find({ category: categ});
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//get one image in base by id
app.get('/voir/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findById(id);
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//add an image to base
app.post('/imageRoute', async(req, res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur s\'est produite lors du téléchargement du fichier.');
          }
          
          const file = files.file; // Récupération du fichier téléchargé

          console.log(file);
          console.log(file.filepath);
          console.log(file["filepath"]);
          console.log(file[0]);
          console.log(file[0].filepath);
          console.log(file[0]["filepath"]);
         
          // Chemin où vous souhaitez enregistrer le fichier
          const newPath = 'public/images/' + file[0].newFilename;
          
          // Déplacer le fichier vers le nouvel emplacement
          fsmodule.rename(file[0].filepath, newPath, function(err) {
            if (err) {
              console.error(err);
              return res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement du fichier.');
            }
            
            // Fichier enregistré avec succès
            res.send('Fichier téléchargé et enregistré !');
          });
    });

    /*try {
        const image = await Image.create(req.body)
        res.status(200).redirect("/");
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }*/
})

//update image
app.put('/image/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findByIdAndUpdate(id, req.body);
        if(!image){
            return res.status(404).json({message : "cannot find image"});
        }
        const newimage = await Image.findById(id);
        res.status(200).json(newimage);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete an immage
app.delete('/image/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const image = await Image.findByIdAndDelete(id);
        if(!image){
            return res.status(404).json({message : "cannot find image"});
        }
        res.status(200).json(image);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//connect to database 
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:admin@votifoto.4szd9p7.mongodb.net/voti-node?retryWrites=true&w=majority').then(() => {
    app.listen(3000, ()=>{
        console.log("votifoto : port 3000");
    })
    console.log("yes!");
}).catch(() => {
    console.log(error);
})