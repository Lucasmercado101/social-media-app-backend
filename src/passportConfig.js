import Passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./db/models/index";
import bcrypt from "bcryptjs";

/**
 * @param {Passport} passport
 */
module.exports = (passport) => {
  passport.use(
    "local",
    new LocalStrategy((loginField, password, done) => {
      User.findOne({ where: { userName: loginField } }).then((user) => {
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
    User.findOne({ where: { id }, include: { all: true } })
      .then((user) => {
        cb(false, user);
      })
      .catch((err) => cb(err, false));
  });
};
