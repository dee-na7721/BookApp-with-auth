var express = require('express');
var router = express.Router();
var books = require('../resources/books')
let Books = require('../models/books');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Books.find({}, function(err, books) {
    let books= await Books.find();
    // if (!err) {
      res.render('index', { title: 'Book App', bookList: books });
    // } else {
      // console.log('error', err);
    // }
  })

  
  // res.render('index', { title: 'BookApp',bookList:books }, );
// });


router.get('/deena', function(req, res, next) {
  res.render('index', { title: 'Deena' });
});

module.exports = router;
