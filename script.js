const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById("library");
    library.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <p><strong>${book.title}</strong></p>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p style="color: ${book.read ? 'green' : 'red'};">${book.read ? "Read" : "Not read"}</p>
            <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">${book.read ? "Mark Unread" : "Mark Read"}</button>
            <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
        `;

        library.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Show form on button click
document.getElementById("newBookBtn").addEventListener("click", function() {
    document.getElementById("bookForm").style.display = "block";
});

// Hide form when cancel button is clicked
document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("bookForm").style.display = "none";
});

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    this.reset();
    this.style.display = "none";
});