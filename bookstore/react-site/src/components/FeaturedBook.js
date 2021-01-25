import React, { Component } from 'react';
import { Row, Col, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class FeaturedBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FeaturedBook">
        <Container>
          <Row>
            <Col>
              <Carousel>
                {
                  this.props.books.map((book) => (
                    <Carousel.Item key={book._doc}>
                      <div className="book-cover d-block w-100 text-center">
                        <img className="img-responsive faded" alt={book.title} src={book.imageUrl} width='100%' height='400' />
                      </div>
                      <Carousel.Caption>
                        <Link to={`/book/${book._doc}`}>
                          <h1>{book.title}</h1>
                        </Link>
                        <p className="featured-description">{book.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default FeaturedBook;