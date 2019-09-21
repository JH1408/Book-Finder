require('dotenv').config({path: '../.env'});
const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const User = require('./models/user');
const Book = require('./models/book');
const auth = require('./middleware/auth');
const userRouter = require('./routers/user');
const bookRouter = require('./routers/book');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(userRouter);
app.use(bookRouter);

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});
