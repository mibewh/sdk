import React from "react";

const AuthorItem = (props) => (
    <div className="item item-author-block author">
        <a href="detail.html">
            <div className="author-dp">
                <img src={props.authorItem.imageUrl} alt={props.authorItem.title} />
            </div>
        </a>
        <div className="author-details">
            <h3 className="author-name"><a href="search.html">{props.authorItem.title}</a></h3>
            <a href="search.html" className="btn btn-primary btn-view-books">View Books</a>
        </div>
    </div>
)

export default AuthorItem