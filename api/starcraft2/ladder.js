const bnetConfig = require('../../config/api/battlenet');

const bnetApi = require('../../api/battlenet');

const getLadderData = (server, ladderId, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({
      error: `Wrong server (you provided: ${server}, available choices: ${bnetConfig.servers.join(', ')})`,
    });
  }

  const requestPath = `/sc2/ladder/${ladderId}`;
  bnetApi.queryWithApiKey(server, requestPath, callback);
};

const getAuthenticatedLadderData = (server, ladderId, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({
      error: `Wrong server (you provided: ${server}, available choices: ${bnetConfig.servers.join(', ')})`,
    });
  }

  const requestPath = `/data/sc2/ladder/${ladderId}`;
  bnetApi.queryWithAccessToken(server, requestPath, callback);
};

module.exports = {
  getLadderData,
  getAuthenticatedLadderData,
};
