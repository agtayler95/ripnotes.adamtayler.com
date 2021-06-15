const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

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
  items: [{item: {type: mongoose.Schema.ObjectID,
                  ref: 'Item'}, equipped: Boolean}],
  attributes: [{attributeName: String, modifier: Number}],

});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
  routes: router,
  model: Item,
};
