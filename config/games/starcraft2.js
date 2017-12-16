const sc2Config = {};

sc2Config.expansions = ['WOL', 'HOTS', 'LOTV'];
sc2Config.races = ['ALL', 'RANDOM', 'TERRAN', 'ZERG', 'PROTOSS'];

sc2Config.matchMaking = {};
sc2Config.matchMaking.modes = ['ALL', '1V1', '2V2', '3V3', '4V4'];
sc2Config.matchMaking.queues = ['ALL', 'LOTV_SOLO', 'LOTV_TWOS', 'LOTV_THREES', 'LOTV_FOURS'];

module.exports = sc2Config;
