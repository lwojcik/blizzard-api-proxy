/**
 * @file    Battle.net route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const cache = require('../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json('TODO');
});

module.exports = router;
