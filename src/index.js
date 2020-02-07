import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      showForm: false,
      editBook: false,
      id: this.props.books[this.props.books.length - 1].id,
      currentBook: null,
    }
    this.showForm = this.showForm.bind(this);
    this.getBook = this.getBook.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.createBook = this.createBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBookFromState = this.deleteBookFromState.bind(this);
  }
  
  showForm = () => {
    this.setState({showForm: true});
  }

  getBook = (id) => { 
    const book = this.state.books.find(book => book.id === id) || false;
    return book;
  };

  hideForm = () => {
    this.setState({showForm: false, editBook: false});
  }

  showEditForm = (idToShow) => {
    this.setState({ showForm: true, 
                    currentBook: this.getBook(idToShow),
                    editBook: true });
  }

  // Create book
  createBook = (formData) => {
    this.setState(prevState => {
      return {
        books: [...prevState.books,
          {
            id: prevState.id + 1,
            title: formData.title,
            author: formData.author,
            pages: parseInt(formData.pages),
            readStatus: formData.readStatus === 'true' ? true : false,
            img: formData.img
          }],
        id: prevState.id + 1 
      }
    })
  }

  // Update book
  updateBook = (formData) => {
    this.setState(prevState => {
      const books = [...prevState.books];
      const book = books.find(book => book.id === prevState.currentBook.id);
      const index = books.indexOf(book);
      books[index] = 
        {
          id: book.id,
          title: formData.title,
          author: formData.author,
          pages: parseInt(formData.pages),
          readStatus: formData.readStatus === 'true' ? true : false,
          img: formData.img
        }
      return {
        books: books
      }
    })
  }
  
  // Delete book
  deleteBookFromState = (idToDelete) => {
    this.setState(prevState => {
      return {
        books: prevState.books.filter(book => book.id !== idToDelete)
      }
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Header showForm={this.showForm} />
        <AllBooks 
          books={this.state.books} 
          formStatus={this.state.showForm}
          deleteBookFromState={this.deleteBookFromState}
          showEditForm={this.showEditForm}
        />
        {this.state.showForm &&
          <FormContainer
            sendData={this.createBook}
            hideForm={this.hideForm} 
          />
        }
        {this.state.editBook &&
          <FormContainer
            book={this.state.currentBook}
            sendData={this.updateBook}
            hideForm={this.hideForm}
          />
        }
      </div>
    )
  }
}

const Header = ({ showForm }) => {
  return (
    <header className="header">
      <h1>Book Library</h1>
      <button
        className="new-book"
        onClick={() => showForm() }
      >new book</button>
    </header>
  )
}

class AllBooks extends Component {
  render() {
    const allBooks = [];
    this.props.books.forEach(book => {
      allBooks.push(
        <Book 
          book={book}
          key={book.id}
          formStatus={this.props.formStatus}
          deleteBookFromState={this.props.deleteBookFromState}
          // getBook={this.props.getBook}
          showEditForm={this.props.showEditForm}
        />
      )
    })
    return (
      <div className="container">
        {allBooks}
      </div>
    )
  }
}

class Book extends Component {
  render() {
    return(
      <div className={this.props.formStatus ? "book disabled" : "book"}>
        <BookInfo book={this.props.book}/>
        <BookButtons 
          deleteBookFromState={this.props.deleteBookFromState} 
          getBook={this.props.getBook}
          book={this.props.book}
          showEditForm={this.props.showEditForm}
        />
      </div>
    )
  }
}

