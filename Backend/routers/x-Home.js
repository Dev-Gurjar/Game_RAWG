const express = require("express");
const router = express.Router();

router.get("/xhome", (req, res) => {
  res.status(200).send("This is A Illegal Home Page");
});

module.exports = router;
