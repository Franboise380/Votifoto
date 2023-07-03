const User = require('../../models/userModels')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/authenticate', (req, res) => {
    console.log(`oui! :3 ${req.body.username} ${req.body.password}`);
    res.status(200).json( { test: "ok"} );
})

router.post('/signup', async (req, res) => {
    try {
        if (req.body.password != req.body.vpassword) {
            return res.status(400).json({message: "passwords don't match"});
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create( { name: req.body.username, password: hashedPassword } );
        res.status(200).redirect('/');
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

module.exports = router;