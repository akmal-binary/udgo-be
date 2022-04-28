const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const { data } = require('./routes/v1/data.json');
// const { errorConverter, errorHandler } = require('./middlewares/error');
const Highscore = require('./schemas/highscores')
const ApiError = require('./utils/ApiError');

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'ejs');

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

app.get('/', function (req, res) {
  res.render('index', {});
});

// app.get('/add-highscore', (req, res) => {
//   const random_number = Math.floor(Math.random() * 1000000);
//   const highscore = new Highscore({ 
//     rank: 1,
//     user: `testscoretest${random_number}`,
//     score: 10,
//   })
//   highscore.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// convert error to ApiError, if needed
// app.use(errorConverter);

// handle error
// app.use(errorHandler);

module.exports = app;
