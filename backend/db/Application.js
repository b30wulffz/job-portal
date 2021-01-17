const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "accepted", "rejected", "deleted"],
    default: "applied",
    required: true,
  },
  sop: {
    type: String,
    validate: {
      validator: function (v) {
        return v.split(" ").filter((ele) => ele != "").length <= 250;
      },
      msg: "Statement of purpose should not be greater than 250 words",
    },
  },
});

module.exports = mongoose.model("applications", schema);
