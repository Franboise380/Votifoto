var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
  enregistrerMessage(req.body.nom, req.body.email, req.body.message)
  .then(valeur => {
  res.setHeader("Content-Type","application/json"); 
  res.send(valeur)
  })
  .catch(error => console.log(error))
});

module.exports = router;
