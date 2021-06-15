const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const itemSchema = new mongoose.Schema({
  name: String,
  itemType: String,
  attributes: [{attributeName: String, modifier: Number}],
  restrictions: [{attributeName: String, requirement: String}],
  damage: String,
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
  notes: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
  routes: router,
  model: Item,
};
