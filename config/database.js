'use strict';

const env = process.env;

const databaseConfig = {};

databaseConfig.url = env.API_MONGODB_DB_URL;

module.exports = databaseConfig;