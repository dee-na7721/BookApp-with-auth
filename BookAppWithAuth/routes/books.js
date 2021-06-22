var express = require("express");
var router = express.Router();
var books = require("../resources/books");
let Books = require("../models/books");
const { findOneAndUpdate } = require("../models/books");
const { route } = require(".");
const { render } = require("../app");

//Get add book page
router.get("/add", function (req, res, next) {
  res.render("addBooks", {
    title: "Add book",
  });
});

//Save created book
router.post("/save", function (req, res) {
  const book = new Books(req.body);
  let promise = book.save();
  promise.then(() => {
    console.log("Book Added");
    res.redirect("/");
  });
});

//Delete books
router.get("/remove/:id", function (req, res) {
  Books.remove({ _id: req.params.id }, function () {
    res.redirect("/");
  });
});

//Get edit page
router.get("/edit/:_id", function (req, res) {
  Books.findOne({ _id: req.params._id }, function (err, book) {
    res.render("editBooks", { title: "Edit Book", book: book });
  });
});

//Post changes
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

//Search books
// router.get("/search", (req, res) => {
//   res.render("search");
// });

// //
// router.get("/searchbooks/:searchitem", (req, res) => {
//   var regex = new RegExp(req.params.searchitem, "i");

//   try {
//     Books.find({
//       $or: [{ title: regex }, { author: regex }, { genre: regex }],
//     }).then((result) => {
//       res.status(200).json(result);
//       // watch here
//       res.render("search", { bookList: result });
//     });
//   } catch (err) {
//     res.status.send(err);
//   }

// var searchItem = req.params.searchitem;
// try {
//   Books.find(
//     {
//       $or: [
//         { title: { $regex: `${searchItem}`, options: "$i" } },
//         // { author: { $regex: req.params.search, $options: "$i" } },
//         // { description: { $regex: req.params.search, $options: "$i" } },
//         // { genre: { $regex: req.params.search, $options: "$i" } },
//       ],
//     },
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("search", { message: "testing", data: data });
//       }
//     }
//   );
// } catch (error) {
//   console.log(error);
// }
// });

module.exports = router;
