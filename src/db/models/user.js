const { DataTypes } = require("sequelize");

module.exports = (db) =>
  db.define("User", {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
