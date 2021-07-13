import { Router } from "express";
import memberController from "../controllers/MemberController";

const router = new Router();

router.post("/", memberController.store);
router.get("/", memberController.index);
router.get("/:id", memberController.show);
router.put("/:id", memberController.update);
router.delete("/:id", memberController.delete);

export default router;
