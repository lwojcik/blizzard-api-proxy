const router   = require('express').Router();
const config   = require('../../../../config/app');
const cache    = require('../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_profile': config.siteUrl + '/v1/sc2/player/profile',
    'starcraft2_player_ladders': config.siteUrl + '/v1/sc2/player/ladders',
    'starcraft2_player_matches': config.siteUrl + '/v1/sc2/player/matches'
  });   
});

module.exports = router;