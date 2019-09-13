require('dotenv').config({path: '../../.env'});
const express = require('express');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const Book = require('./models/book');
const auth = require('./middleware/auth');
const userRouter = require('./routers/user-router');
const bookRouter = require('./routers/book-router');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(userRouter);
app.use(bookRouter);

app.listen(3000, () => {
  console.log('Server started on port ' + process.env.PORT);
});
