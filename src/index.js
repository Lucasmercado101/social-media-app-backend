const express = require("express");
const db = require("./db/models/index");
const app = express();

app.use(express.json());

db.sync({ force: true }).then(() => console.log("Synced successfully"));

app.listen(5000, () => {
  console.log("Port started successfully");
});
