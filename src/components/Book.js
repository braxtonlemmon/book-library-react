import React from 'react';
import BookInfo from './BookInfo.js';
import BookButtons from './BookButtons.js';

const Book = ({ formStatus, deleteBookFromState, book, showEditForm }) => {
  return (
    <div className={formStatus ? "book disabled" : "book"}>
      <BookInfo book={book} />
      <BookButtons
        deleteBookFromState={deleteBookFromState}
        book={book}
        showEditForm={showEditForm}
      />
    </div>
  )
}

export default Book;