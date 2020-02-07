import React from 'react';
import Book from './Book.js';

const AllBooks = ({ books, formStatus, deleteBookFromState, showEditForm }) => {
  const allBooks = [];
  books.forEach(book => {
    allBooks.push(
      <Book
        book={book}
        key={book.id}
        formStatus={formStatus}
        deleteBookFromState={deleteBookFromState}
        showEditForm={showEditForm}
      />
    )
  })
  return (
    <div className="container">
      {allBooks}
    </div>
  )
}

export default AllBooks;
