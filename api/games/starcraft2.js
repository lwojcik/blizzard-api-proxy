'use strict';

const bnetConfig = require('../../config/api/battlenet');
const sc2Config = require('../../config/games/starcraft2');

const bnetApi = require('../../api/battlenet');

const getSc2PlayerData = (resource, server, profileId, profileRegion, profileName, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({ 'error': 'Wrong server (you provided: ' + server + ', available choices: ' +
    bnetConfig.servers.join(', ')
    + ')' });
  }

  const requestServer = bnetConfig.api.url[server];
  const requestedResource = (resource == 'profile') ? '' : resource;

  const requestPath = '/sc2/profile/' + profileId +
    '/' + profileRegion + '/' + profileName +
    '/' + requestedResource +
    '?apikey=' + bnetConfig.api.key;

  bnetApi.query(requestServer, requestPath, callback);
}

const getPlayerProfile = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('profile', server, profileId, profileRegion, profileName, callback);
}

const getPlayerLadders = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('ladders', server, profileId, profileRegion, profileName, callback);
}

module.exports = {
  getPlayerProfile,
  getPlayerLadders
};