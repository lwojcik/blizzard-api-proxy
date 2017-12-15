const router   = require('express').Router();
const config   = require('../../../config/app');
const cache    = require('../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_api': config.siteUrl + '/v1/sc2/player',
    'starcraft2_ladder_api': config.siteUrl + '/v1/sc2/ladder'
  });   
});

module.exports = router;