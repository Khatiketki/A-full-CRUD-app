const apiUrl = 'https://mycrudapi.free.beeceptor.com/books'; // Replace with your Beeceptor URL
const bookId = new URLSearchParams(window.location.search).get('id');
const formTitle = document.getElementById('formTitle');
const bookForm = document.getElementById('bookForm');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');

if (bookId) {
  formTitle.textContent = 'Edit Book';
  loadBookData(bookId);
} else {
  formTitle.textContent = 'Create a New Book';
}

// Fetch data for editing an existing book
async function loadBookData(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const book = await response.json();
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.year;
  } catch (error) {
    console.error('Error fetching book data:', error);
  }
}

// Save a new book or update an existing book
async function saveBook(event) {
  event.preventDefault();
  
  const book = {
    title: titleInput.value,
    author: authorInput.value,
    year: yearInput.value
  };

  try {
    let response;
    if (bookId) {
      response = await fetch(`${apiUrl}/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
    }
    
    const data = await response.json();
    console.log('Book saved:', data);
    window.location.href = 'index.html'; // Redirect to the homepage
  } catch (error) {
    console.error('Error saving book:', error);
  }
}

// Handle form submission to save the book
bookForm.onsubmit = saveBook;
