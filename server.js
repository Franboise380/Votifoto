const express = require('express');
const app = express();

//routes

app.get('/', (req, res)=>{
    res.send("hello");
})

app.listen(3000, ()=>{
    console.log("votifoto : port 3000");
})