var express = require("express");
var router = express.Router();
let User = require("../models/users");
let Log = require("../models/log");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* GET users listing. */
router.get("/login", function (req, res) {
  res.render("login", {
    title: " Login",
    signinMessage: req.flash("signinMessage"),
  });
});

router.get("/signup", function (req, res) {
  res.render("signup", { title: "Signup" });
});

router.post("/signup", function (req, res) {
  console.log(req.body);

  const { username, email, gender, password, password2 } = req.body;
  let errors = [];
  //Check required fields
  if (!username || !email || !password || !password2 || !gender) {
    errors.push({ msg: "Please fill in all fields" });
    // res.send("please fill all fields");
    // console.log(errors);
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      username,
      email,
      gender,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("signup", {
          errors,
          username,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          username,
          email,
          gender,
          password,
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "signinMessage",
                  "You are now registered and can log in"
                );
                res.redirect("../users/login");
                // res.redirect("/");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

var log = new Log();

//Logs the User In
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    // successReturnToOrRedirect: this.call,
    successFlash: "You have logged in successfully!",
    failureRedirect: "../users/login",
    failureMessage: "email or pasword incorrect. Please try again!",
    failureFlash: true,
  })(req, res, next);
  // function call(req, res, next) {
  //   if (passport.successFlash.length > 0) {
  //     log.userEmail = req.body.email;
  //     log.isloggedIn = true;
  //     log.loggedTimes += 1;
  //     log.save();
  //   }
  // };
});
// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("logoutmessage", "You are logged out");
  log.loggedTimes = 0;
  log.isloggedIn = 0;
  log.save();
  res.redirect("/");
});

module.exports = router;
