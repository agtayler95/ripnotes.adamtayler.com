const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const mapSchema = new mongoose.Schema({
  name: String,
  path: String,
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
});

const Map = mongoose.model('Map', mapSchema);

module.exports = {
  routes: router,
  model: Map,
};
