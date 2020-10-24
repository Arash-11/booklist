import React, { useState , useEffect } from 'react';
import MainpageNavBar from '../components/MainpageNavBar';
import InputDetails from '../components/InputDetails';
import BookDetails from '../components/BookDetails';
import { db , auth } from '../Firebase';


function Mainpage() {
    // contains data of all the books in user's list
    const [ books, setBooks ] = useState([]);

    // state of books that need to be displayed at any given time
    const [ booksToDisplay, setBooksToDisplay ] = useState([]);

    let userID;
    auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          userID = user.uid;
        }
    });


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                db.collection("users")
                    .doc(user.uid)
                    .collection("books")
                    .get()
                    .then((book) => {
                        book.forEach(doc => {
                            setBooks(previousBooks => {
                                return [...previousBooks, {'id': doc.id, ...doc.data()}];
                            });
                            setBooksToDisplay(previousBooks => {
                                return [...previousBooks, {'id': doc.id, ...doc.data()}];
                            });
                        });
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
            } 
            else return;
        });
    }, [userID]);


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
            if ( item.title === newBook.title && item.author === newBook.author ) {
                 alert('This book is already in your list, you cannot add it again.');
                 decider = !decider;
            }
        });
        if (decider) addBook(newBook);
        else return;
    }


    function addBook(newBook) {
        db.collection("users")
            .doc(userID)
            .collection("books")
            .add({
                title: newBook.title,
                author: newBook.author,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);

                // also adding document id to make deleting the book easier later
                setBooks(previousBooks => {
                    return [...previousBooks, {'id': docRef.id, ...newBook}];
                });
            
                setBooksToDisplay(previousBooks => {
                    return [...previousBooks, {'id': docRef.id, ...newBook}];
                });
            })
            .catch(function(error) {
                return console.error("Error adding document: ", error);
            });

    }


    function deleteBook(id) {
        db.collection("users")
            .doc(userID)
            .collection("books")
            .doc(id)
            .delete()
            .then(function(docRef) {
                console.log("Document successfully deleted!");
            })
            .catch(function(error) {
                console.error("Error removing document: ", error);
            });

        setTimeout(() => {
            setBooks(bookArray => {
                return bookArray.filter(item => {
                    return item.id !== id;
                });
            });
    
            setBooksToDisplay(bookArray => {
                return bookArray.filter(item => {
                    return item.id !== id;
                });
            });
        }, 800);
    }


    return (
        <>
            <MainpageNavBar filterBooks={showMatches} />
            <InputDetails onAdd={checkBook} />
            <div className="bookCards_container">
                {booksToDisplay.map((book) => {
                    return (
                        <BookDetails
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            readStatus={book.status}
                            deleteBook={deleteBook}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Mainpage;