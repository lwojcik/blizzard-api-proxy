'use strict';

const getPlayerProfile = (server, profileId, profileRegion, profileName, callback) => {
  callback('Player profile: /' + server + '/' + profileId + '/' + profileRegion + '/' + profileName);
}

module.exports = {
  getPlayerProfile
};