class BookInfo extends Component {
  render() {
    return (
      <div className="book-info">
        <div className="text-info">
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
              {this.props.book.readStatus ? 'Yes' : 'No'}
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
  constructor() {
    super();
    this.deleteBook = this.deleteBook.bind(this);
    this.findBook = this.findBook.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }
  
  deleteBook() {
    this.props.deleteBookFromState(this.props.book.id)
  }

  findBook() {
    this.props.getBook(this.props.book.id);
  }

  showEditForm() {
    this.props.showEditForm(this.props.book.id);
  }

  render() {
    return (
      <div className="book-buttons">
        <button 
          onClick={this.showEditForm}
          className="edit-button"
        >Edit</button>
        <button 
          onClick={this.deleteBook}
          className="delete-button"  
        >Delete</button>
      </div>
    )
  }
}

class FormContainer extends Component {
  constructor(props) {
    super(props);
    const book = this.props.book;
    this.state = {
      title: book ? book.title : '',
      author: book ? book.author : '',
      pages: book ? book.pages : '',
      readStatus: book ? book.readStatus : '',
      img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442151714l/18803640._SY475_.jpg',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendToParent = this.sendToParent.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendToParent();
    this.props.hideForm();
    this.setState({
        title: '',
        author: '',
        pages: '',
        readStatus: '',
        img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442151714l/18803640._SY475_.jpg',
    })
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.hideForm();
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.sendToParent();
    this.props.hideForm();
  }

  sendToParent = () => {
    this.props.sendData(this.state);
  }

  render() {
    return (
      <div className="form-container">
        <form className="book-form" name="bookForm">
          <h2>Book Information</h2>
          <label htmlFor="title">Title</label>
          <input
            placeholder="Title"
            type="text"
            name="title"
            id="title"
            maxLength="100"
            required
            value={this.state.title}
            onChange={this.handleChange}
          />
  
          <label htmlFor="author">Author</label>
          <input
            placeholder="Author"
            type="text"
            name="author"
            id="author"
            maxLength="100"
            required
            value={this.state.author}
            onChange={this.handleChange}
          />
  
          <label htmlFor="pages">Pages</label>
          <input
            placeholder="Pages"
            type="number"
            name="pages"
            id="pages"
            min="1"
            required
            value={this.state.pages}
            onChange={this.handleChange}
          />
  
          <div className="read-status">
            <label htmlFor="hasRead">Have read</label>
            <input
              type="radio"
              name="readStatus"
              value="true"
              id="hasRead"
              onChange={this.handleChange}
              checked={this.state.readStatus === 'true'}
            />
            <label htmlFor="notRead">Have not read</label>
            <input
              type="radio"
              name="readStatus"
              value="false"
              id="notRead"
              onChange={this.handleChange}
              checked={this.state.readStatus === 'false'}
            />
          </div>
  
          <div className="form-buttons">
            {this.props.book &&
              <button
                className="button edit-book"
                onClick={this.handleEdit}
              >Save</button>
            }
            {!this.props.book &&
              <button
                className="button submitBook"
                onClick={this.handleSubmit}
              >
                Add Book</button>
            }

            <button 
              className="button cancel"
              onClick={this.handleCancel}
            >Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

const BOOKS = [
  {id: 1, title: 'H is for Hawk', author: 'Helen Macdonald', pages: 312, readStatus: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442151714l/18803640._SY475_.jpg'},
  {id: 2, title: 'Imagine Me Gone', author: 'Adam Haslett', pages: 289, readStatus: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1530824813l/40727599._SY475_.jpg'},
  {id: 3, title: 'Less', author: 'Andrew Sean Greer', pages: 248, readStatus: true, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1524491811l/39927096._SY475_.jpg'},
  {id: 4, title: 'The Testaments', author: 'Margaret Atwood', pages: 304, readStatus: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1549292344l/42975172.jpg'},
  {id: 5, title: 'The Institute', author: 'Stephen King', pages: 277, readStatus: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1549241208l/43798285.jpg'},
  {id: 6, title: 'Recursion', author: 'Blake Crouch', pages: 410, readStatus: false, img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543687940l/42046112.jpg'},
];
console.log(Array.isArray(BOOKS));
ReactDOM.render(
  <App books={BOOKS} />,
  document.getElementById('root')
)