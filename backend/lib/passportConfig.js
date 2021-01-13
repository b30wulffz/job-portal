const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const User = require("../db/User");

passport.use(
  new Strategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "User does not exist",
        });
      }

      user
        .login(password)
        .then(() => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Password is incorrect.",
          });
        });
    });
  })
);

module.exports = passport;
