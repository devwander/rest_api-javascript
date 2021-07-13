import { Router } from "express";
import administratorController from "../controllers/AdministratorController";

const router = new Router();

router.post("/", administratorController.store);
router.get("/", administratorController.index);
router.get("/:id", administratorController.show);
router.put("/:id", administratorController.update);
router.delete("/:id", administratorController.delete);

export default router;
