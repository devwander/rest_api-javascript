import students from "../models/Student";

class StudentController {
  async index(req, res) {
    try {
      const student = await students.findAll();
      return res.json(student);
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

      const student = await students.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ["Student does not exist."],
        });
      }
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const { name, email } = req.body;

      const student = await students.create({ name, email });

      return res.json(student);
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

      const student = await students.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ["Student does not exist."],
        });
      }

      const studentUpdated = await student.update(req.body);

      return res.json(studentUpdated);
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

      const student = await students.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ["Student does not exist."],
        });
      }

      await student.destroy();
      return res.json({
        msg: ["Student deleted successfully."],
        user: { student },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
