document.addEventListener("DOMContentLoaded", () => {
  const myLibrary = [];

  const BookDialog = document.getElementById("BookDialog");
  const addBookBtn = document.getElementById("add-btn");
  const form = document.getElementById("book-form");
  const cancelBtn = document.getElementById("cancel-btn");
  const libraryContainer = document.getElementById("library");

  function Book(name, author, price, isRead = false) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.price = price;
    this.isRead = isRead;
  }

  function addBookToLibrary(name, author, price) {
    const newBook = new Book(name, author, price);
    myLibrary.push(newBook);
    displayBooks();
  }

  function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(b => b.id === id);
    if (index !== -1) myLibrary.splice(index, 1);
    displayBooks();
  }

  function displayBooks() {
    libraryContainer.innerHTML = '';
    myLibrary.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h3>${book.name}</h3>
        <p><strong>ID:</strong> ${book.id}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <div class="btn-group">
          <button class="readbtn">${book.isRead ? 'Read' : 'Not Read'}</button>
          <button class="remove">Remove</button>
        </div>
      `;
      const readBtn = card.querySelector('.readbtn');
      const removeBtn = card.querySelector('.remove');

      readBtn.addEventListener('click', () => {
        book.isRead = !book.isRead;
        readBtn.textContent = book.isRead ? 'Read' : 'Not Read';
        readBtn.style.backgroundColor = book.isRead ? '#2ecc71' : '#e74c3c';
      });

      removeBtn.addEventListener('click', () => removeBookFromLibrary(book.id));

      libraryContainer.appendChild(card);
    });
  }

  // Open modal
  addBookBtn.addEventListener("click", () => {
    form.reset();
    BookDialog.style.display = "flex";
  });

  // Cancel button closes modal
  cancelBtn.addEventListener("click", () => {
    BookDialog.style.display = "none";
  });

  // Close modal if clicking outside content
  BookDialog.addEventListener("click", (e) => {
    if (e.target === BookDialog) {
      BookDialog.style.display = "none";
    }
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value;
    const author = form.author.value;
    const price = form.price.value;

    addBookToLibrary(name, author, price);

    form.reset();
    BookDialog.style.display = "none";
  });

  // Add sample books
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "Rs.2000");
  addBookToLibrary("1984", "George Orwell", "Rs.3000");
});
