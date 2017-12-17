const router = require('express').Router();
const config = require('../../../../config/app');
const cache = require('../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const sc2ladderApi = require('../../../../api/starcraft2/ladder');

router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    sc2_ladder_data: `${config.siteUrl}/v1/sc2/ladder/:server/:ladderId`,
  });
});

router.get('/:server/:ladderId', apicache(cache.expensiveRequest), (req, res) => {
  const {
    server, ladderId,
  } = req.params;

  sc2ladderApi.getAuthenticatedLadderData(server, ladderId, res.json.bind(res));
});

router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (server, ladderId)',
  });
});

module.exports = router;
