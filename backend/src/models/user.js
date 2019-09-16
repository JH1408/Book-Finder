require('dotenv').config({path: '../../.env'});
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Book = require('./book');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Your password cannot contain the word password.');
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
}, {
  timestamps: true
});

userSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'owner'
});

// Create new method for instance
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET);

  user.tokens = user.tokens.concat({token});
  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// Create new method for User model
userSchema.statics.findByCredentials = async(email, password) => {
  const user = await User.findOne({email});
  if(!user) {
    throw new Error('Unable to login.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    throw new Error('Unable to login.');
  }
  return user;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete saved books when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Book.deleteMany({author: user._id});
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
