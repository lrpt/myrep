const express = require("express");
const router = express.Router();
const model = require("../models/user.model");

router.get("/", function (request, response) {
  if (request.isAuthenticated()) {
    if (request.user.type === "ADMIN") {
      response.redirect("/Aprofile/admin");
    } else {
      response.redirect("/profile/user");
    }
  } else {
    response.render("login", { errors: [] });
  }
});

router.post("/", async function (request, response) {
  areValid = await model.areValidCredentials(request.body.username, request.body.passw);

  if (areValid) {
    user = await model.read(request.body.username);
    await request.login(user, function (err) { });

    if (request.user.role === "ADMIN") {
      response.redirect("/profile/admin");
    } else {
      response.redirect("/profile/user");
    }
  } else {
    response.render("login", {
      errors: [{ msg: "Invalid credentials provided" }],
    });
  }
});
router.post("/logout", function (request, response) {
  request.logOut();
  response.redirect("/login");
});
module.exports = router;
