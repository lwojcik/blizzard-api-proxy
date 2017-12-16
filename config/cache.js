const { env } = process;

const cacheConfig = {};

cacheConfig.debug = env.NODE_ENV !== 'production';
cacheConfig.static = '2 weeks';
cacheConfig.semistatic = '1 hour';
cacheConfig.expensiveRequest = '60 seconds';
cacheConfig.request = '10 seconds';

module.exports = cacheConfig;
