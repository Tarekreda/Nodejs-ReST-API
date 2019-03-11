const should = require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksController.js');

describe('book controller tests:', () => {
  describe('post', () => {
    it('should not allow an empty title on post ', () => {

      const Book = function (Book) {
        this.save = () => { }
      };
      const req = {
        body: {
          author: 'jon'
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      const controller = booksController(Book);
      controller.post(req,res);

      res.status.calledWith(400).should.equal(true,`bad status ${res.status.args[0][0]}`);
      res.send.calledWith('title is required').should.equal(true);

    })

  })



})