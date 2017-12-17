/**
 * @fileOverview StarCraft 2 api route file.
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const router = require('express').Router();
const config = require('../../../config/app');
const cache = require('../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_player_api: `${config.siteUrl}/v1/sc2/player`,
    starcraft2_ladder_api: `${config.siteUrl}/v1/sc2/ladder`,
    starcraft2_authenticated_ladder_api: `${config.siteUrl}/v1/sc2/ladder2`,
  });
});

module.exports = router;
