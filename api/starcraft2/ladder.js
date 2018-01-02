/**
 * @file    StarCraft 2 ladder data retrieval functions.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const bnetConfig = require('../../config/api/battlenet');
const bnetApi = require('../../api/battlenet');

/**
 * Fetches StarCraft 2 ladder data available with Battle.net API key. No MMR info is returned here.
 * @function
 * @param {string} server - Server name abbreviation.
 * @param {number} ladderId - Ladder identifier.
 * @param {function} callback - Callback function to pass the data to.
 */
const getLadderData = (server, ladderId, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({
      error: `Wrong server (you provided: ${server}, available choices: ${bnetConfig.servers.join(', ')})`,
    });
  }

  const requestPath = `/sc2/ladder/${ladderId}`;
  bnetApi.queryWithApiKey(server, requestPath, callback);
};

/**
 * Fetches StarCraft 2 ladder data (including player MMR) with Battle.net access token.
 * @function
 * @param {string} server - Server name abbreviation..
 * @param {number} ladderId - Ladder identifier.
 * @param {function} callback - Callback function to pass the data to.
 */
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
