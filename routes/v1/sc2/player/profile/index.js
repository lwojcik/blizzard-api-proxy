const router = require('express').Router();
const config = require('../../../../../config/app');
const cache = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const sc2playerApi = require('../../../../../api/starcraft2/player');

router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_profile: `${config.siteUrl}/v1/sc2/player/profile/:server/:profileId/:profileRegion/:profileName`,
  });
});

router.get('/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const {
    server, profileId, profileRegion, profileName,
  } = req.params;

  sc2playerApi.getPlayerProfile(server, profileId, profileRegion, profileName, res.json.bind(res));
});

router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (server, profileId, profileRegion, profileName)',
  });
});

module.exports = router;
