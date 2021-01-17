const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  recruiterId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "applied", // when a applicant is applied
      "shortlisted", // when a applicant is shortlisted
      "accepted", // when a applicant is accepted
      "rejected", // when a applicant is rejected
      "deleted", // when any job is deleted
      "cancelled", // an application is cancelled by its author or when other application is accepted
      "finished", // when job is over
    ],
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
