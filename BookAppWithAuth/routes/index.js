var express = require("express");
var router = express.Router();
// var books = require("../resources/books");
let Books = require("../models/books");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/* GET home page. */
router.get("/", async function (req, res, next) {
  // eval(require("locus"));

  var noMatch = 0;
  var noMatchmsg = "";
  //Search books
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    //Get searched books from db
    Books.find()
      .or([{ title: regex }, { author: regex }, { genre: regex }])
      .exec(function (err, bookSearched) {
        if (err) {
          console.log(err);
        } else {
          if (bookSearched.length < 1) {
            console.log("No book match your query, Please try again!!");
            noMatchmsg = "No book match your query, Please try again!";
            noMatch = 1;
            res.render("index", {
              title: "Your Books",
              bookList: bookSearched,
              noMatch: noMatch,
              noMatchmsg: noMatchmsg,
              isLoggedIn: req.isAuthenticated(),
              logoutMessage: req.flash("logoutmessage"), //from logout
            });
            // eval(require("locus"));
          } else {
            res.render("index", {
              title: "Your Books",
              bookList: bookSearched,
              noMatch: noMatch,
              noMatchmsg: noMatchmsg,
              isLoggedIn: req.isAuthenticated(),
              logoutMessage: req.flash("logoutmessage"), //from logout
            });
          }
        }
      });
  } else {
    let books = await Books.find();
    res.render("index", {
      title: "Book App",
      bookList: books,
      noMatch: noMatch,
      noMatchmsg: noMatchmsg,
      isLoggedIn: req.isAuthenticated(),
      logoutMessage: req.flash("logoutmessage"), //from logout
      // loginMessage: req.flash(passport.successFlash),
    });
  }
});

router.get("/deena", function (req, res, next) {
  res.render("index", { title: "Deena" });
});

module.exports = router;
