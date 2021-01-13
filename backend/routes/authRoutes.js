const express = require("express");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");

const router = express.Router();

router.post("/signup", (req, res) => {
  const data = req.body;
  console.log(data);
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });
  console.log(user);

  user
    .save()
    .then(res.send("pass"))
    .catch((err) => {
      res.send("fail");
    });
  //     .then(() => {
  //       const userDetails =
  //         user.type == "recruiter"
  //           ? new Recruiter({
  //               userId: user.id,
  //               name: data.name,
  //               contactNumber: data.contactNumber,
  //               bio: data.bio,
  //             })
  //           : new JobApplicant({
  //               userId: user.id,
  //               name: data.name,
  //               education: data.education,
  //               skills: data.skills,
  //               rating: data.rating,
  //               resume: data.resume,
  //               profile: data.profile,
  //             });

  //       userDetails
  //         .save()
  //         .then(() => {
  //           // Token
  //           const token = jwt.sign({ id: user.id }, authKeys.jwtSecretKey);
  //           res.json({ token: token });
  //         })
  //         .catch((err) => {
  //           res.status().json({});
  //         });
  //     })
  //     .catch((err) => {
  //       res.status().json({});
  //     });
});

module.exports = router;
