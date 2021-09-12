require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { password } = req.body;
  const user = { name: "Parent"}

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

  if (password === process.env.USER_PASS) {
    res.status(200).json({status: "ok", token: accessToken})
  } else {
    res.status(401).json({errors: "invalid", info: "Invalid Password"})
  }
})

module.exports = router;