const express = require("express");
const router = express.Router();
const Accounts = require("./models");

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

router.patch("/:id/update", (req, res) => {
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

router.post("/new", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
