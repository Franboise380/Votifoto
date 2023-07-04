const User = require('../../models/userModels')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/authenticate', async (req, res) => {
    const user = await User.findOne( { name: req.body.username } );

    if (user == null) {
        return res.status(400).json({message: "cannot find user"});
    }
    try {
        await bcrypt.compare(req.body.password, user.password)
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    res.cookie('user', user.name, { maxAge: 900000, httpOnly: true });

    res.status(200).redirect('/');
})


router.post('/signup', async (req, res) => {
    try {
        if (req.body.password != req.body.vpassword) {
            return res.status(400).redirect('/signup');//json({message: "passwords don't match"});
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