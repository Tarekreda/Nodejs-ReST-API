function booksController(Book) {

  function post(req, res) {
    const book = new Book(req.body);
    if(!req.body.title){
      res.status(400);
      return res.send("title is required");
    }
    book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
    const myquery = {};
    req.query.genre ? myquery.genre = req.query.genre : null;
    Book.find(myquery, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    })

  }

  return { post, get }
}

module.exports = booksController;