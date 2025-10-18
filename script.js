let myLibrary = [];

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

Book.prototype.info = function() {
   return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title,author,pages,read) {
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter(book => book.id != id);
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
  book = myLibrary.find(book => book.id === id);
  book.toggleRead();
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

// To iterate books and display on the page
function displayBooks(){
  booksGrid.replaceChildren(); //Necessario per ricaricare la libreria da capo ogni volta

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


document.addEventListener("DOMContentLoaded",() => {
  addBookToLibrary("The Odyssey","Omero",1000,false);
  addBookToLibrary('Harry Potter',"JK Rowling",200,true);
  addBookToLibrary('The Lord of The Rings',"J.R.R Tolkien",600,false);
  addBookToLibrary('War and Peace',"Lev Tolstoj",750,false);
  addBookToLibrary('System Error','Edward Snowden',500,true);
  displayBooks();
})


