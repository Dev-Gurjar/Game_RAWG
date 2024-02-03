const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controller");

router.route("/home").get(controllers.home);
router.route("/register").post(controllers.register);
router.route("/login").post(controllers.login);

module.exports = router;
