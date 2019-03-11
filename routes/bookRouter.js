const express = require('express');
const booksController = require('../controllers/bookscontroller.js');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books').get(controller.get);

  bookRouter.route('/books').post(controller.post);

  bookRouter.use('/books/:bookid', (req, res, next) => {
    Book.findById(req.params.bookid, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  bookRouter.route('/books/:bookid').get((req, res) => {
    const { book } = req;
    res.json(book);
  });

  bookRouter.route('/books/:bookid').put((req, res) => {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });
  bookRouter.route('/books/:bookid').patch((req, res) => {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });
  bookRouter.route('/books/:bookid').delete((req, res) => {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  });

  return bookRouter;
}
module.exports = routes;
