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

const routePath = 'v1/sc2/player/ladders';
const playerPath = ':server/:id/:region/:name';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_ladders: `${config.siteUrl}/${routePath}/${playerPath}`,
    starcraft2_player_ladders_all: `${config.siteUrl}/${routePath}/all/${playerPath}`,
    starcraft2_player_ladders_1v1: `${config.siteUrl}/${routePath}/1v1/${playerPath}`,
    starcraft2_player_ladders_archon: `${config.siteUrl}/${routePath}/archon/${playerPath}`,
    starcraft2_player_ladders_2v2: `${config.siteUrl}/${routePath}/2v2/:server/${playerPath}`,
    starcraft2_player_ladders_3v3: `${config.siteUrl}/${routePath}/3v3/:server/${playerPath}`,
    starcraft2_player_ladders_4v4: `${config.siteUrl}/${routePath}/4v4/:server/${playerPath}`,
  });
});

/** Default route for player ladders */
router.get(`/${playerPath}`, apicache(cache.request), (req, res) => {
  sc2playerApi.getPlayerLadders('ALL', req.params)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

/** Route for selected player ladder */
router.get(`/:mode/${playerPath}`, apicache(cache.request), (req, res) => {
  const { mode } = req.params;

  sc2playerApi.getPlayerLadders(mode, req.params)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (mode, server, id, region, name)',
  });
});

module.exports = router;
