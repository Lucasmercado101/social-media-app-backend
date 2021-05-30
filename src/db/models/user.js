const { DataTypes } = require("sequelize");

module.exports = (db) =>
  db.define("User", {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
