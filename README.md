# Blizzard API Proxy App

[![Greenkeeper badge](https://badges.greenkeeper.io/lwojcik/blizzard-api-proxy.svg)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/lwojcik/projects/fb51f653-12f8-49ae-84f5-19fb04820a72/badge)](https://nodesecurity.io/orgs/lwojcik/projects/fb51f653-12f8-49ae-84f5-19fb04820a72)
[![Known Vulnerabilities](https://snyk.io/test/github/lwojcik/blizzard-api-proxy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lwojcik/blizzard-api-proxy?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/5cde6dc6400a0b6e13ae/maintainability)](https://codeclimate.com/github/lwojcik/blizzard-api-proxy/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5cde6dc6400a0b6e13ae/test_coverage)](https://codeclimate.com/github/lwojcik/blizzard-api-proxy/test_coverage)

Node.js wrapper to Battle.net API and selected Blizzard games. Handling endpoint access, authentication, caching and some data manipulation procedures so that other apps of mine don't have to handle that themselves.

# Features

* Battle.net API authentication (both via API key and access token)
* StarCraft II data retrieval:
  * Ladder data
  * Player ranked matchmaking data including MMR

# To do

* Proper documentation :)
* Key-based authentication (e.g. parsing Blizzard API key provided via URL parameter)
* Basic test coverage

# License

Licensed under [MIT license](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE). See [LICENSE](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE) for more info.
