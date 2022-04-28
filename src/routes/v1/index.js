const express = require('express');
const { data } = require('./data.json');

const router = express.Router();

router.get('/data', (req, res) => {
  res.send(JSON.stringify(data));
});

module.exports = router;
