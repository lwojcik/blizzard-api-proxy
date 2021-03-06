/**
 * @file    Main route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../config/app');
const cache = require('../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    api_v1: `${config.siteUrl}/v1`,
  });
});

module.exports = router;
