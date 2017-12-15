'use strict';

const bnetConfig = require('../../config/api/battlenet');
const sc2Config = require('../../config/games/starcraft2');


const bnetApi = require('../../api/battlenet');

const validateParams = (server, profileId, profileRegion, profileName, callback) => {
  // todo: parameter validation to be reused
}

const getPlayerProfile = (server, profileId, profileRegion, profileName, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({ 'error': 'Wrong server (you provided: ' + server + ', available choices: ' +
    bnetConfig.servers.join(', ')
    + ')' });
  }

  const requestServer = bnetConfig.api.url[server];
  
  const requestPath = '/sc2/profile/' + profileId +
    '/' + profileRegion + '/' + profileName +
    '/?apikey=' + bnetConfig.api.key;

  bnetApi.query(requestServer, requestPath, callback);
}

module.exports = {
  getPlayerProfile
};