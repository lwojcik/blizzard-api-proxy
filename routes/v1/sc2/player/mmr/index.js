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
const playerPath = ':server/:id/:region/:name';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_mmr: {
      all_modes: {
        top_ladder: `${config.siteUrl}/${routePath}/all/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/all/all/${playerPath}`,
      },
      '1v1': {
        top_ladder: `${config.siteUrl}/${routePath}/1v1/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/1v1/all/${playerPath}`,
      },
      archon: {
        top_ladder: `${config.siteUrl}/${routePath}/archon/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/archon/all/${playerPath}`,
      },
      '2v2': {
        top_ladder: `${config.siteUrl}/${routePath}/2v2/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/2v2/all/${playerPath}`,
      },
      '3v3': {
        top_ladder: `${config.siteUrl}/${routePath}/3v3/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/3v3/all/${playerPath}`,
      },
      '4v4': {
        top_ladder: `${config.siteUrl}/${routePath}/4v4/top/${playerPath}`,
        all_ladders: `${config.siteUrl}/${routePath}/4v4/all/${playerPath}`,
      },
    },
  });
});

/** Route for MMR from selected player ladder */
router.get(`/:mode/:filter/${playerPath}`, apicache(cache.request), (req, res) => {
  const { mode, filter } = req.params;

  sc2playerApi.getPlayerMMR(mode, filter, req.params)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (mode, filter, server, id, region, name)',
  });
});

module.exports = router;
