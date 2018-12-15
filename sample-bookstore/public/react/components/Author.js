import React from "react";
import { Link } from "react-router-dom";

const Author = ({ author }) => (
    <div className="item item-author-block author">
        <a href="detail.html">
            <div className="author-dp">
                <img src={author.imageUrl} alt={author.title} />
            </div>
        </a>
        <div className="author-details">
            <h3 className="author-name">
                <Link to={`author/${author._doc}`}>
                    {author.title}
                </Link>
            </h3>
            <a href="search.html" className="btn btn-primary btn-view-books">View Books</a>
        </div>
    </div>
)

export default Author