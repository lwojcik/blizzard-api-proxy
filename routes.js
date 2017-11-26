'use strict';

module.exports = function(app) {

  app.use( '/', require('./routes/index') );
  app.use( '/api', require('./routes/api/index') );

  // v3

  app.use( '/api/v3', require('./routes/api/v3/index') );
  
  app.use( '/api/v3/sc2', require('./routes/api/v3/sc2/index') );
  app.use( '/api/v3/sc2/bnet', require('./routes/api/v3/sc2/bnet/index') );

  app.use( '/api/v3/sc2/data', require('./routes/api/v3/sc2/data/index') );  
  
  app.use( '/api/v3/sc2/data/ladder', require('./routes/api/v3/sc2/data/ladder/index') );
  app.use( '/api/v3/sc2/data/ladder/lotv', require('./routes/api/v3/sc2/data/ladder/lotv/index') );
  
  app.use( '/api/v3/sc2/data/mmr', require('./routes/api/v3/sc2/data/mmr/index') );
  app.use( '/api/v3/sc2/data/mmr/lotv', require('./routes/api/v3/sc2/data/mmr/lotv/index') );

};