import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => (
    <div className="item item-carousel">
        <div className="books">
            <div className="book">
                <div className="book-cover">
                    <div className="book-inner">
                        <Link to={`/book/${book._doc}`}>
                            <img src={book.imageUrl} alt={book.title} />
                        </Link>
                        <div className="fade"></div>
                    </div>
                </div>
                <div className="book-details">
                    <h3 className="book-title">
                        <Link to={`/book/${book._doc}`}>
                            {book.title}
                        </Link>
                    </h3>
                    <p className="book-author">{book.authorTitle}</p>
                </div>
            </div>
        </div>
    </div>
)

export default Book