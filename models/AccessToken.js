/**
 * @fileOverview Battle.net access token model
 * @constructor  BnetAccessToken
 * @author       Łukasz Wójcik
 * @license      MIT
 * @since        2017-12-17
 */

const mongoose = require('mongoose');

const bnetAccessTokenSchema = mongoose.Schema({
  bnetAccessToken: {
    token: String,
    expiryDate: String,
  },
});

module.exports = mongoose.model('BnetAccessToken', bnetAccessTokenSchema);
