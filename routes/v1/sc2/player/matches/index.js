const router = require('express').Router();
const config = require('../../../../../config/app');
const cache = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const sc2api = require('../../../../../api/games/starcraft2');

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_matches': config.siteUrl + '/v1/sc2/player/matches/:server/:profileId/:profileRegion/:profileName'
  });
});

router.get('/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), function(req, res) {
  const { server, profileId, profileRegion, profileName } = req.params;
  sc2api.getPlayerMatches(server, profileId, profileRegion, profileName, res.json.bind(res));
});

router.get('/*', apicache(cache.static), function(req, res) {
  res.json({
    'error': 'Wrong or missing request parameters (server, profileId, profileRegion, profileName)'
  });
});

module.exports = router;