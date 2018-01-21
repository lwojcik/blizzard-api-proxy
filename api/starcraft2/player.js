/**
 * @file    StarCraft 2 player data retrieval functions.
 *
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

// const Joi = require('joi');

const bnetConfig = require('../../config/api/battlenet');
const sc2Config = require('../../config/games/starcraft2');
const bnetApi = require('../../api/battlenet');
const ladderApi = require('./ladder');

/**
 * Player object validator.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
 * @returns {(boolean|Object)} true if validation passed, error object if validation failed.
 */
// const validatePlayerObject = (playerObject) => {
//   const playerObjectSchema = Joi.object().keys({
//     server: Joi.any().valid(bnetConfig.servers).required(),
//     id: Joi.number().integer().positive().required(),
//     region: Joi.number().integer().min(0).max(5)
//       .required(),
//     name: Joi.string().alphanum().max(12).required(),
//   });

//   const result = Joi.validate(playerObject, playerObjectSchema);

//   if (result.error === null) {
//     return true;
//   }

//   return {
//     error: 'validation_failed',
//     details: result.error.details,
//   };
// };

/**
 * General method for fetching StarCraft 2 player data available with Battle.net API key.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {Object} player - Player object including server, id, region and name.
 */
const getSc2PlayerData = (resource, player) => {
  const {
    server, id, region, name // eslint-disable-line comma-dangle
  } = player;

  return new Promise((resolve, reject) => {
    // const isPlayerObjectValid = validatePlayerObject(player);

    // if (isPlayerObjectValid === true) {
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
 * @param {function} callback - Callback function to pass the data to.
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
 * @param {function} callback - Callback function to pass the data to.
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
 * @param {function} callback - Callback function to pass the data to.
 */
// const selectTopLadder = (ladderData) => {
//   const ladders = ladderData.data;
//   return ladders.sort((a, b) => a.data.rating - b.data.rating)[ladders.length - 1];
// };

/**
 * Fetches StarCraft 2 player ladders data.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
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
 * @param {string} server - Server name abbreviation.
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMatches = player => new Promise((resolve, reject) => {
  getSc2PlayerData('matches', player)
    .then(data => resolve(data))
    .catch(error => reject(error));
});

/**
 * Extracts StarCraft 2 player data from ladder object.
 * @function
 * @param {Object} ladder - Ladder object.
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const extractLadderIds = ladderData => ladderData.map(ladder => ladder.ladderId);

/**
 * Fetches StarCraft 2 ladder data by provided id parameter.
 * @function
 * @param {Object} ladder - Ladder object.
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
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
 * Extracts StarCraft 2 player data from ladder object.
 * @function
 * @param {Object} ladder - Ladder object.
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const extractLadderObjectsByIds = (server, playerId, ladderIds) => {
  const ladderObjects = ladderIds.map(ladderId => getLadderObjectById(server, ladderId));

  return Promise.all(ladderObjects)
    .then(results => results)
    .catch(error => error);
};

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

const filterPlayerObjectsByFilterType = (playerObjects, filter) => {
  const filterType = filter.toUpperCase();
  let filteredPlayerObjects;
  switch (filterType) {
    case 'ALL':
      filteredPlayerObjects = playerObjects;
      break;
    case 'TOP':
      filteredPlayerObjects = playerObjects;
      break;
    default:
      filteredPlayerObjects = { error: 'Wrong filter type provided' };
  }

  return filteredPlayerObjects;
  // return {
  //   mode: filter,
  //   data: playerObjects
  // };
};

/**
 * Fetches StarCraft 2 player ladder data including MMR.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMMR = (mode, filter, player) => {
  const { server, id } = player;

  return new Promise((resolve, reject) => {
    getSc2PlayerData('ladders', player)
      .then(playerLadders => filterLaddersByMode(playerLadders, mode))
      .then(filteredPlayerLadders => extractLadderIds(filteredPlayerLadders))
      .then(extractedLadderIds => extractLadderObjectsByIds(server, id, extractedLadderIds))
      .then(extractedLadderObjects => extractPlayerObjectsFromLadders(extractedLadderObjects, id))
      .then(extractedPlayerData => filterPlayerObjectsByFilterType(extractedPlayerData, filter))
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

module.exports = {
  getPlayerProfile,
  getPlayerLadders,
  getPlayerMatches,
  getPlayerMMR,
};
