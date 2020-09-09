import React, { useState } from 'react';
import NavBar from './NavBar';
import InputDetails from './InputDetails';
import BookDetails from './BookDetails';


function App() {
    const [ books, setBooks ] = useState([]); // contains data of all the books in user's list

    // state of books that need to be displayed at any given time
    const [ booksToDisplay, setBooksToDisplay ] = useState([]);

    function showMatches(searchWord) {
        setBooksToDisplay(() => {
            return books.filter(item => {
                return item.title.match(searchWord) || item.author.match(searchWord);
            })
        })
    }

    // make sure user doesn't add same book more than once
    function checkBook(newBook) {
        let decider = true;

        books.forEach(item => {
            if ( item.title === newBook.title && item.author && newBook.author ) {
                 alert('This book is already in your list, you cannot add it again.');
                 decider = !decider;
            }
        });
        
        if (decider) addBook(newBook);
        else return;
    }

    function addBook(newBook) {
        setBooks(previousBooks => {
            return [ ...previousBooks, newBook ];
        });
    
        setBooksToDisplay(previousBooks => {
            return [ ...previousBooks, newBook ];
        });
    }

    function deleteBook(title, author) {
        setBooks(bookArray => {
            return bookArray.filter(item => {
                return item.title !== title && item.author !== author;
            });
        });

        setBooksToDisplay(bookArray => {
            return bookArray.filter(item => {
                return item.title !== title && item.author !== author;
            });
        });
    }

    return (
        <>
            <NavBar filterBooks={showMatches} />
            <InputDetails onAdd={checkBook} />
            <div className="bookCards_container">
                {booksToDisplay.map((book, index) => {
                    return (
                        <BookDetails
                            key={index}
                            title={book.title}
                            author={book.author}
                            deleteBook={deleteBook}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default App;