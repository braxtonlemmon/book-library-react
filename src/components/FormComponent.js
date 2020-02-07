import React from 'react';

const FormComponent = (props) => {
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
          value={props.data.title}
          onChange={props.handleChange}
        />

        <label htmlFor="author">Author</label>
        <input
          placeholder="Author"
          type="text"
          name="author"
          id="author"
          maxLength="100"
          required
          value={props.data.author}
          onChange={props.handleChange}
        />

        <label htmlFor="pages">Pages</label>
        <input
          placeholder="Pages"
          type="number"
          name="pages"
          id="pages"
          min="1"
          required
          value={props.data.pages}
          onChange={props.handleChange}
        />

        <div className="read-status">
          <label htmlFor="hasRead">Have read</label>
          <input
            type="radio"
            name="readStatus"
            value="true"
            id="hasRead"
            onChange={props.handleChange}
            checked={props.data.readStatus === 'true' || props.data.readStatus === true }
          />
          <label htmlFor="notRead">Have not read</label>
          <input
            type="radio"
            name="readStatus"
            value="false"
            id="notRead"
            onChange={props.handleChange}
            checked={props.data.readStatus === 'false' || props.data.readStatus === false }
          />
        </div>

        <div className="form-buttons">
          {props.book &&
            <button
              className="button edit-book"
              onClick={props.handleEdit}
            disabled={!props.isEnabled}

            >Save</button>
          }
          {!props.book &&
            <button
              className="button submitBook"
              onClick={props.handleSubmit}
              disabled={!props.isEnabled}
            >
              Add Book</button>
          }
          <button
            className="button cancel"
            onClick={props.handleCancel}
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default FormComponent;