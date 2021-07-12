import dotenv from "dotenv";
import express from "express";

import homeRoutes from "./routes/homeRoutes";
import studentRoutes from "./routes/studentRoutes";
import teacherRoutes from "./routes/teacherRoutes";

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
    this.app.use("/students", studentRoutes);
    this.app.use("/teachers", teacherRoutes);
  }
}
export default new App().app;
