const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;

const items = require("./items.js");
const Item = items.model;

const games = require("./games.js");
const Game = games.model;

const characterSchema = new mongoose.Schema({
  name: String,
  imagePath: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
  items: [{carriedItem: {type: mongoose.Schema.ObjectId,
                  ref: 'Item'}, equipped: Boolean}],
  attributes: [{attributeName: String, modifier: Number}],
});

const Character = mongoose.model('Character', characterSchema);

module.exports = {
  routes: router,
  model: Character,
};
