const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const gameSchema = new mongoose.Schema({
  name: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  players: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  defaultCharacter: [{
    attribute: String,
    attributeValue: String
  }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = {
  routes: router,
  model: Game,
};
