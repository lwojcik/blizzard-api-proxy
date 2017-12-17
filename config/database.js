/**
 * @fileOverview Database configuration file.
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const { env } = process;

const databaseConfig = {};

/** Full database connection string */
databaseConfig.url = env.API_MONGODB_DB_URL;

module.exports = databaseConfig;
