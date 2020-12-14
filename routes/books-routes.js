const router = require("express").Router();
const booksWorker = require("../books");
const mustAuthenticated = require("./must-authenticated");

router.get("/", (req, res, next) => {
    let allBooks = booksWorker.getAll();
    res.render("books-list", {
        user: req.user,
        books: allBooks
    });
});

router.get("/add-book", (req, res, next) => {
   res.render("add-book", {
       user: req.user,
   });
});

router.put("/books", mustAuthenticated, (req, res, next) => {
    let book = {
        title: req.body.title,
        author: req.body.author,

    };
    booksWorker.put(req.body, (err, book) => {
        if (book)
            res.send({id: book.id});
        else {
            res.status(400);
            res.send({error: err});
        }
    });
});

module.exports = router;
