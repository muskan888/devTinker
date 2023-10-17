const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
// Load room model
const Room = require("../modules/Room");
// Load user modal
const User = require("../modules/User");

// @route   GET api/room/test
// @desc    Tests room route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Room works!!" }));

// @route   GET api/room
// @desc    Get current users room
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};

  Room.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(room => {
      if (!room) {
        errors.noroom = "There is no room for this user";
        return res.status(404).json(errors);
      }
      res.status(200).json(room);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/room/all
// @desc    Get all rooms
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Room.find()
    // .populate("no_of_rooms", ["no_of_room", "available_of_rooms"])
    .then(rooms => {
      if (!rooms) {
        errors.noroom = "There are no rooms";
        return res.status(404).json(errors);
      }
      res.json(rooms);
    })
    .catch(err => res.status(404).json({ room: "There are no rooms, make one :-)" }));
});

// @route   GET api/room/handle:handle
// @desc    Get room by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Room.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(room => {
      if (!room) {
        errors.noroom = "There is no room for this user";
        res.status(404).json(errors);
      }

      res.json(room);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/room/user/:user_id
// @desc    Get room by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Room.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(room => {
      if (!room) {
        errors.noroom = "There is no room for this user";
        res.status(404).json(errors);
      }

      res.json(room);
    })
    .catch(err => res.status(404).json({ room: "There is no room for this user" }));
});

// @route   POST api/room
// @desc    Create or Edit User Room
// @access  Private
router.post("/insert",passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  // Get fields
  const roomFields = {};
  roomFields.user = req.user.id;
  if (req.body.no_of_rooms) roomFields.no_of_rooms = req.body.no_of_rooms;
  if (req.body.no_of_guest) roomFields.no_of_guest = req.body.no_of_guest;
  if (req.body.check_in_date) roomFields.check_in_date = req.body.check_in_date;
  if (req.body.check_out_date) roomFields.check_out_date = req.body.check_out_date;

  Room.findOne({ user: req.user.id }).then(room => {
    if (room) {
      //Update the room
      Room.findOneAndUpdate({ user: req.user.id }, { $set: roomFields }, { new: true }).then(
        room => res.json(room)
      );
    } else {
      // Create the room

      // Check if the handle exists
      Room.findOne({ no_of_rooms: roomFields.no_of_rooms }).then(room => {
        if (room) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }
        // Save Room
        new Room(roomFields).save().then(room => res.json(room));
      });
    }
  });
});

// @route   DELETE api/room/room
// @desc    Delete user from room
// @access  Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Room.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
});

module.exports = router;
