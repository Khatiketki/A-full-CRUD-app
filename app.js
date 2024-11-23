const apiUrl = 'https://ketki1.free.beeceptor.com'; // Replace with your actual API URL or local data source
let books = [
  { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "pages": 180 },
  { "id": 2, "title": "1984", "author": "George Orwell", "genre": "Dystopian", "pages": 328 },
  { "id": 3, "title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "pages": 281 },
  { "id": 4, "title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "pages": 214 },
  { "id": 5, "title": "Moby Dick", "author": "Herman Melville", "genre": "Adventure", "pages": 635 },
  { "id": 6, "title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Romance", "pages": 279 },
  { "id": 7, "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "pages": 310 },
  { "id": 8, "title": "War and Peace", "author": "Leo Tolstoy", "genre": "Historical", "pages": 1225 },
  { "id": 9, "title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "genre": "Psychological", "pages": 430 },
  { "id": 10, "title": "The Odyssey", "author": "Homer", "genre": "Epic", "pages": 300 }
];

// DOM elements
const booksList = document.getElementById("books-list");
const createBookBtn = document.getElementById("create-book-btn");

// Render books
function renderBooks() {
  booksList.innerHTML = ''; // Clear the list before rendering
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Pages: ${book.pages}</p>
      <button onclick="editBook(${book.id})">Edit</button>
      <button onclick="deleteBook(${book.id})">Delete</button>
    `;
    booksList.appendChild(bookItem);
  });
}

// Add new book
function addBook(book) {
  books.push(book);
  renderBooks();
}

// Edit book
function editBook(id) {
  const book = books.find((b) => b.id === id);
  if (book) {
    window.location.href = `edit.html?id=${id}`;
  }
}

// Update book data (after editing)
function updateBook(id, updatedBook) {
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    renderBooks();
    window.location.href = "index.html"; // Go back to the homepage after updating
  }
}

// Delete book
function deleteBook(id) {
  books = books.filter((b) => b.id !== id);
  renderBooks();
}

// Handle create new book form submission
document.getElementById("edit-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const newBook = {
    title: document.getElementById("book-title").value,
    author: document.getElementById("book-author").value,
    genre: document.getElementById("book-genre").value,
    pages: document.getElementById("book-pages").value,
  };

  addBook(newBook);
  window.location.href = "index.html"; // Redirect to homepage after adding
});

// Load books when the page loads
window.addEventListener("load", () => {
  renderBooks();
});

