const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const User = require("../db/User");

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done, res) => {
      console.log(email, password);
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
            let userSecure = {};
            const unwantedKeys = ["password", "__v"];
            Object.keys(user["_doc"]).forEach((key) => {
              if (unwantedKeys.indexOf(key) === -1) {
                userSecure[key] = user[key];
              }
            });
            return done(null, userSecure);
          })
          .catch((err) => {
            return done(err, false, {
              message: "Password is incorrect.",
            });
          });
      });
    }
  )
);

module.exports = passport;
