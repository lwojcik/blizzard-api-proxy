'use strict';

module.exports = function(app) {

  app.use( '/', require('./routes/index') );

  // v1

  app.use( '/v1/', require('./routes/v1/index') );
  
  app.use( '/v1/bnet', require('./routes/v1/bnet/index') );
  
  app.use( '/v1/sc2', require('./routes/v1/sc2/index') );
  app.use( '/v1/sc2/profile', require('./routes/v1/sc2/profile/index') );
  app.use( '/v1/sc2/ladders', require('./routes/v1/sc2/ladders/index') );
  app.use( '/v1/sc2/mmr', require('./routes/v1/sc2/mmr/index') );

};