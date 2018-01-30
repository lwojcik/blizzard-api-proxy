/**
 * @file    StarCraft 2 player data retrieval functions.
 *
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const bnetConfig = require('../../config/api/battlenet');
const sc2Config = require('../../config/games/starcraft2');
const bnetApi = require('../../api/battlenet');
const ladderApi = require('./ladder');

/**
 * General method for fetching StarCraft 2 player data available with Battle.net API key.
 * @function
 * @param {string} resource - Name of the Battle.net API resource to fetch.
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {Promise} Promise object representing player data.
 */
const getSc2PlayerData = (resource, player) => {
  const {
    server, id, region, name // eslint-disable-line comma-dangle
  } = player;

  return new Promise((resolve, reject) => {
    const serverUri = bnetConfig.api.url[server];
    const requestedResource = (resource === 'profile') ? '' : resource;
    const requestPath = `/sc2/profile/${id}/${region}/${name}/${requestedResource}`;
    const requestUri = `${serverUri}${requestPath}`;

    bnetApi.query(requestUri)
      .then((data) => {
        if (data.status === 'nok') {
          resolve({
            error: 'battlenet_api_error',
            details: data,
          });
        } else {
          resolve(data);
        }
      })
      .catch(error => reject(error));
  });
};

/**
 * Fetches StarCraft 2 player profile.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {Promise} Promise object representing player profile.
 */
const getPlayerProfile = player => new Promise((resolve, reject) => {
  getSc2PlayerData('profile', player)
    .then(data => resolve(data))
    .catch(error => reject(error));
});

/**
 * Filters ladder data based on matchmaking mode.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {object} ladderData - Ladder data object returned by Blizzard API.
 * @returns {Promise} Promise object representing ladders filtered by provided mode.
 */
const filterLaddersByMode = (ladderData, mode) => {
  const laddersToBeReturned = mode.toUpperCase();

  if (!sc2Config.matchMaking.modes.includes(laddersToBeReturned)) {
    return {
      error: `Wrong mode parameter (you provided: ${laddersToBeReturned}, available choices: ${sc2Config.matchMaking.modes.join(', ')})`,
    };
  }

  return new Promise((resolve, reject) => {
    const selectedModeIndex = sc2Config.matchMaking.modes.indexOf(laddersToBeReturned);
    const selectedQueue = sc2Config.matchMaking.queues[selectedModeIndex];
    const ladders = ladderData.currentSeason;
    const filteredLadders = [];

    if (ladderData.error) {
      reject(ladderData);
    } else {
      ladders.forEach((ladderObject) => {
        const ladder = ladderObject.ladder[0];
        if (selectedQueue === 'ALL') {
          filteredLadders.push(ladder);
        } else if (ladder && ladder.matchMakingQueue === selectedQueue) {
          filteredLadders.push(ladder);
        }
      });
      resolve(filteredLadders.filter(Boolean));
    }
  });
};

/**
 * Returns top player ladder by choosing one with the highest MMR.
 * @function
 * @param {object} ladderData - Ladder data object returned by Blizzard API.
 * @returns {object} Object representing top ladder by MMR.
 */
const selectTopLadder = (ladderObjects) => {
  const ladders = ladderObjects.map(ladderObject => ladderObject.data);
  return ladders.sort((a, b) => a.rating - b.rating)[ladders.length - 1];
};

/**
 * Fetches StarCraft 2 player ladders data.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {Promise} Promise object representing player ladders.
 */
const getPlayerLadders = (mode, player) => new Promise((resolve, reject) => {
  getSc2PlayerData('ladders', player)
    .then(ladders => filterLaddersByMode(ladders, mode))
    .then(filteredLadders => resolve(filteredLadders))
    .catch(error => reject(error));
});

/**
 * Fetches StarCraft 2 player match history.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {Promise} Promise object representing player matches.
 */
const getPlayerMatches = player => new Promise((resolve, reject) => {
  getSc2PlayerData('matches', player)
    .then(data => resolve(data))
    .catch(error => reject(error));
});

/**
 * Extracts StarCraft 2 player data from ladder object.
 * @function
 * @param {Array} ladderData - Array of player ladder objects.
 * @returns {Array} Array of player objects fetched from provided ladders.
 */
const extractLadderIds = ladderData => ladderData.map(ladder => ladder.ladderId);

