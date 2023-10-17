const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TourguideSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  fullName: {
    type: String,
    required: true,
  },
  eMail: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  contactNumber: {
    type: String
  },
  nicNumber: {
    type: String
  },
  amount: {
    type: String,
  },
  workExperience: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tourguide = mongoose.model("tourguide", TourguideSchema);
