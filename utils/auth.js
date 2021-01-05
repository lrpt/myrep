const session = require("express-session");
const passport = require("passport");
const usersModel = require("../models/user.model");
module.exports = {
  initialization(app) {
    app.use(
      session({
        secret: "mySecretKey",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      done(null, user.username);
    });
    passport.deserializeUser(async function (username, done) {
      let user = await usersModel.read(username);
      done(null, user);
    });
  },
  checkAuthentication(role) {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        if (role) {
          if (role === request.user.role) {
            return next();
          } else {
            console.log("inglobalsecure");
            return response.end("401 Unautorized");
          }
        } else {
          return next();
        }
      } else {
        console.log("globalsecurenotauthenticated");
        response.redirect("/login");
      }
    }
  }
};