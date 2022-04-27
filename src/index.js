require('dotenv').config();
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const Mongoose = require('mongoose')

// let server;
// TODO: Start Server here
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');
//   server = app.listen(config.port, () => {
//     logger.info(`Listening to port ${config.port}`);
//   });
// });

// connect to MongoDB
const user_name = process.env.DATABASE_USERNAME;
const escape_password = encodeURIComponent(process.env.DATABASE_PASSWORD);
const cluster = process.env.CLUSTER_NAME;
const collection_name = process.env.COLLECTION_NAME;

const dbURI = `mongodb+srv://${user_name}:${escape_password}@${cluster}.mongodb.net/${collection_name}?retryWrites=true&w=majority`;

Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to the database'))
  .catch((error) => console.log(error));

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });
