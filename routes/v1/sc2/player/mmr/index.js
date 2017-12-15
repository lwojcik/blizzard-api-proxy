const router   = require('express').Router();
const config   = require('../../../../../config/app');
const cache    = require('../../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json(
    'TODO'
  );   
});

module.exports = router;