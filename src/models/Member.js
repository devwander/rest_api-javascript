const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
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
  });

  Member.beforeCreate((member) => {
    member.admin = true;
    member.id = uuid();
  });
  return Member;
};
