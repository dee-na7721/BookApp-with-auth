var express = require("express");
var router = express.Router();
var books = require("../resources/books");
let Books = require("../models/books");
const { findOneAndUpdate } = require("../models/books");

router.get("/add", function (req, res, next) {
  res.render("addBooks", {
    title: "Add book",
  });
});

router.post("/save", function (req, res) {
  const book = new Books(req.body);
  let promise = book.save();
  promise.then(() => {
    console.log("Book Added");
    res.redirect("/");
  });
});

router.get("/remove/:id", function (req, res) {
  Books.remove({ _id: req.params.id }, function () {
    res.redirect("/");
  });
});

router.get("/edit/:_id", function (req, res) {
  Books.findOne({ _id: req.params._id }, function (err, book) {
    res.render("editBooks", { title: "Edit Book", book: book });
  });
});

router.post("/edit/:_id", function (req, res) {
  Books.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    function (err, book) {
      console.log(book);
      res.redirect("/");
    }
  );
});

module.exports = router;
