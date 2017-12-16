const bnetConfig = require('../../config/api/battlenet');

const bnetApi = require('../../api/battlenet');

const getLadderData = (server, ladderId, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({
      error: `Wrong server (you provided: ${server}, available choices: ${bnetConfig.servers.join(', ')})`,
    });
  }

  const requestServer = bnetConfig.api.url[server];
  const requestPath = `/sc2/ladder/${ladderId}?apikey=${bnetConfig.api.key}`;

  bnetApi.query(requestServer, requestPath, callback);
};

module.exports = {
  getLadderData,
};
