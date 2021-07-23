const { Router } = require("express");
const administratorController = require("../controllers/AdministratorController");
const loginRequired = require("../middlewares/loginRequired");
const isYourself = require("../middlewares/isYourself");

const router = new Router();

router.post("/", administratorController.store);
router.get("/", administratorController.index);
router.get("/:id", administratorController.show);
router.put("/:id", loginRequired, isYourself, administratorController.update);
router.delete(
  "/:id",
  loginRequired,
  isYourself,
  administratorController.delete
);

module.exports = router;
