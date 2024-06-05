document.addEventListener("DOMContentLoaded", function () {
  const inputForm = document.getElementById("inputBook");
  const searchForm = document.getElementById("searchBook");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  const UNFINISHED_BOOK_SHELF = "Belum selesai dibaca";
  const FINISHED_BOOK_SHELF = "Selesai dibaca";

  inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  loadBooks();

  function addBook() {
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById(
      "inputBookIsComplete"
    ).checked;

    const book = makeBook(
      generateUniqueId(),
      inputBookTitle,
      inputBookAuthor,
      parseInt(inputBookYear),
      inputBookIsComplete
    );

    const bookShelf = inputBookIsComplete
      ? completeBookshelfList
      : incompleteBookshelfList;

    bookShelf.appendChild(book);

    updateDataToStorage();
    clearInputFields();
  }

  function generateUniqueId() {
    return +new Date();
  }

  function updateDataToStorage() {
    const incompleteBooks = getBooksFromList(incompleteBookshelfList);
    const completeBooks = getBooksFromList(completeBookshelfList);

    saveBooksToStorage("incompleteBooks", incompleteBooks);
    saveBooksToStorage("completeBooks", completeBooks);
  }

  function loadBooks() {
    loadBooksFromStorage("incompleteBooks", incompleteBookshelfList);
    loadBooksFromStorage("completeBooks", completeBookshelfList);
  }

  function makeBook(id, title, author, year, isComplete) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    bookItem.setAttribute("data-id", id);

    const bookTitle = createBookElement("h3", title);
    const bookAuthor = createBookElement("p", "Penulis: " + author);
    const bookYear = createBookElement("p", "Tahun: " + year);

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action");

    const readButton = createActionButton(
      "green",
      isComplete ? FINISHED_BOOK_SHELF : UNFINISHED_BOOK_SHELF,
      toggleReadStatus
    );
    const deleteButton = createActionButton("red", "Hapus buku", deleteBook);

    actionButtons.appendChild(readButton);
    actionButtons.appendChild(deleteButton);

    appendChildren(bookItem, [bookTitle, bookAuthor, bookYear, actionButtons]);

    return bookItem;
  }

  function toggleReadStatus(event) {
    const bookItem = event.target.parentElement.parentElement;
    const isComplete = bookItem.parentElement === completeBookshelfList;

    const newShelfList = isComplete
      ? incompleteBookshelfList
      : completeBookshelfList;

    const readButton = bookItem.querySelector(".action button.green");
    readButton.innerText = isComplete
      ? FINISHED_BOOK_SHELF
      : UNFINISHED_BOOK_SHELF;
    readButton.removeEventListener("click", toggleReadStatus);
    readButton.addEventListener("click", toggleReadStatus);

    newShelfList.appendChild(bookItem);
    updateDataToStorage();
    updateBookStatusInStorage(bookItem, !isComplete);
  }

  function deleteBook(event) {
    const bookItem = event.target.parentElement.parentElement;
    const shelfList = bookItem.parentElement;
    shelfList.removeChild(bookItem);
    updateDataToStorage();
  }

  function searchBook() {
    const searchBookTitle = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const allBooks = document.querySelectorAll(".book_item");

    allBooks.forEach(function (bookItem) {
      const title = bookItem.querySelector("h3").innerText.toLowerCase();
      bookItem.style.display = title.includes(searchBookTitle)
        ? "block"
        : "none";
    });
  }

  function clearInputFields() {
    setInputValue("inputBookTitle", "");
    setInputValue("inputBookAuthor", "");
    setInputValue("inputBookYear", "");
    setInputChecked("inputBookIsComplete", false);
  }

  function createBookElement(elementType, textContent) {
    const element = document.createElement(elementType);
    element.innerText = textContent;
    return element;
  }

  function createActionButton(className, textContent, clickHandler) {
    const button = createBookElement("button", textContent);
    button.classList.add(className);
    button.addEventListener("click", clickHandler);
    return button;
  }

  function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child));
  }

  function setInputValue(elementId, value) {
    document.getElementById(elementId).value = value;
  }

  function setInputChecked(elementId, checked) {
    document.getElementById(elementId).checked = checked;
  }

  function getBooksFromList(bookshelfList) {
    const books = [];
    const bookItems = bookshelfList.querySelectorAll(".book_item");

    bookItems.forEach((bookItem) => {
      const id = bookItem.getAttribute("data-id");
      const title = bookItem.querySelector("h3").innerText;
      const author = bookItem
        .querySelector("p:nth-child(2)")
        .innerText.replace("Penulis: ", "");
      const year = parseInt(
        bookItem
          .querySelector("p:nth-child(3)")
          .innerText.replace("Tahun: ", "")
      );
      const isComplete =
        bookItem.querySelector(".action button.green").innerText ===
        FINISHED_BOOK_SHELF;

      books.push({ id, title, author, year, isComplete });
    });

    return books;
  }

  function saveBooksToStorage(storageKey, books) {
    localStorage.setItem(storageKey, JSON.stringify(books));
  }

  function loadBooksFromStorage(storageKey, bookshelfList) {
    const storedBooks = localStorage.getItem(storageKey);

    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      books.forEach((book) => {
        const newBook = makeBook(
          book.id,
          book.title,
          book.author,
          book.year,
          book.isComplete
        );
        bookshelfList.appendChild(newBook);
      });
    }
  }

  function updateBookStatusInStorage(bookItem, isComplete) {
    const id = bookItem.getAttribute("data-id");
    const storedBooksKey = isComplete ? "completeBooks" : "incompleteBooks";
    const storedBooks = JSON.parse(localStorage.getItem(storedBooksKey));

    const updatedBooks = storedBooks.map((book) => {
      if (book.id === id) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });

    localStorage.setItem(storedBooksKey, JSON.stringify(updatedBooks));
  }
});