/**
 * Fetches StarCraft 2 ladder data by provided id parameter.
 * @function
 * @param {String} server - Battle.net server to fetch the data from.
 * @param {Number} ladderId - ID of the ladder to fetch.
 * @returns {Promise} Promise object representing ladder data object.
 */
const getLadderObjectById = (server, ladderId) => new Promise((resolve, reject) => {
  ladderApi.getAuthenticatedLadderData(server, ladderId)
    .then(authenticatedLadderData => resolve({
      ladderId,
      leagueInfo: authenticatedLadderData.league.league_key,
      data: authenticatedLadderData,
    }))
    .catch(error => reject(error));
});

/**
 * Extracts array of ladder objects based on provided array of ladder ids.
 * @function
 * @param {String} server - Battle.net server to fetch the data from.
 * @param {string} ladderIds - array of ladder IDs.
 * @returns {Promise} Promise object representing ladder objects.
 */
const extractLadderObjectsByIds = (server, ladderIds) => {
  const ladderObjects = ladderIds.map(ladderId => getLadderObjectById(server, ladderId));

  return Promise.all(ladderObjects)
    .then(results => results)
    .catch(error => error);
};

/**
 * Extracts player data by their ID from provided ladder objects array.
 * @function
 * @param {String} ladderObjects - array of ladder objects.
 * @param {string} playerId - player ID.
 * @returns {Object} Array of player data objects.
 */
const extractPlayerObjectsFromLadders = (ladderObjects, playerId) => {
  const extractedPlayerObjects = [];

  ladderObjects.forEach((ladderObject) => {
    const ladderData = ladderObject.data.team;

    ladderData.forEach((playerDataObject) => {
      const memberList = playerDataObject.member;

      memberList.forEach((member) => {
        if (member.character_link.id === Number(playerId)) {
          extractedPlayerObjects.push({
            ladderId: ladderObject.ladderId,
            leagueInfo: ladderObject.leagueInfo,
            data: playerDataObject,
          });
        }
      });
    });
  });

  return extractedPlayerObjects;
};

/**
 * Filters an array of player ladder objects based on provided filter.
 * @function
 * @param {Array} playerObjects - Player ladder objects.
 * @param {string} filter - Filter to use ('ALL' for all ladders or 'TOP' for a single top ladder).
 * @returns {Array|Object} Array of all ladder objects or single top ladder object.
 */
const filterPlayerObjectsByFilterType = (playerObjects, filter) => {
  const filterType = filter.toUpperCase();
  let filteredPlayerObjects;
  switch (filterType) {
    case 'ALL':
      filteredPlayerObjects = playerObjects;
      break;
    case 'TOP':
      filteredPlayerObjects = selectTopLadder(playerObjects);
      break;
    default:
      filteredPlayerObjects = { error: 'Wrong filter type provided (expected \'all\' or \'top\')' };
  }

  return filteredPlayerObjects;
};

/**
 * Removes duplicates from ladder ids array in case player
 * has more than one profile in a single division.
 * @function
 * @param {Array} playerObjects - Player ladder objects.
 * @param {string} filter - Filter to use ('ALL' for all ladders or 'TOP' for a single top ladder).
 * @returns {Array} Array of unique ladder ids.
 */
const dedupeLadderIds = ladderIds => Array.from(new Set(ladderIds));

/**
 * Fetches StarCraft 2 player ladder data including MMR.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {Promise} Promise object representing player data including MMR.
 */
const getPlayerMMR = async (mode, filter, player) => {
  try {
    const { server, id } = player;

    const playerLadders = await getSc2PlayerData('ladders', player);
    const filteredPlayerLadders = await filterLaddersByMode(playerLadders, mode);
    const filteredLadderIds = await extractLadderIds(filteredPlayerLadders);
    const uniqueFilteredLadderIds = dedupeLadderIds(filteredLadderIds);
    const extractedLadderObjects = await extractLadderObjectsByIds(server, uniqueFilteredLadderIds);
    const extractedPlayerData = await extractPlayerObjectsFromLadders(extractedLadderObjects, id);
    const playerMMRobject = await filterPlayerObjectsByFilterType(extractedPlayerData, filter);
    return playerMMRobject;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPlayerProfile,
  getPlayerLadders,
  getPlayerMatches,
  getPlayerMMR,
};
