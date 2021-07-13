import { Router } from "express";
import memberController from "../controllers/MemberController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, memberController.store);
router.get("/", loginRequired, memberController.index);
router.get("/:id", loginRequired, memberController.show);
router.put("/:id", loginRequired, memberController.update);
router.delete("/:id", loginRequired, memberController.delete);

export default router;
