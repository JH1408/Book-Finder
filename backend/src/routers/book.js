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
      res.status(201).send(data.items);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post('/books', auth, async (req, res) => {
  const book = new Book({
    owner: req.body.owner,
    author: req.body.author.toString(),
    title: req.body.title,
    img: req.body.img,
    link: req.body.link
  });
  try {
    await book.save();
    res.status(201).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

 router.get('/books/:userId/:token', auth, async (req, res) => {
     try {
       const books = await Book.find({owner: req.params.userId});
       res.send(books);
     } catch(err) {
       res.status(500).send();
     }
 });

router.delete('/books/:owner/:token/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({_id: req.params.id, owner: req.params.owner});
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
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
