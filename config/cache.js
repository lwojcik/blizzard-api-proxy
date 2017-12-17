/**
 * @fileOverview Cache configuration file.
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const { env } = process;

const cacheConfig = {};

/** Debug mode */
cacheConfig.debug = env.NODE_ENV !== 'production';
/** Cache time for static endpoints */
cacheConfig.static = '2 weeks';
/** Cache time for semi-static endpoints (which get updated very rarely) */
cacheConfig.semistatic = '1 hour';
/** Cache time for endpoints which update frequently but regenerating them consumes time */
cacheConfig.expensiveRequest = '60 seconds';
/** Cache time for endpoints which update frequently but regenerating them is cheap */
cacheConfig.request = '10 seconds';

module.exports = cacheConfig;
