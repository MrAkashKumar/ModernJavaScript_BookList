class Book{
constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
}

class UI{

    addBookToList(book){

        //console.log(book);
        const list = document.getElementById('book-list');

      
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class = "delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className){

         const div = document.createElement('div');


         div.className = `alert ${className}`;

         div.appendChild(document.createTextNode(message));
 

         const container = document.querySelector('.container');

         const form = document.querySelector('#book-form');

         container.insertBefore(div, form);
 

 
         setTimeout(function(){
             document.querySelector('.alert').remove();
         }, 3000);

    }


    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }

    }


    clearFields(){
        document.getElementById('title').value = ' ';
        document.getElementById('author').value = ' ';
        document.getElementById('isbn').value = ' ';

    }

}
            // LocalStorage 

 class Store{
     static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
            let books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
     }

     static displayBooks(){  
        const books = Store.getBooks();

        books.forEach(function(book){

            const ui = new UI();

            ui.addBookToList(book);

        });
     }

     static addBook(book){
        const books = store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));


     }

     static removeBook (isbn) {
         //console.log(isbn);
         const books = store.getBooks();

         books.forEach(function(book, index){

            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
     }
 }


document.addEventListener('DOMContentLoaded', Store.displayBooks );


document.getElementById('book-form').addEventListener('submit', function(e){
    //console.log('test');


    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

            //console.log(title, author, isbn);

    const book = new Book(title, author, isbn);
     

    const ui = new UI();

    //validate
    if(title === '' || author === '' || isbn  === ''){

        ui.showAlert('please fill in all blanks ', 'error');
       // console.log('test');

    }else{

    ui.addBookToList(book);


    ui.showAlert('Book Added ! ', 'success');

    ui.clearFields();
    }

    e.preventDefault();

});



document.getElementById('book-list').addEventListener('click', 
function(e){
    //console.log(123);

    const ui = new UI();


    ui.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling
        .textContent);


    ui.showAlert('Book Removed !' , 'success')

    e.preventDefault();
});