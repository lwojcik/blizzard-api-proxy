/**
 * @fileOverview Battle.net authentication and data retrieval functions.
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const https = require('https');
const bnetConfig = require('../config/api/battlenet');

/**
 * General method for fetching data from selected path of Battle.net endpoint.
 * @function
 * @param {string} requestUri - URL of the request server.
 * @param {string} requestPath - Path to request from.
 * @param {function} callback - Callback function to pass the data to.
 */
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

/**
 * Performs API key authentication and fetches data from protected Battle.net endpoints.
 * @function
 * @param {string} server - Server name abbreviation.
 * @param {string} requestPath - Path to request from.
 * @param {function} callback - Callback function to pass the data to.
 */
const queryWithApiKey = (server, requestPath, callback) => {
  const requestUri = bnetConfig.api.url[server];
  const requestPathWithApiKey = `${requestPath}?apikey=${bnetConfig.api.key}`;

  fetchDataFromBnet(requestUri, requestPathWithApiKey, (returnedData) => {
    callback(returnedData);
  });
};

/**
 * Performs access-key authentication and fetches data from protected Battle.net endpoints.
 * @function
 * @param {string} server - server name abbreviation.
 * @param {string} requestPath - Path to request from.
 * @param {function} callback - Callback function to pass the data to.
 */
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
