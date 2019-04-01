var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const moment = require('moment');

/* GET home page. */
router.use((req, res, next) => {
  // console.log((new Date()));
  // console.log(Date.now().getDay());
  req.currentDay = (moment().format('dddd'));
  req.currentDate = (moment().format('MMMM Do, YYYY'));
  next();
});

router.get('/', function(req, res, next) {
  console.log(req.currentDay);
  console.log(req.currentDate);
  res.render('index', { title: 'Fortune Cookie', day: req.currentDay, date: req.currentDate});
});

router.get('/fortune', async (req, res) => {
  let randomFortune = await randomFortuneGenerator();
  res.render('fortune', { title: 'Fortune Cookie', day: req.currentDay, date: req.currentDate,fortune: randomFortune});
});

function randomFortuneGenerator (){
  return fetch('http://yerkee.com/api/fortune')
  .then((result) => {
    return result.json();
  })
  .then((jsonData) => {
    console.log (jsonData);
    return jsonData;
  });
}

module.exports = router;
