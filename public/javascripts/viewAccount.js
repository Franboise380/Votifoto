const User = require('../../models/userModels')
const express = require('express');
const router = express.Router();

//get all user object in base
router.get('/voir', async(req, res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//add an image to base
router.post('/addUser', async(req, res)=>{
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//get one image in base by id
router.get('/voir/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//update image
router.put('/update/:id', async(req, res)=>{
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

module.exports = router;    