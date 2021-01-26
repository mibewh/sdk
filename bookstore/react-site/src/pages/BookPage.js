import Axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string';
import BooksContainer from '../components/BooksContainer';


let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
  DEV_URL = 'http://localhost:3000';
}

class BookPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: null,
      tab: "more"
    };
  }

  loadBook(props) {
    // Call self-hosted API to get response
    let { id } = props.match.params;
    let params = queryString.parse(props.location.search); 

    axios.get(`${DEV_URL}/api/books/${id}`, { params, withCredentials: true }).then((res) => {
      this.setState({
        book: res.data
      });
    });
  }
  
  componentDidMount() {
    this.loadBook(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id)
    {
      this.loadBook(this.props);
    }
  }
  

  render() {
    if (this.state.book)
    {
      return (
        <div className="BookPage">
          <Container>
            <Row>
              <Col xs='4'>
                <div className="book-cover book detail-book-cover">
                  <img src={this.state.book.imageUrl} className="img-responsive" alt={this.state.book.title} />
  
                  <div className="fade"></div>
                </div>
              </Col>
              <Col xs='8'>
                <div className="book-detail-header">
                  <h2 className="book-title">{this.state.book.title}</h2>
                  <p className="book-author">By <span className="book-author-name">{this.state.book.author.title}</span></p>
                </div>
                <div className="book-detail-body">
  
                  <Row className="detail-cart-button clearfix">
                    <Col className="pull-left" md='6' sm='5' xs='12'>
  
                    </Col>
  
                    <Col className="pull-right" md='6' sm='7' xs='12'>
                      <Row className="product-actions">
  
                      </Row>
                    </Col>
                  </Row>
  
                  <div className="clearfix"></div>
  
                  <div className="product-description">
                    <h3>Quick Overview</h3>
                    <p>{this.state.book.description}</p>
                    {/* <BookTags book={book} /> */}
                  </div>
  
                </div>
              </Col>
  
            </Row>
            <div className="tab-holder clearfix">
              <div className="book-additional-details">
                {/* Bootstrap Nav here? */}
                <Tabs
                  id="controlled-tabs"
                  transition={false}
                  activeKey={this.state.tab}
                  onSelect={(k) => this.setState({"tab": k})}
                >
                  <Tab eventKey="more" title="More About This Book">
                    <div id="more" dangerouslySetInnerHTML={{
                      __html: this.state.book.summary
                    }}></div>
                  </Tab>
                  <Tab eventKey="download" title="Download">
                    <div>
                      <h3>Download</h3>
                      <p>Download this book - <a href={this.state.book.pdfUrl} target="_blank">PDF</a></p>
                    </div>
                  </Tab>
                </Tabs>
  

              </div>
            </div>
            <hr />
            <BooksContainer
                      books={this.state.book.recommendations}
                      title="Recommendations"
                      subtitle="If you enjoy this book, we also recommend..." />
          </Container>
        </div>
      );
    }
    else
    {
      return (<div className="BookPage">Book not found</div>);
    }
  }
}
export default BookPage;