const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/bookFinderDB', {
  useNewUrlParser:true,
  useCreateIndex: true
});
