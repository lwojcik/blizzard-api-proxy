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
 * Filters returned ladder data based on the provided parameter.
 * @function
 * @param {string} filter - Filter for choosing specific ladder queue.
 * @param {object} ladderData - Ladder data object returned by Blizzard API.
 * @param {function} callback - Callback function to pass the data to.
 */
const filterLadders = (filter, ladderData, callback) => {
  const laddersToBeReturned = filter.toUpperCase();

  if (!sc2Config.matchMaking.modes.includes(laddersToBeReturned)) {
    callback({
      error: `Wrong filter parameter (you provided: ${laddersToBeReturned}, available choices: ${sc2Config.matchMaking.modes.join(', ')})`,
    });
  }

  const selectedModeIndex = sc2Config.matchMaking.modes.indexOf(laddersToBeReturned);
  const selectedQueue = sc2Config.matchMaking.queues[selectedModeIndex];
  const ladders = ladderData.currentSeason;
  const filteredLadders = [];

  ladders.forEach((ladderObject) => {
    const ladder = ladderObject.ladder[0];

    if (selectedQueue === 'ALL') {
      filteredLadders.push(ladder);
    } else if (ladder && ladder.matchMakingQueue === selectedQueue) {
      filteredLadders.push(ladder);
    }
  });
  callback(filteredLadders.filter(Boolean));
};

/**
 * Fetches StarCraft 2 player ladders data.
 * @function
 * @param {string} filter - Filter for choosing specific ladder queue.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerLadders = (filter, server, profileId, profileRegion, profileName, callback) => {
  try {
    getSc2PlayerData('ladders', server, profileId, profileRegion, profileName, (returnedData) => {
      filterLadders(filter, returnedData, callback);
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
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMatches = (server, profileId, profileRegion, profileName, callback) => {
  getSc2PlayerData('matches', server, profileId, profileRegion, profileName, callback);
};

/**
 * Fetches StarCraft 2 player ladder data including MMR.
 * @function
 * @param {string} filter - Filter for choosing specific ladder queue.
 * @param {string} server - Server name abbreviation.
 * @param {number} profileId - Player profile identifier.
 * @param {number} profileRegion - Player region single-digit identifier.
 * @param {string} profileName - Player profile name.
 * @param {function} callback - Callback function to pass the data to.
 */
const getPlayerMMR = (filter, server, profileId, profileRegion, profileName, callback) => {
  try {
    getSc2PlayerData('ladders', server, profileId, profileRegion, profileName, (returnedData) => {
      filterLadders(filter, returnedData, (filteredLadders) => {
        const filteredLadderIds = [];
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
                  if (member.character_link.id === Number(profileId)) {
                    const playerMMR = playerDataObject.rating;

                    filteredLadderData.push({
                      filter,
                      ladder: {
                        id: filteredLadderId,
                        league_id: leagueId,
                        rank: playerRank,
                        team_type: teamType,
                        team_type_name: teamTypeName,
                      },
                      player: {
                        server,
                        id: profileId,
                        region: profileRegion,
                        name: profileName,
                        mmr: playerMMR,
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
