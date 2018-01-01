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
sc2Config.matchMaking.modes = ['ALL', '1V1', 'ARCHON', '2V2', '3V3', '4V4'];
/** StarCraft 2 matchmaking queues as used in Battle.net API */
sc2Config.matchMaking.queues = ['ALL', 'LOTV_SOLO', 'LOTV_TWOS_COMP', 'LOTV_TWOS', 'LOTV_THREES', 'LOTV_FOURS'];

/** StarCraft 2 matchmaking ranks in order specified in https://us.battle.net/forums/en/sc2/topic/20749724960 */
sc2Config.matchMaking.ranks = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER'];
/** StarCraft 2 matchmaking team types in order specified in https://us.battle.net/forums/en/sc2/topic/20749724960 */
sc2Config.matchMaking.teamTypes = ['ARRANGED', 'RANDOM'];

module.exports = sc2Config;
