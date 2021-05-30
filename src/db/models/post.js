const { DataTypes } = require("sequelize");

module.exports = (db) =>
  db.define("Post", {
    content: {
      type: DataTypes.STRING(400)
    }
  });
