import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import BOOKS from './BOOKS.js';

ReactDOM.render(
  <App books={BOOKS} />,
  document.getElementById('root')
)