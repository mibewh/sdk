import React from 'react'
import Author from './Author'
import { Container, Row, Col } from 'react-bootstrap';

class AuthorsContainer extends React.Component {

  render() {
    const firstFourAuthors = this.props.authors.slice(0, 4);

    return (
      <div className="featured-item-block">
        <Container>
            <div className="module block-featured-author module-block">
              <div className="module-heading">
                <h2 className="module-title">Featured Authors</h2>
              </div>
              <div className="module-body" id="featured-author">
                <div className="authors">
                  <Row>
                    {
                      firstFourAuthors.map((author) => (
                        <Col sm="3" key={author._doc}>
                          <Author author={author} />
                        </Col>
                      ))
                    }
                  </Row>
                </div>
              </div>
            </div>
        </Container>
      </div>
    )
  }
}

export default AuthorsContainer
