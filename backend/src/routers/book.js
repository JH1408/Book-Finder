require('dotenv').config({path: '../../.env'});
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const _ = require('lodash');
const Book = require('../models/book');
const auth = require('../middleware/auth');

const router = new express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/books/search', async (req, res) => {
  const searchQuery = req.query.q;
  const startIndex = req.query.startIndex;
  try {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&key=${process.env.BOOKS_API_KEY}`)
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
    author: req.body.author ? req.body.author.toString() : '',
    title: req.body.title,
    img: req.body.img,
    link: req.body.link
  });
  try {
    const books = await Book.find({owner: req.body.owner});
    console.log(_.find(books, { 'title': req.body.title}) !== 'undefined');
    if(_.find(books, { 'title': req.body.title}) !== 'undefined') {
      return res.status(400).send('Already saved');
    } else {
      await book.save();
    }
    res.status(201).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

 router.get('/books/:userId/:token', auth, async (req, res) => {
     try {
       const books = await Book.find({owner: req.params.userId});
       res.send(_.uniqBy(books, 'title'));
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

module.exports = router;
