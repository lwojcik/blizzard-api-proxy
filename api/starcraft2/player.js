/**
 * @file    StarCraft 2 player data retrieval functions.
 *
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const Joi = require('joi');

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
const validatePlayerObject = (playerObject) => {
  const playerObjectSchema = Joi.object().keys({
    server: Joi.any().valid(bnetConfig.servers).required(),
    id: Joi.number().integer().positive().required(),
    region: Joi.number().integer().min(0).max(5)
      .required(),
    name: Joi.string().alphanum().max(12).required(),
  });

  const result = Joi.validate(playerObject, playerObjectSchema);

  if (result.error === null) {
    return true;
  }

  return {
    error: 'validation_failed',
    details: result.error.details,
  };
};

/**
 * General method for fetching StarCraft 2 player data available with Battle.net API key.
 * @function
 * @param {string} resource - Name of the resource to fetch.
 * @param {string} server - Server name abbreviation.
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getSc2PlayerData = (resource, player, callback) => {
  const {
    server, id, region, name // eslint-disable-line comma-dangle
  } = player;

  const isPlayerObjectValid = validatePlayerObject(player);

  if (isPlayerObjectValid === true) {
    const requestedResource = (resource === 'profile') ? '' : resource;
    const requestPath = `/sc2/profile/${id}/${region}/${name}/${requestedResource}`;
    bnetApi.queryWithApiKey(server, requestPath, (returnedData) => {
      if (returnedData.status === 'nok') {
        callback({
          error: 'battlenet_api_error_500',
          details: returnedData,
        });
      } else {
        callback(returnedData);
      }
    });
  } else {
    callback(isPlayerObjectValid);
  }
};

/**
 * Fetches StarCraft 2 player profile.
 * @function
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerProfile = (player, callback) => {
  getSc2PlayerData('profile', player, callback);
};

/**
 * Filters returned ladder data based on the provided parameter.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {object} ladderData - Ladder data object returned by Blizzard API.
 * @param {function} callback - Callback function to pass the data to.
 */
const filterLaddersByMode = (mode, ladderData, callback) => {
  const laddersToBeReturned = mode.toUpperCase();

  if (!sc2Config.matchMaking.modes.includes(laddersToBeReturned)) {
    callback({
      error: `Wrong mode parameter (you provided: ${laddersToBeReturned}, available choices: ${sc2Config.matchMaking.modes.join(', ')})`,
    });
  }

  const selectedModeIndex = sc2Config.matchMaking.modes.indexOf(laddersToBeReturned);
  const selectedQueue = sc2Config.matchMaking.queues[selectedModeIndex];
  const ladders = ladderData.currentSeason;
  const filteredLadders = [];

  if (ladderData.error) {
    callback(ladderData);
  } else {
    ladders.forEach((ladderObject) => {
      const ladder = ladderObject.ladder[0];

      if (selectedQueue === 'ALL') {
        filteredLadders.push(ladder);
      } else if (ladder && ladder.matchMakingQueue === selectedQueue) {
        filteredLadders.push(ladder);
      }
    });
    callback(filteredLadders.filter(Boolean));
  }
};

/**
 * Fetches StarCraft 2 player ladders data.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerLadders = (mode, player, callback) => {
  try {
    getSc2PlayerData('ladders', player, (returnedData) => {
      filterLaddersByMode(mode, returnedData, callback);
    });
  } catch (e) {
    callback({
      error: 'Can\'t fetch MMR data. One or more URL parameters are missing or malformed.',
    });
  }
};

/**
 * Fetches StarCraft 2 player match history.
 * @function
 * @param {string} server - Server name abbreviation.
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMatches = (player, callback) => {
  getSc2PlayerData('matches', player, callback);
};

/**
 * Fetches StarCraft 2 player ladder data including MMR.
 * @function
 * @param {string} mode - Player matchmaking mode (e.g. 1v1).
 * @param {Object} player - Player object including server, id, region and name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMMR = (mode, player, callback) => {
  const {
    server, id, region, name // eslint-disable-line comma-dangle
  } = player;

  try {
    getSc2PlayerData('ladders', player, (returnedData) => {
      filterLaddersByMode(mode, returnedData, (filteredLadders) => {
        const filteredLadderIds = [];

        if (filteredLadders.error) {
          callback(filteredLadders);
        } else {
          try {
            filteredLadders.forEach((ladder) => {
              filteredLadderIds.push(ladder.ladderId);
            });

            let ladderCounter = 0;
            const filteredLadderData = [];

            filteredLadderIds.forEach((filteredLadderId) => {
              ladderApi.getAuthenticatedLadderData(server, filteredLadderId, (ladderObject) => {
                const ladderLeaderboard = ladderObject.team;
                const leagueId = ladderObject.league.league_key.league_id;
                const playerRank = sc2Config.matchMaking.ranks[leagueId];
                const teamType = ladderObject.league.league_key.team_type;
                const teamTypeName = sc2Config.matchMaking.teamTypes[teamType];

                ladderLeaderboard.forEach((playerDataObject) => {
                  const memberList = playerDataObject.member;

                  memberList.forEach((member) => {
                    if (member.character_link.id === Number(id)) {
                      const mmr = playerDataObject.rating;

                      filteredLadderData.push({
                        mode,
                        ladder: {
                          id: filteredLadderId,
                          league_id: leagueId,
                          rank: playerRank,
                          team_type: teamType,
                          team_type_name: teamTypeName,
                        },
                        player: {
                          server,
                          id,
                          region,
                          name,
                          mmr,
                        },
                        source_data: playerDataObject,
                      });
                    }
                  });
                });

                ladderCounter += 1;
                if (ladderCounter === filteredLadderIds.length) callback(filteredLadderData);
              });
            });
          } catch (e) {
            callback({
              error: 'Can\'t fetch MMR data. One or more URL parameters are missing or malformed.',
            });
          }
        }
      });
    });
  } catch (e) {
    callback({
      error: 'Can\'t fetch MMR data. One or more URL parameters are missing or malformed.',
    });
  }
};

module.exports = {
  getPlayerProfile,
  getPlayerLadders,
  getPlayerMatches,
  getPlayerMMR,
};
