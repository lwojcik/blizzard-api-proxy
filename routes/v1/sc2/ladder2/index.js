/**
 * @file    StarCraft 2 new ladder endpoint route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const router = require('express').Router();
const config = require('../../../../config/app');
const cache = require('../../../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;
const sc2ladderApi = require('../../../../api/starcraft2/ladder');

/** Main route */
router.get('/', apicache(cache.static), (req, res) => {
  res.json({
    sc2_ladder_data: `${config.siteUrl}/v1/sc2/ladder/:server/:ladderId`,
  });
});

/** Route for selected ladder */
router.get('/:server/:ladderId', apicache(cache.expensiveRequest), (req, res) => {
  const {
    server, ladderId,
  } = req.params;

  sc2ladderApi.getAuthenticatedLadderData(server, ladderId)
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

/** Default route for malformed requests */
router.get('/*', apicache(cache.static), (req, res) => {
  res.json({
    error: 'Wrong or missing request parameters (server, ladderId)',
  });
});

module.exports = router;
