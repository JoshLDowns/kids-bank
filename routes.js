require("dotenv").config();
const express = require("express");
const router = express.Router();
const Accounts = require("./models");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(400).json({errors: "invalid", info: "Invalid User"})

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.status(403).json({errors: "invalid", info: "Invalid Token"})
    req.user = user
    next()
  })
}

router.get("/", (_req, res) => {
  Accounts.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(400).json({
        errors: err.toString(),
        info: "An error occured while fetching accounts",
      })
    );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const query = Accounts.where({ _id: id });
  query
    .findOne()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res
        .status(400)
        .json({ errors: err.toString(), info: "Account could not be fetched" })
    );
});

router.patch("/:id/update", authenticateToken, (req, res) => {
  const id = req.params.id;
  const { field, value } = req.body;
  Accounts.findByIdAndUpdate(id, { [field]: value }, { new: true, useFindAndModify: false })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errors: err.toString(), info: "Account could not be updated" });
    });
});

router.post("/new", authenticateToken, (req, res) => {
  const { username, spend, savings, avatarUrl } = req.body;
  const newAccount = new Accounts({
    username: username,
    spend: spend,
    savings: savings,
    wishList: [],
    avatarUrl: avatarUrl,
  });
  newAccount
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errors: err.toString(), info: "Account could not be created" });
    });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const query = Accounts.where({ _id: id });
  query
    .deleteOne()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errors: err.toString(), info: "Account could not be deleted" });
    });
});

module.exports = router;
