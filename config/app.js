'use strict';

require('dotenv').config();

const env = process.env;

const appConfig = {};

appConfig.port                         = env.API_NODE_PORT || 8881;
appConfig.url                          = env.API_NODE_IP;
appConfig.protocol                     = env.API_HOST_PROTOCOL || 'https';
appConfig.host                         = env.API_NODE_HOST || 'localhost';
appConfig.siteUrl                      = appConfig.protocol + '://' + appConfig.host +  (env.NODE_ENV === 'production' ? '' : ':' + appConfig.port);

module.exports = appConfig;