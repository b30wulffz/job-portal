const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const Job = require("../db/Job");

const router = express.Router();

router.post("/addJob", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json(info);
      return;
    }

    // when user exists
    const data = req.body;
    console.log("Passed");
    let job = new Job({
      userId: user._id,
      title: data.title,
      maxApplicants: data.maxApplicants,
      maxPositions: data.maxPositions,
      dateOfPosting: data.dateOfPosting,
      deadline: data.deadline,
      skillsets: data.skillsets,
      jobType: data.jobType,
      duration: data.duration,
      salary: data.salary,
      rating: data.rating,
    });

    job
      .save()
      .then(() => {
        res.json({ message: "Job added successfully to the database" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  })(req, res, next);
});

module.exports = router;
