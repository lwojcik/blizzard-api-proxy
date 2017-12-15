const router   = require('express').Router();
const config   = require('../../config/app');
const cache    = require('../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'battlenet_api': config.siteUrl + '/v1/bnet/',
    'starcraft2_api': config.siteUrl + '/v1/sc2/'
  });   
});

module.exports = router;