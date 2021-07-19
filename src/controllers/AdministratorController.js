const { hash } = require("bcrypt");

const { Administrator } = require("../models");

class AdministratorController {
  async index(req, res) {
    try {
      const administrator = await Administrator.findAll();
      return res.json(administrator);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID not found."],
        });
      }

      const administrator = await Administrator.findByPk(id);

      if (!administrator) {
        return res.status(400).json({
          errors: ["Administrator does not exist."],
        });
      }
      return res.json(administrator);
    } catch (e) {
      if (e.length > 1) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: ["Incorrect UUID syntax"],
      });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const password_hash = await hash(password, 8);

      const administrator = await Administrator.create({
        name,
        email,
        password: password_hash,
      });

      return res.json(administrator);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID not found."],
        });
      }

      const administrator = await Administrator.findByPk(id);

      if (!administrator) {
        return res.status(400).json({
          errors: ["Administrator does not exist."],
        });
      }

      const administratorUpdated = await administrator.update(req.body);

      return res.json(administratorUpdated);
    } catch (e) {
      if (e.length > 1) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: ["Incorrect UUID syntax"],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID not found."],
        });
      }

      const administrator = await Administrator.findByPk(id);

      if (!administrator) {
        return res.status(400).json({
          errors: ["Administrator does not exist."],
        });
      }

      await administrator.destroy();
      return res.json({
        msg: ["Administrator deleted successfully."],
        user: { administrator },
      });
    } catch (e) {
      if (e.length > 1) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }
      return res.status(400).json({
        errors: ["Incorrect UUID syntax"],
      });
    }
  }
}

module.exports = new AdministratorController();
