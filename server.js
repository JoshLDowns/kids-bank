require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@kids-bank-cluster.siwok.mongodb.net/accounts?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log(`MongoDB connected!`))
  .catch((err) => console.log(err));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
