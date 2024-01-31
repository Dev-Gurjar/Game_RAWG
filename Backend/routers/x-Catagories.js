const express = require("express");
const router = express.Router();

router.get("/xcatagories", (req, res) => {
  res.status(200).send("These are Catagories of illegal content.");
});

module.exports = router;
