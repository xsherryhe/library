function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const library = [new Book('Les Misérables', 'Victor Hugo', 1462, true)];

const newBookButton = document.querySelector('.new-book-button');
const newBookForm = document.querySelector('.new-book-form');
const inputs = ['title', 'author', 'pages', 'read'].map((attribute) =>
  document.getElementById(attribute)
);
const newBookFormSubmit = document.querySelector('.submit');
const booksContainer = document.querySelector('.books');

function addBook(e) {
  if (!validate()) return;
  e.preventDefault();

  const attributes = inputs
      .slice(0, 3)
      .map((input) => input.value)
      .concat(inputs[3].checked),
    book = new Book(...attributes);
  library.push(book);
  displayBook(book, library.indexOf(book));
  form.reset();
}
newBookFormSubmit.addEventListener('click', addBook);

function removeBook(e) {
  const index = e.target.parentNode.dataset.index;
  library.splice(index, 1);
  displayBooks();
}

function toggleBookRead(e) {
  const readElement = e.target.parentNode,
    readText = readElement.querySelector('.read-text'),
    index = readElement.parentNode.parentNode.dataset.index,
    book = library[index];
  book.toggleRead();
  e.target.textContent = `Mark as ${book.read ? 'Unread' : 'Read'}`;
  readText.classList.toggle('marked-as-read');
  readText.textContent = `You have ${
    book.read ? 'read' : 'not read'
  } this book.`;
}

function displayBook(book, index) {
  const bookElement = createBookElement(index);
  [createBookDetailsElement(book), createRemoveElement()].forEach((element) =>
    bookElement.appendChild(element)
  );
  booksContainer.prepend(bookElement);
}

function displayBooks() {
  booksContainer.textContent = '';
  library.forEach((book, i) => displayBook(book, i));
}
displayBooks();

function toggleForm() {
  newBookForm.classList.toggle('hidden');
}
newBookButton.addEventListener('click', toggleForm);

function validate() {
  document.querySelectorAll('.error').forEach((error) => error.remove());

  for (const input of inputs) {
    input.classList.remove('submit-invalid');
    if (input.checkValidity()) continue;

    input.classList.add('submit-invalid');
    const error = document.createElement('div');
    error.classList.add('error');
    input.insertAdjacentElement('afterend', error);

    if (input.validity.valueMissing)
      error.textContent = `${capitalize(input.name)} cannot be blank`;

    if (input.validity.rangeUnderflow)
      error.textContent += `${capitalize(input.name)} cannot be less than ${
        input.minLength
      }`;
  }
  return form.checkValidity();
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function createBookElement(index) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');
  bookElement.dataset.index = index;
  return bookElement;
}

function createBookDetailsElement(book) {
  const bookDetailsElement = document.createElement('div');
  [
    createTitleElement(book.title),
    createAuthorElement(book.author),
    createPagesElement(book.pages),
    createReadElement(book.read),
  ].forEach((element) => bookDetailsElement.appendChild(element));
  return bookDetailsElement;
}

function createTitleElement(titleContent) {
  const titleElement = document.createElement('h2');
  titleElement.classList.add('title');
  titleElement.textContent = titleContent;
  return titleElement;
}

function createAuthorElement(authorContent) {
  const authorElement = document.createElement('h3');
  authorElement.classList.add('author');
  authorElement.textContent = authorContent;
  return authorElement;
}

function createPagesElement(pagesContent) {
  const pagesElement = document.createElement('p');
  pagesElement.classList.add('pages');
  pagesElement.textContent = `Pages: ${pagesContent}`;
  return pagesElement;
}

function createReadElement(readBoolean) {
  const readElement = document.createElement('div'),
    readText = document.createElement('p'),
    toggleReadButton = document.createElement('button');
  readElement.classList.add('read');
  readText.classList.add('read-text', readBoolean ? 'marked-as-read' : null);
  readText.textContent = `You have ${
    readBoolean ? 'read' : 'not read'
  } this book.`;
  toggleReadButton.textContent = `Mark as ${readBoolean ? 'Unread' : 'Read'}`;
  toggleReadButton.addEventListener('click', toggleBookRead);
  [readText, toggleReadButton].forEach((element) =>
    readElement.appendChild(element)
  );
  return readElement;
}

function createToggleReadElement(readBoolean) {
  const toggleReadElement = document.createElement('button');
  toggleReadElement.textContent = `Mark as ${readBoolean ? 'Unread' : 'Read'}`;
  toggleReadElement.addEventListener('click', toggleBookRead);
  return toggleReadElement;
}

function createRemoveElement() {
  const removeElement = document.createElement('button');
  removeElement.textContent = 'Remove';
  removeElement.addEventListener('click', removeBook);
  return removeElement;
}
