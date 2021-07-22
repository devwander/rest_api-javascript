class HomeController {
  async index(req, res) {
    res.json({
      title: "API REST - Javascript",
      description:
        "This project aims to materialize my knowledge in building rest apis with javascript and node.js. It simulates a simple organizational structure that has administrators and members, and these administrators are responsible for actions in the system.",
    });
  }
}

module.exports = new HomeController();
