# Blizzard API Proxy App

[![Greenkeeper badge](https://badges.greenkeeper.io/lwojcik/blizzard-api-proxy.svg)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/lwojcik/projects/fb51f653-12f8-49ae-84f5-19fb04820a72/badge)](https://nodesecurity.io/orgs/lwojcik/projects/fb51f653-12f8-49ae-84f5-19fb04820a72)
[![Known Vulnerabilities](https://snyk.io/test/github/lwojcik/blizzard-api-proxy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lwojcik/blizzard-api-proxy?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/5cde6dc6400a0b6e13ae/maintainability)](https://codeclimate.com/github/lwojcik/blizzard-api-proxy/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5cde6dc6400a0b6e13ae/test_coverage)](https://codeclimate.com/github/lwojcik/blizzard-api-proxy/test_coverage)

Node.js wrapper to Battle.net API and selected Blizzard games. Handling endpoint access, authentication, caching and some data manipulation procedures so that other apps of mine don't have to handle that themselves.

# Requirements:

* Node.js 8.9.3 LTS or later

# Setup

* Get an API key and API secret from [Battle.net developer portal](https://dev.battle.net/).
* Copy `.env.sample` file to `.env`. Provide `API_BATTLENET_KEY` and `API_BATTLENET_SECRET` with API key and API secret you had obtained from Battle.net.
* Set up SSL certificate and key and save them in `ssl/` directory. Locally you can use a [self-signed cert](https://gist.github.com/lwojcik/a513d0cabad380d0b8df74c08431426c).
* `npm install`
* `node start` or `nodemon start` if run locally
* open the app main path `/` and explore the endpoints by following the links provided in JSON objects

# Features

* Battle.net API authentication (both via API key and access token)
* StarCraft II data retrieval:
  * Ladder data
  * Player ranked matchmaking stats including MMR

# To do

* ~~Proper documentation :)~~ Turning it into npm library with proper docs and examples of usage
* Key-based authentication (e.g. parsing Blizzard API key provided via URL parameter)
* Caching access token locally to cut the number of requests to Battle.net API
* Basic test coverage

# License

Licensed under [MIT license](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE). See [LICENSE](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE) for more info.
