const express = require('express');
const { data } = require('./data.json');
const Highscore = require('../../schemas/highscores')

const router = express.Router();

router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get('/data', (req, res) => {
  res.send(JSON.stringify(data));
});

router.get('/retrieve-highscore', (req, res) => {
  const data = req.body.data[0];
  const highscore = new Highscore({
    rank: data.rank,
    name: data.name,
    score: data.score,
  })
  const new_data_object = { data: [highscore] }
  res.send(new_data_object);
});

router.post('/add-highscore', (req, res) => {
  const data = req.body.data[0];
  res.send(data);
  const highscore = new Highscore({
    rank: data.rank,
    name: data.name,
    score: data.score,
  })
  highscore.save();
})

module.exports = router;
