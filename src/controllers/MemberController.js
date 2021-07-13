import members from "../models/Member";

class MemberController {
  async index(req, res) {
    try {
      const member = await members.findAll();
      return res.json(member);
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

      const member = await members.findByPk(id);

      if (!member) {
        return res.status(400).json({
          errors: ["Member does not exist."],
        });
      }
      return res.json(member);
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
      const { name, email } = req.body;

      const member = await members.create({ name, email });

      return res.json(member);
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

      const member = await members.findByPk(id);

      if (!member) {
        return res.status(400).json({
          errors: ["Member does not exist."],
        });
      }

      const memberUpdated = await member.update(req.body);

      return res.json(memberUpdated);
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

      const member = await members.findByPk(id);

      if (!member) {
        return res.status(400).json({
          errors: ["Member does not exist."],
        });
      }

      await member.destroy();
      return res.json({
        msg: ["Member deleted successfully."],
        user: { member },
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

export default new MemberController();
