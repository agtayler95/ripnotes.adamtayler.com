const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const games = require("./games.js");
const Game = games.model;

const itemSchema = new mongoose.Schema({
  name: String,
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
  itemType: String,
  attributes: [{attributeName: String, modifier: Number}],
  restrictions: [{attributeName: String, requirement: String}],
  damage: String,
  notes: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
  routes: router,
  model: Item,
};
