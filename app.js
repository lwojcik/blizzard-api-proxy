/**
 * @file    Main application file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');

const config = require('./config/app');
const database = require('./config/database');
const ssl = require('./config/ssl');

const app = express();

mongoose.connect(database.url, { useMongoClient: true });
mongoose.Promise = global.Promise;

/** Compression middleware */
app.use(compression());

/** Body parsing middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Securing the app by setting various HTTP headers */
app.use(helmet());

/** Applying JSON indentation for development environment */
if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

/** Routes */
require('./routes')(app);

/** SSL configuration */
const options = {
  key: fs.readFileSync(ssl.key),
  cert: fs.readFileSync(ssl.cert),
};

/** App server creation */
module.exports = https.createServer(options, app).listen(config.port, () => {
  console.log(`Started at port ${config.port}`); // eslint-disable-line no-console
});
