'use strict';

const https = require('https');
const bnetConfig = require('../config').battlenet;
const sc2config = require('../config').sc2;

const query = (requestServer, requestPath, callback) => {
  console.log(requestServer);
  console.log(requestPath);
  console.log(callback);

  const requestOptions = {
    hostname: requestServer,
    port: bnetConfig.api.port,
    path: requestPath
  };

  console.log(requestOptions);

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
    return err;
  });
  
  request.end();
}

module.exports = {
  query
};