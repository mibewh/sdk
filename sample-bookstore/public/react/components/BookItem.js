import React from "react";

const BookItem = (props) => (
    <div className="item item-carousel">
    <div className="books">
        <div className="book">
            <div className="book-cover">
                <div className="book-inner">
                    <a href={`book.html?id=${props.bookItem._doc}`}>
                        <img src={props.bookItem.imageUrl} alt={props.bookItem.title} />
                    </a>
                    <div className="fade"></div>
                </div>
            </div>
            <div className="book-details">
                <h3 className="book-title">
                    <a href={`book.html?id=${props.bookItem._doc}`}>
                        {props.bookItem.title}
                    </a>
                </h3>
                <p className="book-author">{props.bookItem.authorTitle}</p>
            </div>
        </div>
    </div>
</div>
)

export default BookItem