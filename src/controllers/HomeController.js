class HomeController {
  async index(req, res) {
    res.json("TESTE");
  }
}

module.exports = new HomeController();
