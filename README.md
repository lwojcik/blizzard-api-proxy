# Blizzard API Proxy App

**As of October 2018 the project is not maintained any more.**

Node.js wrapper to Battle.net API and selected Blizzard games.
Handling endpoint access, authentication, caching and some data manipulation procedures
so that other apps of mine don't have to handle that themselves.

## Requirements

* Node.js 8.9.3 LTS or later

## Setup

* Get an API key and API secret from [Battle.net developer portal](https://dev.battle.net/).
* Copy `.env.sample` file to `.env`. Provide `API_BATTLENET_KEY` and `API_BATTLENET_SECRET`
with API key and API secret you had obtained from Battle.net.
* Set up SSL certificate and key and save them in `ssl/` directory. Locally you can use a [self-signed cert](https://gist.github.com/lwojcik/a513d0cabad380d0b8df74c08431426c).
* `npm install`
* `node start` or `nodemon start` if run locally
* open the app main path `/` and explore the endpoints by following the links provided in JSON objects

## Features

* Battle.net API authentication (both via API key and access token)
* StarCraft II data retrieval:
  * Ladder data
  * Player ranked matchmaking stats including MMR

## License

Licensed under [MIT license](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE).
See [LICENSE](https://github.com/lwojcik/blizzard-api-proxy/blob/master/LICENSE) for more info.
