document.addEventListener("DOMContentLoaded", () => {
    books.forEach((book) => {
        book.releaseDate = Date.parse(book.releaseDate);
        book.state.availableCount = Number.parseInt(book.state.availableCount);
        book.state.owners.forEach((owner) => {
            owner.pickDate = Date.parse(owner.pickDate);
        })
    });

    filterBooks();
});

function buildBookCard(book) {
    return `
    <div class="w3-card w3-panel">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
    </div>
    `;
}

function filterBooks() {
    let onlyAvailable = document.getElementById("books-filter-only-available").checked;
    let booksPlace = document.getElementById("books-place");

    booksPlace.innerHTML = "";
    let filtered = books.filter((book) => !onlyAvailable || book.state.availableCount > 0);

    if (filtered.length > 0)
        filtered.forEach((book) => {
            booksPlace.innerHTML += buildBookCard(book);
        });
    else
        booksPlace.innerHTML = "<p>Книги не найдены</p>";
}