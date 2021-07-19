const express = require("express");

const homeRoutes = require("./routes/homeRoutes");
const memberRoutes = require("./routes/memberRoutes");
const administratorRoutes = require("./routes/administratorRoutes");
const loginRoutes = require("./routes/loginRoutes");

require("dotenv").config("../.env");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/members", memberRoutes);
    this.app.use("/administrators", administratorRoutes);
    this.app.use("/login", loginRoutes);
  }
}
module.exports = new App().app;
