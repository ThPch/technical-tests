/**====================================*\
 *  DEPENDENCIES CONFIGURATION
 ======================================*/
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const port = process.env.PORT;
const userRouter = require('./src/routers/user');
const User = require('./src/models/User');
const CronJob = require('cron').CronJob;
const util = require("util");
require('./src/db/db');
const cors = require('cors');


/**====================================*\
 *  EXPRESS CONFIGURATION
 ======================================*/
const app = express();

//CORS setup (to cross call from localhost applications)
app.use(cors())

const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
  
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

app.use(userRouter);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});


/**===========================================================================*\
 *  DAILY TASK WHO WILL RESET ALL WORDS COUNTS OF EVERY USER TO 0
 =============================================================================*/
 const job = new CronJob('0 0 * * *', function() {
  User.resetCount();
  util.log(`All word counters have been reset`);
}, null, true)

//Express : ON
app.listen(port, () => {
    console.log(`Lancement du serveur sur le port : ${port}`)
    job.start();
});

