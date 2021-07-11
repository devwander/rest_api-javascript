const Sequelize = require("sequelize");
const database = require("../database/index");

const students = database.define("students", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: "Email already exists.",
    },
    validate: {
      isEmail: {
        msg: "Invalid email.",
      },
    },
  },
});

module.exports = students;
