const Passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("./db/models/index");
const bcrypt = require("bcryptjs");

/**
 * @param {import("passport").PassportStatic} passport
 */
module.exports = (passport) => {
  passport.use(
    "local",
    new LocalStrategy((username, password, done) => {
      User.findOne({ where: { username } }).then((user) => {
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ where: { id } })
      .then((user) => {
        cb(false, user);
      })
      .catch((err) => cb(err, false));
  });
};
