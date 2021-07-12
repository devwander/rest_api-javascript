import { hash } from "bcrypt";
import teachers from "../models/Teacher";

class TeacherController {
  async index(req, res) {
    try {
      const teacher = await teachers.findAll();
      return res.json(teacher);
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

      const teacher = await teachers.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist."],
        });
      }
      return res.json(teacher);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const password_hash = await hash(password, 8);

      const teacher = await teachers.create({
        name,
        email,
        password: password_hash,
      });

      return res.json(teacher);
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

      const teacher = await teachers.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist."],
        });
      }

      const teacherUpdated = await teacher.update(req.body);

      return res.json(teacherUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
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

      const teacher = await teachers.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist."],
        });
      }

      await teacher.destroy();
      return res.json({
        msg: ["Teacher deleted successfully."],
        user: { teacher },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TeacherController();
