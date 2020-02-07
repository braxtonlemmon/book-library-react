import React, { Component } from 'react';
import Header from './components/Header.js';
import AllBooks from './components/AllBooks.js';
import FormContainer from './components/FormContainer.js';

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
    this.setState({ showForm: true });
  }

  getBook = (id) => {
    const book = this.state.books.find(book => book.id === id) || false;
    return book;
  };

  hideForm = () => {
    this.setState({ showForm: false, editBook: false });
  }

  showEditForm = (idToShow) => {
    this.setState({
      showForm: true,
      currentBook: this.getBook(idToShow),
      editBook: true
    });
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
    },
      () => { localStorage.setItem('state', JSON.stringify(this.state)) }
    );
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
    },
      () => { localStorage.setItem('state', JSON.stringify(this.state)) }
    )
  }

  // Delete book
  deleteBookFromState = (idToDelete) => {
    this.setState(prevState => {
      return {
        books: prevState.books.filter(book => book.id !== idToDelete)
      }
    },
      () => { localStorage.setItem('state', JSON.stringify(this.state)) }
    )
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setState({
        books: state.books,
        showForm: state.showForm,
        editBook: state.editBook,
        id: state.id,
        currentBook: state.currentBook,
      })
    }
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

export default App;