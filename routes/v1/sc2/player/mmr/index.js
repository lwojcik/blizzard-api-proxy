/**
 * @file    StarCraft 2 player MMR route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-30
 */

const router = require('express').Router();
const config = require('../../../../../config/app');
const cache = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;
const sc2playerApi = require('../../../../../api/starcraft2/player');

const routePath = 'v1/sc2/player/mmr';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_mmr: {
      all_modes: {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/all/all/:server/:profileId/:profileRegion/:profileName`,
      },
      '1v1': {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/1v1/all/:server/:profileId/:profileRegion/:profileName`,
      },
      archon: {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/archon/all/:server/:profileId/:profileRegion/:profileName`,
      },
      '2v2': {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/2v2/all/:server/:profileId/:profileRegion/:profileName`,
      },
      '3v3': {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/3v3/all/:server/:profileId/:profileRegion/:profileName`,
      },
      '4v4': {
        top_ladder: 'TODO',
        all_ladders: `${config.siteUrl}/${routePath}/4v4/all/:server/:profileId/:profileRegion/:profileName`,
      },
    },
  });
});

/** Default route for player MMR */
router.get('/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const player = {
    server: req.params.server,
    id: req.params.profileId,
    region: req.params.profileRegion,
    name: req.params.profileName,
  };

  sc2playerApi.getPlayerMMR('ALL', 'ALL', player, res.json.bind(res));
});

/** Route for MMR from selected player ladder */
router.get('/:mode/:filter/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), (req, res) => {
  const { mode, filter } = req.params;
  const player = {
    server: req.params.server,
    id: req.params.profileId,
    region: req.params.profileRegion,
    name: req.params.profileName,
  };

  sc2playerApi.getPlayerMMR(mode, filter, player, res.json.bind(res));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (mode, filter, server, profileId, profileRegion, profileName)',
  });
});

module.exports = router;
