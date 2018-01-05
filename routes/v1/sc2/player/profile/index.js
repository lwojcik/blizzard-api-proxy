/**
 * @file    StarCraft 2 player profile route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../../../../../config/app');
const cache = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const sc2playerApi = require('../../../../../api/starcraft2/player');

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_profile: `${config.siteUrl}/v1/sc2/player/profile/:server/:profileId/:profileRegion/:profileName`,
  });
});

/** Route for player profile */
router.get('/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const player = {
    server: req.params.server,
    id: req.params.profileId,
    region: req.params.profileRegion,
    name: req.params.profileName,
  };

  sc2playerApi.getPlayerProfile(player, res.json.bind(res));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (server, profileId, profileRegion, profileName)',
  });
});

module.exports = router;
