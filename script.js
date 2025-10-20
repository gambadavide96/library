
function getLibrary() {
  const data = localStorage.getItem('library');
  if (!data) return [];
  return JSON.parse(data);
}

function setLibrary(library) {
  localStorage.setItem('library', JSON.stringify(library));
}

// Book constructor
function Book(title,author,pages,read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Book.prototype.info = function() {
//    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
// }

// Book.prototype.toggleRead = function() {
//   this.read = !this.read;
// }

function addBookToLibrary(title,author,pages,read) {
  const myLibrary = getLibrary();
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
  setLibrary(myLibrary);
  displayBooks();
}

function removeBookFromLibrary(id) {
  let myLibrary = getLibrary();
  myLibrary = myLibrary.filter(book => book.id != id);
  setLibrary(myLibrary);
  displayBooks();
}

/*Set of Functions to create and manipulate books card */

const createBookCard = (id) => {
  const bookCard = document.createElement('div');
  bookCard.id = id;
  bookCard.classList.add('book');
  return bookCard;
}

const createBookName = (title) => {
  const bookName = document.createElement('div');
  bookName.classList.add('book-name');
  bookName.textContent = title;
  return bookName;
}

const createBookAuthor = (author) => {
  const bookAuthor = document.createElement('div');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = author;
  return bookAuthor;
}

const createBookPages = (pages) => {
  const bookPages = document.createElement('div');
  bookPages.classList.add('book-pages');
  bookPages.textContent = `Pages: ${pages}`;
  return bookPages;
}

const toggleBookRead = (id) => {
  const myLibrary = getLibrary();
  const book = myLibrary.find(book => book.id === id);
  book.read = !book.read;  //Toggle diretto, ho un oggetto JSON non un'istanza di book
  setLibrary(myLibrary);   
  displayBooks(); 
}

const createBookRead = (isRead,bookId) => {
  const bookRead = document.createElement('div');
  bookRead.classList.add('book-read');
  isRead ? bookRead.classList.add('read-yes') : bookRead.classList.add('read-no');
  bookRead.textContent = `${ isRead ? 'Read' : 'Not Read'}`;
  bookRead.addEventListener('click', () => {
    toggleBookRead(bookId);
  });
  return bookRead;
}

const createRemoveButton = (bookId) => {
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn-remove');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click',() => {
    removeBookFromLibrary(bookId);
  })
  return removeButton;
}

const booksGrid = document.querySelector('.books-grid');

/* To iterate books and display on the page */
function displayBooks(){
  booksGrid.replaceChildren(); //Necessario per evitare duplicazioni

  const myLibrary = getLibrary();
  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book.id);
    const bookName = createBookName(book.title);
    const bookAuthor = createBookAuthor(book.author);
    const bookPages = createBookPages(book.pages);
    const bookRead = createBookRead(book.read,book.id);
    const removeButton = createRemoveButton(book.id);

    bookCard.append(bookName,bookAuthor,bookPages,bookRead,removeButton);

    booksGrid.appendChild(bookCard);
  })
}

/* Dialog form */
const addBookButton = document.querySelector(".btn-add-book");
const dialog = document.querySelector("dialog");
const form = document.getElementById('book-form');

const inputName = document.getElementById('book-name-f');
const inputAuthor = document.getElementById('book-author-f');
const inputPages = document.getElementById('book-pages-f');
const inputIsRead = document.getElementById('book-read-f');

addBookButton.addEventListener('click', () => {
  dialog.showModal();
})

dialog.addEventListener('close', () => {
  form.reset();
})

form.addEventListener('submit', (event) => {
  event.preventDefault();  //Blocca l'invio dei dati dalla form
  addBookToLibrary(inputName.value,inputAuthor.value,inputPages.value,inputIsRead.checked);
  dialog.close();
})


document.addEventListener("DOMContentLoaded", () => {
  // if (getLibrary().length === 0) {
  //   addBookToLibrary("The Odyssey", "Omero", 1000, false);
  //   addBookToLibrary("Harry Potter", "JK Rowling", 200, true);
  //   addBookToLibrary("The Lord of The Rings", "J.R.R Tolkien", 600, false);
  //   addBookToLibrary("War and Peace", "Lev Tolstoj", 750, false);
  // }
  displayBooks();
});


