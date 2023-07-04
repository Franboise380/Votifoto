const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Image = require('./models/imageModels')
const app = express();
const formidable = require('formidable');
const fsmodule = require('fs');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
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

    const images1 = await fetch("http://localhost:3000/getImagesCateg/1").then(response => response.json());
    const images2 = await fetch("http://localhost:3000/getImagesCateg/2").then(response => response.json());
    const images3 = await fetch("http://localhost:3000/getImagesCateg/3").then(response => response.json());
    const images4 = await fetch("http://localhost:3000/getImagesCateg/4").then(response => response.json());

    const connected = req.cookies['user'];
    res.render("index", {title: "Votifoto", data1: images1 , data2: images2 , data3: images3 , data4: images4 , lessVote : lessVote, connected: connected});
})

//main page
app.get('/upload', async (req, res)=>{
    const connected = req.cookies['user'];
    if(connected) {
        res.render("uploadImage", {title: "Ajout d'image"});
    } else {
        res.render("login", {title: "Ajout d'image" , alert: "Vous devez etre coonecté pour publier une image"});
    }
})

//main page
app.get('/uploadError', async (req, res)=>{
    const connected = req.cookies['user'];
    if(connected) {
        res.render("uploadImage", {title: "Ajout d'image", alert: "Seul les images au format png et jpeg sont acceptés"});
    } else {
        res.render("login", {title: "Ajout d'image" , alert: "Vous devez etre coonecté pour publier une image"});
    }
})

app.get('/login', (req, res) => {
    res.render('login', {title: "Se connecter"});
})

app.get('/signup', (req, res) => {
    res.render('signup', {title: "Creer son compte"});
})

app.get('/searchKeyWord', (req, res) => {
    res.render('searchKeyWord', {title: "Recherche - Mot clés"});
})

app.get('/searchResource', (req, res) => {
    res.render('searchResource', {title: "Recherche - Nom"});
})

app.post('/searchResource', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur s\'est produite lors de la recherche');
        }
        try {
            const textField = fields.textfield;
            const name = fields['name'][0];
            const image = await Image.findOne({ name: name});
            if(image){
                res.render("searchResource", {title: "Recherche - Nom", image: image });
            } else {
                res.render("searchResource", {title: "Recherche - Nom", alert: "Cette image n'existe pas" });
            }
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    });
    console.log("oh ?");
    //res.render('searchResource', {title: "Recherche - Nom"});
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
        const image = await Image.find({}).sort( {votes: 1} ).limit(5);
        res.status(200).json(image);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/getImagesCateg/:categ', async(req, res)=> {
    try {
        const {categ} = req.params;
        const image = await Image.find({ category: categ}).sort({votes: -1});
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

app.post('/disconnect', (req, res)=>{
    const connected = req.cookies['user'];
    if(connected) {
        res.clearCookie("user");
        res.status(200).redirect("/")
    } else {
        res.status(200).redirect("/")
    }
})

//add an image to base
app.post('/imageRoute', async(req, res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur s\'est produite lors du téléchargement du fichier.');
          }
          const file = files.file; // Récupération du fichier téléchargé

          if( (file[0].mimetype).split("/")[1] != "png" && (file[0].mimetype).split("/")[1] != "jpeg"){
            return res.status(400).redirect("/uploadError");
          }
         
          // Chemin où vous souhaitez enregistrer le fichier
          const newName = file[0].newFilename + "." + (file[0].mimetype).split("/")[1];
          const newPath = 'public/images/' + newName;
          
          // Déplacer le fichier vers le nouvel emplacement
          fsmodule.rename(file[0].filepath, newPath, async function(err) {
            if (err) {
              console.error(err);
              return res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement du fichier.');
            }
          });
        try {
            const textField = fields.textfield;
            fields['name'] = fields['name'][0];
            fields['category'] = fields['category'][0];
            fields['path'] = newName;
            const image = await Image.create(fields)
            res.status(200).redirect("/");
        } catch(error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    });


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
        console.log("Application Votifoto lancée");
        console.log("Disponible sur le port 3000")
    })
    console.log("Base de donnée : Connectée");
}).catch(() => {
    console.log(error);
})