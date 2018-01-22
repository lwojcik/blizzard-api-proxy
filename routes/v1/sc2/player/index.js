/**
 * @file    StarCraft 2 player route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../../../../config/app');
const cache = require('../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const routePath = 'v1/sc2/player';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_profile: `${config.siteUrl}/${routePath}/profile`,
    starcraft2_player_ladders: `${config.siteUrl}/${routePath}/ladders`,
    starcraft2_player_matches: `${config.siteUrl}/${routePath}/matches`,
    starcraft2_player_mmr: `${config.siteUrl}/${routePath}/mmr`,
  });
});

module.exports = router;
