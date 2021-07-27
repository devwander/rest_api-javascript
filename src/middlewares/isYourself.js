const { Administrator } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const usermodified = await Administrator.findByPk(req.userId);
    console.log(req.userId);
    const user = await Administrator.findOne({
      where: { email: req.userEmail },
    });

    if (user.email !== usermodified.email) {
      return res.status(403).json({
        errors: [
          "You do not have authorization to modify another administrator's data.",
        ],
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
