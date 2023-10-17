const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
// const validateTourguideInput = require("../../validation/tourguide");
const validateExperienceInput = require("../validation/experience");

// Load tourguide model
const Tourguide = require("../modules/Tourguide");
// Load user modal
const User = require("../modules/User");

// @route   GET api/tourguide/test
// @desc    Tests tourguide route
// @access  Public

router.post("/test", (req, res) => res.json({ msg: "Tourguide works!!" }));

// @route   GET api/tourguide
// @desc    Get current users tourguide
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};

  Tourguide.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(tourguide => {
      if (!tourguide) {
        errors.notourguide = "There is no tourguide for this user";
        return res.status(404).json(errors);
      }
      res.status(200).json(tourguide);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/tourguide/all
// @desc    Get all tourguides
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Tourguide.find()
    .populate("user", ["name", "avatar"])
    .then(tourguides => {
      if (!tourguides) {
        errors.notourguide = "There are no tourguides";
        return res.status(404).json(errors);
      }
      res.json(tourguides);
    })
    .catch(err => res.status(404).json({ tourguide: "There are no tourguides, make one :-)" }));
});

// @route   GET api/tourguide/handle:handle
// @desc    Get tourguide by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Tourguide.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(tourguide => {
      if (!tourguide) {
        errors.notourguide = "There is no tourguide for this user";
        res.status(404).json(errors);
      }

      res.json(tourguide);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/tourguide/user/:user_id
// @desc    Get tourguide by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Tourguide.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(tourguide => {
      if (!tourguide) {
        errors.notourguide = "There is no tourguide for this user";
        res.status(404).json(errors);
      }

      res.json(tourguide);
    })
    .catch(err => res.status(404).json({ tourguide: "There is no tourguide for this user" }));
});

// @route   POST api/tourguide
// @desc    Create or Edit User Tourguide
// @access  Private
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  // const { errors, isValid } = validateTourguideInput(req.body);

  // Check validation
  // if (!isValid) {
  //   // Return any errors with 400 status
  //   return res.status(400).json(errors);
  // }
  console.log(req.body)
  // Get fields
  const tourguideFields = {};
  tourguideFields.user = req.user.id;
  if (req.body.fullName) tourguideFields.fullName = req.body.fullName;
  if (req.body.age) tourguideFields.age = req.body.age;
  if (req.body.address) tourguideFields.address = req.body.address;
  if (req.body.dateOfBirth) tourguideFields.dateOfBirth = req.body.dateOfBirth;
  if (req.body.contactNumber) tourguideFields.contactNumber = req.body.contactNumber;
  if (req.body.gender) tourguideFields.gender = req.body.gender;
  if (req.body.nicNumber) tourguideFields.nicNumber = req.body.nicNumber;
  if (req.body.eMail) tourguideFields.eMail = req.body.eMail;
  if (req.body.workExperience) tourguideFields.workExperience = req.body.workExperience;
  if (req.body.amount) tourguideFields.amount = req.body.amount;

  console.log(req.user.id);
  Tourguide.findOne({ user: req.user.id }).then(tourguide => {
    if (tourguide) {
      console.log("123");
      //Update the tourguide
      Tourguide.findOneAndUpdate({ user: req.user.id }, { $set: tourguideFields }, { new: true }).then(
        tourguide => res.json(tourguide)
      );
    } else {
      // Create the tourguide
      // Check if the handle exists
      Tourguide.findOne({ fullName: tourguideFields.fullName }).then(tourguide => {
        if (tourguide) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        // Save Tourguide
        new Tourguide(tourguideFields).save().then(tourguide => res.json(tourguide));
      });
    }
  });
});

// @route   POST api/tourguide/experience
// @desc    Add experience to tourguide
// @access  Private
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Tourguide.findOne({ user: req.user.id }).then(tourguide => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    tourguide.experience.unshift(newExp);

    tourguide.save().then(tourguide => res.json(tourguide));
  });
});

// @route   POST api/tourguide/education
// @desc    Add education to tourguide
// @access  Private
router.post("/education", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Tourguide.findOne({ user: req.user.id }).then(tourguide => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // Add to exp array
    tourguide.education.unshift(newEdu);

    tourguide.save().then(tourguide => res.json(tourguide));
  });
});

// @route   DELETE api/tourguide/experience/:exp_id
// @desc    Delete experience from tourguide
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tourguide.findOne({ user: req.user.id })
      .then(tourguide => {
        // Get remove index
        const removeIndex = tourguide.experience.map(item => item.id).indexOf(req.params.exp_id);

        // Splice out of array
        tourguide.experience.splice(removeIndex, 1);

        // Save
        tourguide.save().then(tourguide => res.json(tourguide));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/tourguide/education/:exp_id
// @desc    Delete education from tourguide
// @access  Private
router.delete(
  "/education/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tourguide.findOne({ user: req.user.id })
      .then(tourguide => {
        // Get remove index
        const removeIndex = tourguide.education.map(item => item.id).indexOf(req.params.edu_id);

        // Splice out of array
        tourguide.education.splice(removeIndex, 1);

        // Save
        tourguide.save().then(tourguide => res.json(tourguide));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/tourguide/tourguide
// @desc    Delete user from tourguide
// @access  Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Tourguide.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
  });
});

module.exports = router;
