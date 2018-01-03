# Blizzard API Proxy App

[![Greenkeeper badge](https://badges.greenkeeper.io/lwojcik/blizzard-api-proxy.svg)](https://greenkeeper.io/)

Node.js wrapper to Battle.net API and selected Blizzard games. Handling endpoint access, authentication, caching and some data manipulation procedures so that other apps of mine don't have to handle that themselves.

# Features

* Battle.net API authentication (both via API key and access token)
* StarCraft II data retrieval:
  * Ladder data
  * Player ranked matchmaking data including MMR

# To do

* Proper documentation :)
* Storing Battle.net access token in database
* Key-based authentication (e.g. parsing Blizzard API key provided via URL parameter)
* Basic test coverage

# License

Licensed under [MIT license](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE). See [LICENSE](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE) for more info.
