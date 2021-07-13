import dotenv from "dotenv";
import express from "express";

import homeRoutes from "./routes/homeRoutes";
import memberRoutes from "./routes/memberRoutes";
import administratorRoutes from "./routes/administratorRoutes";
import loginRoutes from "./routes/loginRoutes";

dotenv.config();

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
export default new App().app;
