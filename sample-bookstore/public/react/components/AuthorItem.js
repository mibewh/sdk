import React from "react";

const AuthorItem = (props) => (
    <div class="item item-author-block author">
        <a href="detail.html">
            <div class="author-dp">
                <img src={props.author.imageURL} alt={props.author.title} />
            </div>
        </a>
        <div class="author-details">
            <h3 class="author-name"><a href="search.html">{props.author.title}</a></h3>
            <blockquote class="author-testimonial">{props.author.testimonial}</blockquote>
            <a href="search.html" class="btn btn-primary btn-view-books">View Books</a>
        </div>
    </div>
)

export default AuthorItem