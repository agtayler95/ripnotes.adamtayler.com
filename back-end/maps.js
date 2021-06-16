const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const games = require("./games.js");
const Game = games.model;

const mapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  game: {
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  },
  path: String,
  name: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Map = mongoose.model('Map', mapSchema);

router.post("/", validUser, upload.single('map'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });
  const map = new Map({
    user: req.user,
    game: req.body.game,
    path: "/images/" + req.file.filename,
    name: req.body.title,
    description: req.body.description,
  });
  try {
    await map.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", validUser, async (req, res) => {
  // return maps
  try {
    let maps = await Map.find({
      game: req.body.game
    }).sort({
      created: -1
    }).populate('user');
    return res.send(maps);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all maps
router.get("/all", async (req, res) => {
  try {
    let maps = await Map.find().sort({
      created: -1
    }).populate('user');
    return res.send(maps);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  // return map
  try {
    let map = await Map.findOne({_id: req.params.id
  }).populate('user');
    if (!map) {
      res.send(404);
      return;
    }
    return res.send(map);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Map,
};
