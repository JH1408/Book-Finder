require('dotenv').config({path: '../../.env'});
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const Book = require('../models/book');
const auth = require('../middleware/auth');

const router = new express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/books/search/:query', async (req, res) => {
  const searchQuery = req.params.query;
  try {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${process.env.BOOKS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      res.status(201).send(data.items);});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/books', auth, async (req, res) => {
  const book = new Book({
    author: req.user._id
  });
  try {
    await book.save();
    res.status(201).redirect('books');
  } catch (err) {
    res.status(400).send(err);
  }
});

 router.get('/books', auth, async (req, res) => {
     try {
       res.send(req.user.tasks);
     } catch(err) {
       res.status(500).send();
     }
 });

router.get('/books/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const book = await Book.findOne({_id, author: req.user._id});
    if(!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch(err) {
    res.status(500).send();
  }
});

router.delete('/books/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({_id: req.params.id, author: req.user._id});
    if(!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch(err) {
    res.status(500).send();
  }
});

router.delete('/books', auth, async (req, res) => {
  try {
    const book = await Book.deleteMany({author: req.user._id});
    res.send();
  } catch(err) {
    res.status(500).send();
  }
});

module.exports = router;
