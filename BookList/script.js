//Book class:represent a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI class:Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookList(book));
    console.log(books);
  }
  static addBookList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class ='btn btn-danger btn-sm delete'>X</a> </td>
    
    `;
    list.appendChild(row);
  }
  static deleteBooks(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  //<dic className = `alert alert-success or alert>message</div>
  static showAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//store class:Handle Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//Events:Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
//event Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validation books
  if (title === "" || author === "" || isbn === "") {
    UI.showAlerts("Please fill the field", "danger");
  } else {
    //instantiate book
    const book = new Book(title, author, isbn);

    //sucess
    UI.showAlerts("Book was added", "success");
    //Add book to UI
    UI.addBookList(book);
    //Add book to stor
    Store.addBooks(book);
    //CLear field
    UI.clearField();
  }
});
//Event: Remove books
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBooks(e.target);
  UI.showAlerts("Book Removed", "danger");
  //clear book in store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // console.log(e.target);
});
