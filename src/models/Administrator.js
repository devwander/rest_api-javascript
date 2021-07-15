const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define("Administrator", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email already exists.",
      },
      validate: {
        isEmail: {
          msg: "Invalid email.",
        },
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  Administrator.beforeCreate((administrator) => {
    administrator.admin = true;
    administrator.id = uuid();
  });

  return Administrator;
};
