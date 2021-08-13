const { Router } = require("express");
const administratorController = require("../controllers/AdministratorController");
const Auth = require("../middlewares/Auth");
const isYourself = require("../middlewares/isYourself");

const router = new Router();

router.post("/", administratorController.store);
router.get("/", Auth, administratorController.index);
router.get("/:id", Auth, administratorController.show);
router.put("/", Auth, isYourself, administratorController.update);
router.delete("/", Auth, isYourself, administratorController.delete);

module.exports = router;
