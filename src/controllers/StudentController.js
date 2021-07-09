import students from "../models/Student";

class StudentController {
  async store(req, res) {
    try {
      const { name, email } = req.body;
      console.log(req.body);
      const student = await students.create({ name, email });
      console.log(student);

      return res.json(student);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }

  async index(req, res) {
    try {
      res.status(200).json("Router get student");
    } catch (e) {
      res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new StudentController();
