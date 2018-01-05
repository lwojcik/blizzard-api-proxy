/**
 * @file    Route enumeration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

/* eslint-disable global-require */
module.exports = (app) => {
  app.use('/', require('./routes/index'));
  app.use('/v1/', require('./routes/v1/index'));
  app.use('/v1/sc2', require('./routes/v1/sc2/index'));
  app.use('/v1/sc2/player', require('./routes/v1/sc2/player/index'));
  app.use('/v1/sc2/player/profile', require('./routes/v1/sc2/player/profile/index'));
  app.use('/v1/sc2/player/ladders', require('./routes/v1/sc2/player/ladders/index'));
  app.use('/v1/sc2/player/matches', require('./routes/v1/sc2/player/matches/index'));
  app.use('/v1/sc2/player/mmr', require('./routes/v1/sc2/player/mmr/index'));
  app.use('/v1/sc2/ladder', require('./routes/v1/sc2/ladder/index'));
  app.use('/v1/sc2/ladder2', require('./routes/v1/sc2/ladder2/index'));
};
/* eslint-enable global-require */
