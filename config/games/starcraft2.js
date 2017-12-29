/**
 * @file    StarCraft 2 configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const sc2Config = {};

/** StarCraft 2 expansion names */
sc2Config.expansions = ['WOL', 'HOTS', 'LOTV'];
/** StarCraft 2 race names */
sc2Config.races = ['ALL', 'RANDOM', 'TERRAN', 'ZERG', 'PROTOSS'];

sc2Config.matchMaking = {};
/** StarCraft 2 matchmaking modes as used in Battle.net API */
sc2Config.matchMaking.modes = ['1V1', '2V2', '3V3', '4V4'];
/** StarCraft 2 matchmaking queues as used in Battle.net API */
sc2Config.matchMaking.queues = ['LOTV_SOLO', 'LOTV_TWOS', 'LOTV_THREES', 'LOTV_FOURS'];

module.exports = sc2Config;
