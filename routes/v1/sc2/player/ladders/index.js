/**
 * @file    StarCraft 2 player ladders route file.
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
    starcraft2_player_ladders: `${config.siteUrl}/v1/sc2/player/ladders/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_all: `${config.siteUrl}/v1/sc2/player/ladders/all/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_1v1: `${config.siteUrl}/v1/sc2/player/ladders/1v1/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_archon: `${config.siteUrl}/v1/sc2/player/ladders/archon/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_2v2: `${config.siteUrl}/v1/sc2/player/ladders/2v2/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_3v3: `${config.siteUrl}/v1/sc2/player/ladders/3v3/:server/:profileId/:profileRegion/:profileName`,
    starcraft2_player_ladders_4v4: `${config.siteUrl}/v1/sc2/player/ladders/4v4/:server/:profileId/:profileRegion/:profileName`,
  });
});

/** Default route for player ladders */
router.get('/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const player = {
    server: req.params.server,
    id: req.params.profileId,
    region: req.params.profileRegion,
    name: req.params.profileName,
  };

  sc2playerApi.getPlayerLadders('ALL', player, res.json.bind(res));
});

/** Route for selected player ladder */
router.get('/:filter/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const { filter } = req.params;
  const player = {
    server: req.params.server,
    id: req.params.profileId,
    region: req.params.profileRegion,
    name: req.params.profileName,
  };

  sc2playerApi.getPlayerLadders(filter, player, res.json.bind(res));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (filter, server, profileId, profileRegion, profileName)',
  });
});

module.exports = router;
