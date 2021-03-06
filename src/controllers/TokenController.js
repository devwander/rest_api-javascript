const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");

const { Administrator } = require("../models");

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ["Invalid information."],
      });
    }

    const user = await Administrator.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ["Administrator does not exist."],
      });
    }

    if (!(await compareSync(password, user.password))) {
      return res.status(401).json({
        errors: ["Invalid password."],
      });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}

module.exports = new TokenController();
