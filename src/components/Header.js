import React from 'react';

const Header = ({ showForm }) => {
  return (
    <header className="header">
      <h1>Book Library</h1>
      <button
        className="new-book"
        onClick={() => showForm()}
      >new book</button>
    </header>
  )
}

export default Header;