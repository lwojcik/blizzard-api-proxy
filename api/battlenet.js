/**
 * @file    Battle.net authentication and data retrieval functions.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const fetch = require('node-fetch');
const bnetConfig = require('../config/api/battlenet');

/**
 * General method for fetching data from selected Battle.net endpoint.
 * @function
 * @param {string} requestUri - full URL to request from.
 * @returns {Promise} A promise that returns Battle.net data if resolved and error if rejected.
 */
const query = (requestUri) => {
  const bnetRequestUri = `${requestUri}?apikey=${bnetConfig.api.key}`;

  return new Promise((resolve, reject) => {
    fetch(bnetRequestUri)
      .then(data => resolve(data.json()))
      .catch(error => reject(error));
  });
};

const getAccessTokenObject = (server) => {
  const clientId = bnetConfig.api.key;
  const clientSecret = bnetConfig.api.secret;
  const accessTokenRequestServer = bnetConfig.getAccessTokenUri[server];
  const accessTokenApiPath = `/oauth/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
  const accessTokenRequestUri = `${accessTokenRequestServer}${accessTokenApiPath}`;

  return new Promise((resolve, reject) => {
    fetch(accessTokenRequestUri)
      .then((data) => {
        resolve(data.json());
      })
      .catch(error => reject(error));
  });
};

const getDataWithAccessToken = (accessToken, requestPath) => {
  const requestUri = `${requestPath}?access_token=${accessToken}`;

  return new Promise((resolve, reject) => {
    fetch(requestUri)
      .then(data => resolve(data.json()))
      .catch(error => reject(error));
  });
};

/**
 * Performs access-key authentication and fetches data from protected Battle.net endpoints.
 * @function
 * @param {string} server - server name abbreviation.
 * @param {string} requestPath - Path to request from.
 * @param {function} callback - Callback function to pass the data to.
 */
const queryWithAccessToken = (server, requestPath) => new Promise((resolve, reject) => {
  getAccessTokenObject(server)
    .then((accessTokenObject) => {
      const accessToken = accessTokenObject.access_token;
      const authenticatedRequestUri = bnetConfig.api.url[server];
      const authenticatedRequestPath = `${authenticatedRequestUri}${requestPath}`;

      getDataWithAccessToken(accessToken, authenticatedRequestPath)
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
    .catch(error => reject(error));
});

module.exports = {
  query,
  queryWithAccessToken,
};
