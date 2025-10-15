const myLibrary = [];

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

Book.prototype.info = function () {
   return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
}

// Take params, create a book then store it in the array
function addBookToLibrary(title,author,pages,read) {
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
}

function createElement(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (textContent) el.textContent = textContent;
  return el;
}

// To iterate books and display on the page
//TODO: Refactor this function,
// crea delle mini funzioni che creano ogni div e lo resituiscono
function displayBooks(){

  const booksGrid = document.querySelector('.books-grid');

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.id = book.id
    bookCard.classList.add('book')
    
    const bookName = document.createElement('div');
    bookName.classList.add('book-name');
    bookName.textContent = `${book.title}`;

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `${book.author}`;

    const bookPages = document.createElement('div');
    bookPages.classList.add('book-pages');
    bookPages.textContent = `Pages: ${book.pages}`;

    const bookRead = document.createElement('div');
    bookRead.classList.add('book-read');
    book.read ? bookRead.classList.add('read-yes') : bookRead.classList.add('read-no');
    bookRead.textContent = `${ book.read ? 'Read' : 'Not Read'}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn-remove');
    removeButton.textContent = 'Remove';

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




