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

const gameSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  description: String,
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  players: [{user: {type: mongoose.Schema.ObjectId, ref: 'User'}, accepted: String}],
  defaultCharacter: [{
    attribute: String,
    attributeValue: String
  }]
});

const Game = mongoose.model('Game', gameSchema);

router.post("/", validUser, upload.single('thumbnail'), async (req, res) => {
  // check parameters
  let imagePath = "";
  if (!req.file) {
    imagePath = "/images/PlaceHolder.png";
  }
  else {
    imagePath = "/images/" + req.file.filename;
  }

  const game = new Game({
    creator: req.user,
    thumbnail: imagePath,
    title: req.body.title,
    description: req.body.description
  });
  try {
    await game.save();
    return res.send({
      game: game
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", validUser, async (req, res) => {
  // return photos
  try {
    let games = await Game.find({
      creator: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/accepted/", validUser, async (req, res) => {
  // return photos
  try {
    let games = await Game.find({
      players: {
        $elemMatch: {user: req.user, accepted: "yes"}
      }
    }).sort({
      created: -1
    }).populate('user');
    return res.send(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/invited/", validUser, async (req, res) => {
  // return photos
  try {
    let games = await Game.find({
      players: {
        $elemMatch: {user: req.user, accepted: "no"}
      }
    }).sort({
      created: -1
    }).populate('user');
    //console.log(req.user === games[0].players[0].user);
    //console.log(games[0].players[0].user);
    //console.log(req.user._id.toString());
    return res.send(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/addPlayer/:id', validUser, async (req, res) => {
  // can only do this if creator of the game
  let currentGame = 0;
  try {
    currentGame = await Game.findOne({_id: req.params.id});
  } catch(error) {
    console.log(error);
    return res.sendStatus(404);
  }
  if (!currentGame || req.user._id.toString() !== currentGame.creator.toString()) {
    //Only creator allowed to add users
    return res.sendStatus(403);
  }
  try {
    addedUser = await User.findOne({username: req.body.username});
    if(addedUser && !(currentGame.players.find((player) => player.user.toString() === addedUser._id.toString()))) currentGame.players.push({user: addedUser, accepted: "no"});
    await currentGame.save();
    return res.send({
      game: currentGame
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/playerResponse/:id', validUser, async (req, res) => {
  let currentGame = 0;
  try {
    currentGame = await Game.findOne({_id: req.params.id});
    let playerIndex = currentGame.players.findIndex((player) => player.user.toString() === req.user._id.toString());
    currentGame.players[playerIndex].accepted = req.body.accepted;
    await currentGame.save();
    return res.send({
      game: currentGame
    })
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  // can only do this if creator of the game
  let currentGame = 0;
  try {
    currentGame = await Game.deleteOne({_id: req.params.id});
    return res.sendStatus(200);
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});



module.exports = {
  routes: router,
  model: Game,
};
