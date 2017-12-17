const https = require('https');
const bnetConfig = require('../config/api/battlenet');

const fetchDataFromBnet = (requestUri, requestPath, callback) => {
  const requestOptions = {
    hostname: requestUri,
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

const queryWithApiKey = (server, requestPath, callback) => {
  const requestUri = bnetConfig.api.url[server];
  const requestPathWithApiKey = `${requestPath}?apikey=${bnetConfig.api.key}`;

  fetchDataFromBnet(requestUri, requestPathWithApiKey, (returnedData) => {
    callback(returnedData);
  });
};

const queryWithAccessToken = (server, requestPath, callback) => {
  const clientId = bnetConfig.api.key;
  const clientSecret = bnetConfig.api.secret;
  const accessTokenRequestServer = bnetConfig.getAccessTokenUri[server];
  const accessTokenApiPath = `/oauth/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

  fetchDataFromBnet(accessTokenRequestServer, accessTokenApiPath, (returnedData) => {
    const accessToken = returnedData.access_token;
    const authenticatedRequestUri = bnetConfig.api.url[server];
    const authenticatedRequestPath = `${requestPath}?access_token=${accessToken}`;

    fetchDataFromBnet(authenticatedRequestUri, authenticatedRequestPath, (authenticatedData) => {
      callback(authenticatedData);
    });
  });
};

module.exports = {
  queryWithApiKey,
  queryWithAccessToken,
};
