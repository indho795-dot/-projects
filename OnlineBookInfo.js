// classes

class Book {
  constructor(title, author, year) {
    this._title = title;
    this._author = author;
    this._year = year;
  }
  getDetails() {
    return `${this._title} :  by:  ${this._author}, :published in=   ${this._year}`;
  }
}
class Ebook extends Book {
  constructor(title, author, year, fileSize) {
    super(title, author, year);
    this._fileSize = fileSize;
  }
  getDetails() {
    return ` : ${this._title}  by= ${this._author},  published in=   ${this._year} | File size: ${this._fileSize} MB`;
  }
}

// Dom elements
const form = document.getElementById("bookForm");
const bookType = document.getElementById("bookType");
const fileSizeBox = document.getElementById("fileSizeGroup");
const libraryBooks = document.getElementById("library");

// ====== Show / Hide File Size ======
bookType.addEventListener("change", () => {
  if (bookType.value === "EBook") {
    fileSizeBox.style.display = "block";
  } else {
    fileSizeBox.style.display = "none";
  }
});

// ====== Display Book ======
function displayBook(book){
  const div = document.createElement("li");
  div.textContent = book.getDetails();
  libraryBooks.appendChild(div);
}
// ====== Form Submit ======
form.addEventListener("submit",(e)=>{
  e.preventDefault()

  const title=document.getElementById("title").value.trim()
  const author=document.getElementById("author").value.trim()
  const year=document.getElementById("year").value.trim()
  const fileSize=document.getElementById("fileSize").value.trim()

if(bookType.value === "Book"){
  const book=new Book(title,author,year)
  displayBook(book);
}else if(bookType.value === "EBook"){
  const ebook=new Ebook(title,author,year,fileSize)
  displayBook(ebook)
}
form.reset();
fileSizeBox.style.display="none"

})


