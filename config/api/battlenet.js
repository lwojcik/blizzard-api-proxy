const { env } = process;

const bnetApiConfig = {};

bnetApiConfig.url = 'api.battle.net';
bnetApiConfig.port = 443;
bnetApiConfig.servers = ['eu', 'kr', 'sea', 'tw', 'us'];

bnetApiConfig.oauth = {};

bnetApiConfig.api = {};
bnetApiConfig.api.url = {};
bnetApiConfig.api.url.eu = 'eu.api.battle.net';
bnetApiConfig.api.url.kr = 'kr.api.battle.net';
bnetApiConfig.api.url.sea = 'sea.api.battle.net';
bnetApiConfig.api.url.tw = 'tw.api.battle.net';
bnetApiConfig.api.url.us = 'us.api.battle.net';

bnetApiConfig.api.urlCn = 'https://battlenet.com.cn';

bnetApiConfig.api.key = env.API_BATTLENET_KEY;
bnetApiConfig.api.secret = env.API_BATTLENET_SECRET;

bnetApiConfig.checkAccessTokenUri = 'battle.net/oauth/check_token?token=';
bnetApiConfig.checkAccessUriCn = 'https://battlenet.com.cn/oauth/check_token?token=';

bnetApiConfig.getAccessTokenUri = {};
bnetApiConfig.getAccessTokenUri.eu = 'eu.battle.net';
bnetApiConfig.getAccessTokenUri.kr = 'kr.battle.net';
bnetApiConfig.getAccessTokenUri.sea = 'sea.battle.net';
bnetApiConfig.getAccessTokenUri.tw = 'tw.battle.net';
bnetApiConfig.getAccessTokenUri.us = 'us.battle.net';

bnetApiConfig.getAccessTokenUriCn = 'https://www.battlenet.com.cn';

module.exports = bnetApiConfig;
