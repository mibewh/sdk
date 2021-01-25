import React, { Component } from 'react';
import { Row, Col, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class FeaturedBook extends Component {
  constructor(props) {
    super(props);
    if (props.book.author)
    {
      props.book.authorTitle = props.book.author.title;
    }
    else
    {
      props.book.authorTitlte = "None";
    }

    if (!props.book._doc)
    {
      props.book._doc = props.book.id;
    }
  }

  render() {
    return (
      <div className="book">
        <div className="book-cover">
          <div className="book-inner">
          <Link to={`/book/${this.props.book._doc}`}>
            <img className="list-book padded" src={this.props.book.imageUrl} alt={this.props.book.title} />
          </Link>
          </div>
        </div>
        <div className="book-details">
            <h3 className="book-title">
              <Link to={`/book/${this.props.book._doc}`}>
                {this.props.book.title}
              </Link>
            </h3>
            <p className="book-author">{this.props.book.authorTitle}</p>
        </div>
      </div>
    );
  }
}
export default FeaturedBook;