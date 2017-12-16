const { env } = process;

const databaseConfig = {};

databaseConfig.url = env.API_MONGODB_DB_URL;

module.exports = databaseConfig;
