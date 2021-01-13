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
  education: [
    {
      institutionName: {
        type: String,
        required: true,
      },
      startYear: {
        type: Number,
        min: 1930,
        max: new Date().getFullYear(),
        required: true,
      },
      endYear: {
        type: Number,
        max: new Date().getFullYear(),
        validate: (value) => {
          if (value) {
            return this.startYear <= value;
          }
          return true;
        },
      },
    },
  ],
  skills: [String],
  rating: {
    type: mongoose.Types.Decimal128,
    max: 5.0,
    default: -1.0,
  },
  resume: {
    type: String,
  },
  profile: {
    type: String,
  },
});

module.exports = mongoose.model("JobApplicantInfo", schema);
