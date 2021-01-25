import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Book from './Book'

class BooksContainer extends React.Component {

  constructor(props) {
    super(props);

    props.books.forEach((book) => {
      if (!book._doc)
      {
        book._doc = book.id;
      }
    });
  }

  render() {
    const firstFourBooks = this.props.books.slice(0, 4);

    return (
      <Container>
        <div className="module block-new-books module-block">
          <div className="module-heading">
            <h2 className="module-title">{this.props.title}</h2>
            <p className="module-subtitle">{this.props.subtitle}</p>
          </div>
          <div className="module-body">
            <div className="books">
              <Row>
                {
                  firstFourBooks.map((book) => (
                    <Col sm="3" key={book._doc}>
                      <Book book={book} />
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default BooksContainer
