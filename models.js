const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
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
      default:
        "https://res.cloudinary.com/joshdowns-dev/image/upload/v1623003072/kids_bank/default-robot_bwfzgl.jpg",
    },
  },
  { strict: false }
);

module.exports = Accounts = mongoose.model("users", AccountSchema);
