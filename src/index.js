import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <AllBooks books={BOOKS} />
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Book Library</h1>
        <button className="new-book">new book</button>
      </header>
    )
  }
}

class AllBooks extends Component {
  render() {
    const books = [];

    this.props.books.forEach(book => {
      books.push(
        <Book book={book}/>
      )
    })
    return (
      <div className="container">
        {books}
      </div>

    )
  }
}

class Book extends Component {
  render() {
    return(
      <div className="book">
        <BookInfo book={this.props.book}/>
        <BookButtons />
      </div>
    )
  }
}

class BookInfo extends Component {
  render() {
    return (
      <div className="book-info">
        <div class="text-info">
          <div className="row card-title">
            <span className="card-label">Title: </span>
            <span className="title">{this.props.book.title}</span>
          </div>
          <div className="row card-author">
            <span className="card-label">Author: </span>
            <span className="author">{this.props.book.author}</span>
          </div>
          <div className="row card-pages">
            <span className="card-label">Pages: </span>
            <span className="pages">{this.props.book.pages}</span>
          </div>
          <div className="row card-read-status">
            <span className="card-label">Read? </span>
            <span className="hasRead">
              {this.props.book.hasRead ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <img
          className="book-cover"
          src={this.props.book.img}
          alt='book cover'
        />
      </div>
    )
  }
}

class BookButtons extends Component {
  render() {
    return (
      <div className="book-buttons">
        <button>Delete</button>
        <button>Edit</button>
        <button>Read</button>
      </div>
    )
  }
}

const BOOKS = [
  {title: 'H is for Hawk', author: 'Helen Macdonald', pages: 312, hasRead: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442151714l/18803640._SY475_.jpg'},
  {title: 'Imagine Me Gone', author: 'Adam Haslett', pages: 289, hasRead: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1530824813l/40727599._SY475_.jpg'},
  {title: 'Less', author: 'Andrew Sean Greer', pages: 248, hasRead: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1524491811l/39927096._SY475_.jpg'},
  {title: 'The Testaments', author: 'Margaret Atwood', pages: 304, hasRead: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1549292344l/42975172.jpg'},
  {title: 'The Institute', author: 'Stephen King', pages: 277, hasRead: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1549241208l/43798285.jpg'},
  { title: 'Recursion', author: 'Blake Crouch', pages: 410, hasRead: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543687940l/42046112.jpg'},
];

ReactDOM.render(
  <App />,
  document.getElementById('root')
)