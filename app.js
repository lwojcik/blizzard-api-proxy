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

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

// routes

require('./routes')(app);

const options = {
  key: fs.readFileSync(ssl.key),
  cert: fs.readFileSync(ssl.cert),
};

module.exports = https.createServer(options, app).listen(config.port, () => {
  console.log(`Started at port ${config.port}`); // eslint-disable-line no-console
});
