const { Router } = require("express");
const memberController = require("../controllers/MemberController");
const loginRequired = require("../middlewares/loginRequired");

const router = new Router();

router.post("/", loginRequired, memberController.store);
router.get("/", loginRequired, memberController.index);
router.get("/:id", loginRequired, memberController.show);
router.put("/:id", loginRequired, memberController.update);
router.delete("/:id", loginRequired, memberController.delete);

module.exports = router;
