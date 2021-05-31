const express = require("express");
const session = require("express-session");
const { db } = require("./db/models/index");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rootRouter = require("./routes/createRouter");
const passport = require("passport");
const passportConfig = require("./passportConfig");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "social-media-back-login-cookie"
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

db.sync({ force: false }).then(() => console.log("Synced successfully"));

app.use("/", rootRouter());

app.listen(2000, () => {
  console.log("Port started successfully");
});
