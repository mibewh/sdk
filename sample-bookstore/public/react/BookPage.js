import React, { Fragment } from "react";

const BookPage = ({ book }) => (
    <Fragment>
        <div className="book-detail page">
            <h1>Book page</h1>
            {book.title}
        </div>
    </Fragment>
)

export default BookPage
