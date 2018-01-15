/**
 * @file    API version 1 route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../../config/app');
const cache = require('../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const routePath = 'v1';

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    starcraft2_api: `${config.siteUrl}/${routePath}/sc2`,
  });
});

module.exports = router;
