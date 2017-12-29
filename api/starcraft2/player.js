/**
 * @file    StarCraft 2 player data retrieval functions.
 *
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const bnetConfig = require('../../config/api/battlenet');
const bnetApi = require('../../api/battlenet');

/**
 * General method for fetching StarCraft 2 player data available with Battle.net API key.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getSc2PlayerData = (resource, server, profileId, profileRegion, profileName, callback) => {
  if (!bnetConfig.servers.includes(server)) {
    callback({
      error: `Wrong server (you provided: ${server}, available choices: ${bnetConfig.servers.join(', ')})`,
    });
  }

  const requestedResource = (resource === 'profile') ? '' : resource;
  const requestPath = `/sc2/profile/${profileId}/${profileRegion}/${profileName}/${requestedResource}`;
  bnetApi.queryWithApiKey(server, requestPath, callback);
};

/**
 * Fetches StarCraft 2 player profile.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerProfile = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('profile', server, profileId, profileRegion, profileName, callback);
};

/**
 * Fetches StarCraft 2 player ladder data.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerLadders = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('ladders', server, profileId, profileRegion, profileName, callback);
};

/**
 * Fetches StarCraft 2 player match history.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMatches = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('matches', server, profileId, profileRegion, profileName, callback);
};

module.exports = {
  getPlayerProfile,
  getPlayerLadders,
  getPlayerMatches,
};
