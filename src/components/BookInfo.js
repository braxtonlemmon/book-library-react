import React from 'react';

const BookInfo = ({ book }) => {
  return (
    <div className="book-info">
      <div className="text-info">
        <div className="row card-title">
          <span className="card-label">Title: </span>
          <span className="title">{book.title}</span>
        </div>
        <div className="row card-author">
          <span className="card-label">Author: </span>
          <span className="author">{book.author}</span>
        </div>
        <div className="row card-pages">
          <span className="card-label">Pages: </span>
          <span className="pages">{book.pages}</span>
        </div>
        <div className="row card-read-status">
          <span className="card-label">Read? </span>
          <span className="hasRead">
            {book.readStatus ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
      <img
        className="book-cover"
        src={book.img}
        alt='book cover'
      />
    </div>
  )
}

export default BookInfo;