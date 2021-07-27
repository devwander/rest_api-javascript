const { Router } = require("express");
const memberController = require("../controllers/MemberController");
const Auth = require("../middlewares/Auth");

const router = new Router();

router.post("/", Auth, memberController.store);
router.get("/", Auth, memberController.index);
router.get("/:id", Auth, memberController.show);
router.put("/:id", Auth, memberController.update);
router.delete("/:id", Auth, memberController.delete);

module.exports = router;
