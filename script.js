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

// TODO: Funzione che itera l'array myLibrary e stampa i libri nella pagina
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
    bookRead.textContent = `${ book.read ? 'Read' : 'Not Read'}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn-remove');
    removeButton.textContent = 'Remove';

    bookCard.appendChild(bookName);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(removeButton);

    booksGrid.appendChild(bookCard);
  })
}

document.addEventListener("DOMContentLoaded",() => {
  addBookToLibrary("L'Odissea","Omero",1000,false);
  addBookToLibrary('Harry Potter',"JK Rowling",200,true);
  addBookToLibrary('Il Signore degli Anelli',"J.R.R Tolkien",600,false);
  displayBooks();
})




