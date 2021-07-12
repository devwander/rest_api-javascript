import { Router } from "express";
import teacherController from "../controllers/TeacherController";

const router = new Router();

router.post("/", teacherController.store);
router.get("/", teacherController.index);
router.get("/:id", teacherController.show);
router.put("/:id", teacherController.update);
router.delete("/:id", teacherController.delete);

export default router;
