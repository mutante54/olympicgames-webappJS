var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET competitions listing. */
router.get('/', function (req, res, next) {

  // retorno do request
  let competitionsResponse = [];

  // realizando requisição para o serviço (back-end)
  axios.get('http://localhost:3000/competitions')
    .then(response => {
      competitionsResponse = response.data;
      res.render('competitions', { title: 'Competitions List', competitions: competitionsResponse });
    })
    .catch(error => {
      console.log(error);
    });

});

module.exports = router;
