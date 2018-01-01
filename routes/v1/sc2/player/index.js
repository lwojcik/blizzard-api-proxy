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

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_profile: `${config.siteUrl}/v1/sc2/player/profile`,
    starcraft2_player_ladders: `${config.siteUrl}/v1/sc2/player/ladders`,
    starcraft2_player_matches: `${config.siteUrl}/v1/sc2/player/matches`,
    starcraft2_player_mmr: `${config.siteUrl}/v1/sc2/player/mmr`,
  });
});

module.exports = router;
