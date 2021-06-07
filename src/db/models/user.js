const { DataTypes } = require("sequelize");

module.exports = (db) =>
  db.define("User", {
    firstName: {
      type: DataTypes.STRING(50)
    },
    lastName: {
      type: DataTypes.STRING(50)
    },
    profilePictureURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
