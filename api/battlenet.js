const https = require('https');
const bnetConfig = require('../config/api/battlenet');

const query = (requestServer, requestPath, callback) => {
  const requestOptions = {
    hostname: requestServer,
    port: bnetConfig.api.port,
    path: requestPath,
  };

  const requestCallback = (response) => {
    let stringResponse = '';

    response.on('data', (chunk) => {
      stringResponse += chunk;
    });

    response.on('error', (err) => {
      callback(err);
    });

    response.on('end', () => {
      const returnedData = JSON.parse(stringResponse);
      callback(returnedData);
    });
  };

  const request = https.get(requestOptions, requestCallback);

  request.on('error', (err) => {
    callback(err);
  });

  request.end();
};

module.exports = {
  query,
};
