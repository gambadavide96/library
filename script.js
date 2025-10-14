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

addBookToLibrary('Signore degli Anelli',"Tolkien",500,false);
addBookToLibrary('Harry Potter',"JK Rowling",200,true);
console.log(myLibrary)

// TODO: Funzione che itera l'array myLibrary e stampa i libri nella pagina


