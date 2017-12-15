'use strict';

// TODO split into separate files

const env = process.env;

const cacheConfig = {};

cacheConfig.debug                      = env.NODE_ENV === 'production' ? false : true;
cacheConfig.static                     = '2 weeks';
cacheConfig.semistatic                 = '1 hour';
cacheConfig.expensiveRequest           = '60 seconds';
cacheConfig.request                    = '10 seconds';

module.exports = cacheConfig;