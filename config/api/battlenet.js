/**
 * @file    Battle.net configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2017-12-17
 */

const { env } = process;

const bnetApiConfig = {};

/** Battle.net API server identifiers */
bnetApiConfig.servers = ['eu', 'kr', 'sea', 'tw', 'us'];

bnetApiConfig.api = {};
bnetApiConfig.api.url = {};
/** Battle.net API URL for European region */
bnetApiConfig.api.url.eu = 'https://eu.api.battle.net';
/** Battle.net API URL for Korean region */
bnetApiConfig.api.url.kr = 'https://kr.api.battle.net';
/** Battle.net API URL for South-East Asia region */
bnetApiConfig.api.url.sea = 'https://sea.api.battle.net';
/** Battle.net API URL for Taiwanese region */
bnetApiConfig.api.url.tw = 'https://tw.api.battle.net';
/** Battle.net API URL for American region */
bnetApiConfig.api.url.us = 'https://us.api.battle.net';
/** Battle.net API URL to use in China */
bnetApiConfig.api.url.cn = 'https://battlenet.com.cn';

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
bnetApiConfig.getAccessTokenUri.eu = 'https://eu.battle.net';
/** Battle.net API URL for getting access token in Korean region */
bnetApiConfig.getAccessTokenUri.kr = 'https://kr.battle.net';
/** Battle.net API URL for getting access token in South-East Asia region */
bnetApiConfig.getAccessTokenUri.sea = 'https://sea.battle.net';
/** Battle.net API URL for getting access token in Taiwanese region */
bnetApiConfig.getAccessTokenUri.tw = 'https://tw.battle.net';
/** Battle.net API URL for getting access token in American region */
bnetApiConfig.getAccessTokenUri.us = 'https://us.battle.net';
/** Battle.net API URL for getting access token from China */
bnetApiConfig.getAccessTokenUri.cn = 'https://www.battlenet.com.cn';

module.exports = bnetApiConfig;
