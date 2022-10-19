const library = [{ title: 'Les Misérables', author: 'Victor Hugo', pages: 1462, read: true } ];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(e) {
  e.preventDefault();
  const inputs = ['title', 'author', 'pages']
                 .map(attribute => document.getElementById(attribute).value)
                 .concat(document.getElementById('read').checked);
  const book = new Book(...inputs);
  library.push(book);
  displayBook(book, library.indexOf(book));
  document.querySelector('.new-book-form').reset();
}
document.querySelector('.submit').addEventListener('click', addBook);

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
  book.read = !book.read;
  e.target.textContent = `Mark as ${book.read ? 'Unread' : 'Read'}`;
  readText.classList.toggle('marked-as-read');
  readText.textContent = `You have ${book.read ? 'read' : 'not read'} this book.`;
}

function displayBook(book, index) {
  const bookElement = createBookElement(index);
  [createBookDetailsElement(book), createRemoveElement()]
  .forEach(element => bookElement.appendChild(element));
  document.querySelector('.books').prepend(bookElement);
}

function displayBooks() {
  document.querySelector('.books').textContent = '';
  library.forEach((book, i) => displayBook(book, i));
}
displayBooks();

function toggleForm() {
  document.querySelector('.new-book-form').classList.toggle('hidden');
}
document.querySelector('.new-book-button').addEventListener('click', toggleForm);

function createBookElement(index) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');
  bookElement.dataset.index = index;
  return bookElement;
}

function createBookDetailsElement(book) {
  const bookDetailsElement = document.createElement('div');
  [createTitleElement(book.title), createAuthorElement(book.author),
   createPagesElement(book.pages), createReadElement(book.read)]
  .forEach(element => bookDetailsElement.appendChild(element));
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
  readText.textContent = `You have ${readBoolean ? 'read' : 'not read'} this book.`;
  toggleReadButton.textContent = `Mark as ${readBoolean ? 'Unread' : 'Read'}`;
  toggleReadButton.addEventListener('click', toggleBookRead);
  [readText, toggleReadButton].forEach(element => readElement.appendChild(element));
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
