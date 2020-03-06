import React, {Component} from 'react';
import FormComponent from './FormComponent';

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
    const { name, value } = e.target;
    this.setState({[name]: value });
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
    const { title, author, pages, readStatus } = this.state;
    const isEnabled = 
      title.length > 0 && 
      author.length > 0 && 
      parseInt(pages) > 0 &&
      readStatus !== '';

    return (
      <FormComponent
        isEnabled={isEnabled}
        data={this.state}
        book={this.props.book}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCancel={this.handleCancel}
        handleEdit={this.handleEdit}
      />
    )
  }
}

export default FormContainer;