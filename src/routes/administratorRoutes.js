import { Router } from "express";
import administratorController from "../controllers/AdministratorController";
import loginRequired from "../middlewares/loginRequired";
import isYourself from "../middlewares/isYourself";

const router = new Router();

router.post("/", administratorController.store);
router.get("/", loginRequired, administratorController.index);
router.get("/:id", loginRequired, administratorController.show);
router.put("/:id", loginRequired, isYourself, administratorController.update);
router.delete(
  "/:id",
  loginRequired,
  isYourself,
  administratorController.delete
);

export default router;
