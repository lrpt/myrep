const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bodyParser = require("body-parser")
const auth = require("./utils/auth");
auth.initialization(app);

app.listen(process.env.SERVER_PORT, function () {
    console.log("Server listening at: " + process.env.SERVER_PORT)
});

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/login", require("./controllers/login.route"));
app.use("/profile", require("./controllers/profile.route"));
