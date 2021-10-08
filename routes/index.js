var express = require('express');
var router = express.Router();
const axios = require('axios');

const curDate = new Date();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Competition Edit', currentDate: curDate });
});

/**
 * Faz a requisição de cadastro de competição
 */
router.post('/submit', function (req, res, next) {
  // não utilizamos nenhum componente complexo de data
  // construindo a data de inicio
  let dateStarts = new Date();
  dateStarts.setDate(req.body.dateStartsDay);
  dateStarts.setMonth(Number(req.body.dateStartsMonth) - 1);
  dateStarts.setFullYear(req.body.dateStartsYear);
  dateStarts.setHours(req.body.dateStartsHour, req.body.dateStartsMin, 0, 0);
  // construindo a data de término
  let dateFinish = new Date();
  dateFinish.setDate(req.body.dateFinishDay);
  dateFinish.setMonth(Number(req.body.dateFinishMonth) - 1);
  dateFinish.setFullYear(req.body.dateFinishYear);
  dateFinish.setHours(req.body.dateFinishHour, req.body.dateFinishMin, 0, 0);

  // realizando requisição para o serviço (back-end)
  axios
    .post('http://localhost:3000/competitions', {
      sportType: req.body.sportType,
      eventPlace: req.body.eventPlace,
      nation1: req.body.nation1,
      nation2: req.body.nation2,
      stageType: req.body.stageType,
      dateTimeStarts: dateStarts,
      dateTimeFinish: dateFinish
    })
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      return res.redirect('/competitions');
    })
    .catch(error => {
      console.error(error)
    });
});

module.exports = router;
