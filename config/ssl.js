/**
 * @file    SSL configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const sslConfig = {};

/** SSL key file path */
sslConfig.key = './ssl/server.key';
/** SSL certificate file path */
sslConfig.cert = './ssl/server.crt';

module.exports = sslConfig;
