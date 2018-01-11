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
// const ladderApi = require('./ladder');

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
 * @param {function} callback - Callback function to pass the data to.
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
            error: 'battlenet_api_error_500',
            details: data,
          });
        } else {
          resolve(data);
        }
      })
      .catch(error => reject(error));
    // } else {
    //   console.log(isPlayerObjectValid);
    // }
  });
};

/**
 * Fetches StarCraft 2 player profile.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerProfile = (player, callback) => {
  getSc2PlayerData('profile', player)
    .then(data => callback(data))
    .catch(error => callback(error));
};

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
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {Object} player - Player object including server, id, region and name.
 */
const getPlayerLadders = (mode, player) => new Promise((resolve, reject) => {
  getSc2PlayerData('ladders', player)
    .then(returnedData => filterLaddersByMode(mode, returnedData))
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
    .then(playerMatches => resolve(playerMatches))
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
 * Extracts StarCraft 2 player data from ladder object.
 * @function
 * @param {Object} ladder - Ladder object.
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const extractPlayerDataByLadderId = (server, ladderIds) => ladderIds;
// const ladderData = [];
// let ladderCounter = 0;

// return ladderIds;

// ladderIds.forEach((ladderId) => {
//   ladderApi.getAuthenticatedLadderData(server, ladderId)
//     .then((ladderObject) => {
//       const ladderLeaderboard = ladderObject.team;
//       const leagueId = ladderObject.league.league_key.league_id;
//       const playerRank = sc2Config.matchMaking.ranks[leagueId];
//       const teamType = ladderObject.league.league_key.team_type;
//       const teamTypeName = sc2Config.matchMaking.teamTypes[teamType];

//       ladderData.push({
//         ladderLeaderboard, leagueId, playerRank, teamType, teamTypeName,
//       });

//       ladderCounter += 1;
//     });

//   if (ladderCounter === ladderIds.length) {
//     return ladderData;
//   }
// });
// };

/**
 * Fetches StarCraft 2 player ladder data including MMR.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {string} filter - How much data should be returned ('ALL' - all, 'TOP' - top ladder only).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMMR = (mode, filter, player, callback) => {
  const { server } = player;

  getSc2PlayerData('ladders', player)
    .then(playerLadders => filterLaddersByMode(playerLadders, mode))
    .then(filteredPlayerLadders => extractLadderIds(filteredPlayerLadders))
    .then(extractedLadderIds => extractPlayerDataByLadderId(server, extractedLadderIds))
    .then(extractedLadderData => callback(extractedLadderData))
    // .then(extractedLadderObjects => callback(extractedLadderObjects))
    // .then(data => callback(data))
    .catch(error => callback(error));

//   // try {
//   getSc2PlayerData('ladders', player)
//     .then((returnedData) => {
//       filterLaddersByMode(mode, returnedData, (laddersFilteredByMode) => {
//         const filteredLadderIds = [];
//         if (laddersFilteredByMode.length === 0) {
//           callback({
//             mode,
//             filter,
//             ladders_found: 0,
//             data: [],
//           });
//         } else if (laddersFilteredByMode.error) {
//           callback(laddersFilteredByMode);
//         } else {
//           // try {
//           laddersFilteredByMode.forEach((ladder) => {
//             filteredLadderIds.push(ladder.ladderId);
//           });

//           let ladderCounter = 0;
//           const filteredLadderData = [];

//           filteredLadderIds.forEach((filteredLadderId) => {
//             ladderApi.getAuthenticatedLadderData(server, filteredLadderId, (ladderObject) => {
//               const ladderLeaderboard = ladderObject.team;
//               const leagueId = ladderObject.league.league_key.league_id;
//               const playerRank = sc2Config.matchMaking.ranks[leagueId];
//               const teamType = ladderObject.league.league_key.team_type;
//               const teamTypeName = sc2Config.matchMaking.teamTypes[teamType];

//               ladderLeaderboard.forEach((playerDataObject) => {
//                 const memberList = playerDataObject.member;

//                 memberList.forEach((member) => {
//                   if (member.character_link.id === Number(id)) {
//                     const mmr = playerDataObject.rating;

//                     filteredLadderData.push({
//                       ladder: {
//                         id: filteredLadderId,
//                         league_id: leagueId,
//                         rank: playerRank,
//                         team_type: teamType,
//                         team_type_name: teamTypeName,
//                         players_in_team: playerDataObject.member.length,
//                       },
//                       player: {
//                         server,
//                         id,
//                         region,
//                         name,
//                         mmr,
//                       },
//                       data: {
//                         rating: playerDataObject.rating,
//                         wins: playerDataObject.wins,
//                         loses: playerDataObject.loses,
//                         ties: playerDataObject.ties,
//                         points: playerDataObject.points,
//                         longest_win_streak: playerDataObject.longest_win_streak,
//                         current_win_streak: playerDataObject.current_win_streak,
//                         current_rank: playerDataObject.current_rank,
//                         highest_rank: playerDataObject.highest_rank,
//                         previous_rank: playerDataObject.previous_rank,
//                         join_time_stamp: playerDataObject.join_time_stamp,
//                         last_played_time_stamp: playerDataObject.last_played_time_stamp,
//                       },
//                       source: playerDataObject,
//                     });
//                   }
//                 });
//               });

//               ladderCounter += 1;

//               if (ladderCounter === filteredLadderIds.length) {
//                 const ladderData = {
//                   mode,
//                   filter,
//                   ladders_found: filteredLadderData.length,
//                   data: filteredLadderData,
//                 };

//                 if (filter.toUpperCase() === 'ALL') {
//                   callback(ladderData);
//                 } else {
//                   selectTopLadder(ladderData, callback);
//                 }
//               }
//             });
//           });
//         // } catch (e) {
//         //   callback({
//   error: 'Can\'t fetch MMR data. One or more URL parameters are missing or malformed.',
//         //   });
//         // }
//         }
//       });
//     })
//     .catch(error => callback(error));
// // } catch (e) {
// //   callback({
// //     error: 'Can\'t fetch MMR data. One or more URL parameters are missing or malformed.',
// //   });
// // }
};

module.exports = {
  getPlayerProfile,
  getPlayerLadders,
  getPlayerMatches,
  getPlayerMMR,
};
