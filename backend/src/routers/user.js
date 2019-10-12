const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/users', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    const data = [user, token];
    res.send(data);
  } catch (err) {
    res.status(400).send('An account with that email address already exists.');
  }
});

router.post('/users/login', urlencodedParser, async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    const data = [user, token];
    res.send(data);
  } catch(err) {
    res.status(400).send('Incorrect username or password.');
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;
