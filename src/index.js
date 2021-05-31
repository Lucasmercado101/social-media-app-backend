const express = require("express");
const session = require("express-session");
const db = require("./db/models/index");
const app = express();
const morgan = require("morgan");
const rootRouter = require("./routes/createRouter");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "social-media-back-login-cookie"
  })
);

app.use(morgan("dev"));
app.use(express.json());

db.sync({ force: true }).then(() => console.log("Synced successfully"));

app.use("/", rootRouter());

app.listen(2000, () => {
  console.log("Port started successfully");
});
