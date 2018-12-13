const express = require("express");
const passport = require('passport');
const router = express.Router();



router.get("/chat", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
  });
  

  module.exports = router;