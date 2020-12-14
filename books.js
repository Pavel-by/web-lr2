const fs = require("fs");
const utils = require("./utils");

const PATH = "storage/books.json";

let db;

try {
    db = JSON.parse(fs.readFileSync(PATH));

    if (!Array.isArray(db.books)) {
        console.error("Invalid content of books file: root element should be array");
        db.books = [];
    }

    if (typeof db.nextId === "string")
        db.nextId = Number.parseInt(db.nextId);

    if (!Number.isInteger(db.nextId)) {
        console.error("Invalid nextId in books");
        db.nextId = 1;
    }

} catch (e) {
    db = generateDB();
    console.error("Failed to read list of books");
    console.error(e);
}

function generateDB() {
    return {
        nextId: 1,
        books: []
    }
}

function save() {
    fs.writeFile(PATH, JSON.stringify(db));
}

module.exports = {
    findOne: (criteria) => utils.clone(db.books.find(criteria)),
    getAll: () => utils.clone(db.books),
    put: (book, callback) => {
        if (!book)
            return callback(`'null' book passed`, null);

        if (!book.author)
            return callback(`put: invalid author of book ${book.author}`, null);

        if (!book.releaseDate)
            return callback(`put: invalid release date of book ${book.releaseDate}`, null);

        if (!book.title)
            return callback(`put: invalid title of book ${book.title}`, null);

        if (!book.state)
            return callback(`put: book.state should be set`, null);

        if (!Number.isInteger(book.state.availableCount) || book.state.availableCount < 0)
            return callback(`put: invalid availableCount in book ${book.state.availableCount}`, null);

        if (!Array.isArray(book.state.owners))
            book.state.owners = [];

        let oldIndex = db.books.indexOf(db.books.find((oldBook) => oldBook.id === book.id));

        if (oldIndex >= 0)
            db.books[oldIndex] = book;
        else {
            book.id = db.nextId++;
            db.books.push(book);
        }

        save();

        return callback(null, book);
    }
};