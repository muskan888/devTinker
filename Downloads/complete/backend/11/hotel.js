const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
// Load hotel model
const Hotel = require("../modules/Hotel");
// Load user modal
const User = require("../modules/User");

// @route   GET api/hotel/test
// @desc    Tests hotel route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Hotel works!!" }));

// @route   GET api/hotel
// @desc    Get current users hotel
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};

  Hotel.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(hotel => {
      if (!hotel) {
        errors.nohotel = "There is no hotel for this user";
        return res.status(404).json(errors);
      }
      res.status(200).json(hotel);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/hotel/all
// @desc    Get all hotels
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Hotel.find()
    .populate("user", ["name", "avatar"])
    .then(hotels => {
      if (!hotels) {
        errors.nohotel = "There are no hotels";
        return res.status(404).json(errors);
      }

      res.json(hotels);
    })
    .catch(err => res.status(404).json({ hotel: "There are no hotels, make one :-)" }));
});

// @route   GET api/hotel/handle:handle
// @desc    Get hotel by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Hotel.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(hotel => {
      if (!hotel) {
        errors.nohotel = "There is no hotel for this user";
        res.status(404).json(errors);
      }

      res.json(hotel);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/hotel/user/:user_id
// @desc    Get hotel by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Hotel.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(hotel => {
      if (!hotel) {
        errors.nohotel = "There is no hotel for this user";
        res.status(404).json(errors);
      }

      res.json(hotel);
    })
    .catch(err => res.status(404).json({ hotel: "There is no hotel for this user" }));
});

// @route   POST api/hotel
// @desc    Create or Edit User Hotel
// @access  Private
router.post("/add", (req, res) => {
  // const { errors, isValid } = validateHotelInput(req.body);

  // // Check validation
  // if (!isValid) {
  //   // Return any errors with 400 status
  //   return res.status(400).json(errors);
  // }

  // Get fields
  const hotelFields = {};
  hotelFields.user = req.user.id;
  if (req.body.name) hotelFields.handle = req.body.name;
  if (req.body.type) hotelFields.type = req.body.type;
  if (req.body.location) hotelFields.location = req.body.location;
  if (req.body.price) hotelFields.price = req.body.price;
  if (req.body.no_of_rooms) hotelFields.no_of_rooms = req.body.no_of_rooms;

  Hotel.findOne({ user: req.user.id }).then(hotel => {
    if (hotel) {
      //Update the hotel
      Hotel.findOneAndUpdate({ user: req.user.id }, { $set: hotelFields }, { new: true }).then(
        hotel => res.json(hotel)
      );
    } else {
      // Create the hotel

      // Check if the handle exists
      Hotel.findOne({ handle: hotelFields.handle }).then(hotel => {
        if (hotel) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        // Save Hotel
        new Hotel(hotelFields).save().then(hotel => res.json(hotel));
      });
    }
  });
});

// @route   DELETE api/hotel/hotel
// @desc    Delete user from hotel
// @access  Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Hotel.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
});

module.exports = router;
