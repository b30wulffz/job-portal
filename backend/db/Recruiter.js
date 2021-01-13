const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\+\d{1,4}-\d{10}/.test(v);
      },
      message: "{VALUE} is not a valid phone number!",
    },
  },
  bio: {
    type: String,
    maxLength: 250,
  },
});

module.exports = mongoose.model("RecruiterInfo", schema);
