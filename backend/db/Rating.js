const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["job", "applicant"],
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    max: 5.0,
    default: -1.0,
    validate: {
      validator: function (v) {
        return v >= -1.0 && v <= 5.0;
      },
      msg: "Invalid rating",
    },
  },
});

schema.index({ category: 1, receiverId: 1, senderId: 1 }, { unique: true });

module.exports = mongoose.model("ratings", schema);
