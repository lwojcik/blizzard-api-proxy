/**
 * @file    StarCraft 2 player matches route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../../../../../config/app');
const cache = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;
const sc2playerApi = require('../../../../../api/starcraft2/player');

const routePath = 'v1/sc2/player/matches';
const playerPath = ':server/:id/:region/:name';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_matches: `${config.siteUrl}/${routePath}/${playerPath}`,
  });
});

/** Route for selected player matches */
router.get(`/${playerPath}`, apicache(cache.request), (req, res) => {
  sc2playerApi.getPlayerMatches(req.params)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (server, profileId, profileRegion, profileName)',
  });
});

module.exports = router;
