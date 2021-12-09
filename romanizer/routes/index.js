const express = require('express');
const router = express.Router();
const { controller }  = require('./../controllers/index');
const path = require('path');


router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/html') });
});

router.post('/api/conversion/', controller);

module.exports = router;