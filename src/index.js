const express = require("express");
const session = require("express-session");
const { db } = require("./db/models/index");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rootRouter = require("./routes/createRouter");
const passport = require("passport");
const passportConfig = require("./passportConfig");
const cors = require("cors");

const { PORT } = process.env;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "social-media-back-login-cookie"
  })
);

const whitelist = process.env.WHITELISTED_URLS.split(";");
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

db.sync({ force: false }).then(() => console.log("Synced successfully"));

app.use("/", rootRouter());

app.listen(PORT, () => {
  console.log("Port started successfully on port: " + PORT);
});
