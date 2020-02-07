import React, {Component} from 'react';

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

export default BookButtons;