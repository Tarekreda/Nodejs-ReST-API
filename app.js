const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookmodel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API');
});
app.listen(port, () => {
  console.log('running on port');
});
