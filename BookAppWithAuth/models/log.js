var mongoose = require("mongoose");
var User = require("./users");
var users = new User();

const logSchema = mongoose.Schema({
  userEmail: String,
  isloggedIn: Boolean,
  loggedTimes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Log", logSchema);
