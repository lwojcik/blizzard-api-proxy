'use strict';

const env = process.env;

const sslConfig = {};

sslConfig.key  = './ssl/server.key';
sslConfig.cert = './ssl/server.crt';

module.exports = sslConfig;