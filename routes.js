'use strict';

module.exports = function(app) {

  app.use( '/', require('./routes/index') );

  // v1

  app.use( '/v1/', require('./routes/v1/index') );
  
  app.use( '/v1/bnet', require('./routes/v1/bnet/index') );
  
  app.use( '/v1/sc2', require('./routes/v1/sc2/index') );
  app.use( '/v1/sc2/player', require('./routes/v1/sc2/player/index') );
  
  app.use( '/v1/sc2/player/profile', require('./routes/v1/sc2/player/profile/index') );
  app.use( '/v1/sc2/player/ladders', require('./routes/v1/sc2/player/ladders/index') );
  app.use( '/v1/sc2/player/mmr', require('./routes/v1/sc2/player/mmr/index') );

  app.use( '/v1/sc2/ladder', require('./routes/v1/sc2/ladder/index') );
  
};