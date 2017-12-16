const router = require('express').Router();
const cache = require('../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), (req, res) => {
  res.json('TODO');
});

module.exports = router;
