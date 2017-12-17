/**
 * @fileOverview Battle.net configuration file.
 *
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const { env } = process;

const bnetApiConfig = {};

/** Battle.net API base URL */
bnetApiConfig.url = 'api.battle.net';
/** Battle.net API port */
bnetApiConfig.port = 443;
/** Battle.net API server identifiers */
bnetApiConfig.servers = ['eu', 'kr', 'sea', 'tw', 'us'];

bnetApiConfig.oauth = {};

bnetApiConfig.api = {};
bnetApiConfig.api.url = {};
/** Battle.net API URL for European region */
bnetApiConfig.api.url.eu = 'eu.api.battle.net';
/** Battle.net API URL for Korean region */
bnetApiConfig.api.url.kr = 'kr.api.battle.net';
/** Battle.net API URL for South-East Asia region */
bnetApiConfig.api.url.sea = 'sea.api.battle.net';
/** Battle.net API URL for Taiwanese region */
bnetApiConfig.api.url.tw = 'tw.api.battle.net';
/** Battle.net API URL for American region */
bnetApiConfig.api.url.us = 'us.api.battle.net';

/** Battle.net API URL to use in China */
bnetApiConfig.api.urlCn = 'https://battlenet.com.cn';

/** Battle.net API key */
bnetApiConfig.api.key = env.API_BATTLENET_KEY;
/** Battle.net API secret */
bnetApiConfig.api.secret = env.API_BATTLENET_SECRET;

/** Battle.net API URL for checking access token validity */
bnetApiConfig.checkAccessTokenUri = 'battle.net/oauth/check_token?token=';
/** Battle.net API URL for checking access token validity to use in China */
bnetApiConfig.checkAccessUriCn = 'https://battlenet.com.cn/oauth/check_token?token=';

bnetApiConfig.getAccessTokenUri = {};
/** Battle.net API URL for getting access token in European region */
bnetApiConfig.getAccessTokenUri.eu = 'eu.battle.net';
/** Battle.net API URL for getting access token in Korean region */
bnetApiConfig.getAccessTokenUri.kr = 'kr.battle.net';
/** Battle.net API URL for getting access token in South-East Asia region */
bnetApiConfig.getAccessTokenUri.sea = 'sea.battle.net';
/** Battle.net API URL for getting access token in Taiwanese region */
bnetApiConfig.getAccessTokenUri.tw = 'tw.battle.net';
/** Battle.net API URL for getting access token in American region */
bnetApiConfig.getAccessTokenUri.us = 'us.battle.net';

/** Battle.net API URL for getting access token from China */
bnetApiConfig.getAccessTokenUriCn = 'https://www.battlenet.com.cn';

module.exports = bnetApiConfig;
