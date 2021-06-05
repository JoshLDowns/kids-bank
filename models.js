const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  spend: {
    type: Number,
    default: 0,
  },
  savings: {
    type: Number,
    default: 0,
  },
  wishlist: {
    type: Array,
    default: [],
  },
  avatarUrl: {
    type: String,
  }
}, {strict: false})

module.exports = Accounts = mongoose.model("users", AccountSchema);
