import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import Book from '../components/Book';
import axios from 'axios';

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
  DEV_URL = 'http://localhost:3000';
}

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      tags: []
    };
  }

  fetchTags() {
    axios.get(`${DEV_URL}/api/tags`).then((res) => {
      this.setState({
        tags: res.data
      });
    });
  }

  searchByText(searchText) {
    axios.get(`${DEV_URL}/api/search`, {
      params: {
        text: searchText
      }
    }).then((res) => {
      this.setState({
        books: res.data
      })
    });
  }

  searchByTag(searchTag) {
    axios.get(`${DEV_URL}/api/books`, {
      params: {
        tag: searchTag
      }
    }).then((res) => {
      this.setState({
        books: res.data
      })
    });
  }

  componentDidMount() {
    this.fetchTags();

    const queryString = this.props.location.search;
    if (queryString.indexOf("tag") > 0) {
      this.searchByTag(queryString.split("tag=")[1]);
    }
    else {
      this.searchByText(queryString.split("text=")[1]);
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.location.search !== prevProps.location.search) {
        const queryString = this.props.location.search;
        if (queryString.indexOf("tag") > 0) {
            this.searchByTag(queryString.split("tag=")[1]);
        }
        else {
            this.searchByText(queryString.split("text=")[1]);
        }
    }
  }

  render() {

    if (this.state.books) {
      return (
        <div className="category page">
          <Container>
            <div className="page-header category-page-header">
              <h2 className="page-title">Search</h2>
              <p className="page-subtitle">Find the books you're looking for</p>
            </div>

            <div className="page-body">
              <Row>

                <Col sm='8' className="col-sm-push-4">
                  <div className="category-toolbar">
                    <Row>
                      <Col md='3' sm='4'>
                        <ul id="myTab" className="nav nav-tabs grid-list-view-buttons" role="tablist">
                          <li role="presentation" className="active">
                            <a href="#grid" className="btn navbar-btn" role="tab" data-toggle="tab">
                              <span className="glyphicon glyphicon-th active"></span>
                            </a>
                          </li>
                          <li role="presentation">
                            <a href="#list" className="btn navbar-btn" role="tab" data-toggle="tab">
                              <span className="glyphicon glyphicon-th-list"></span>
                            </a>
                          </li>
                        </ul>
                      </Col>

                      <Col md="2" sm="4">
                        <select className="selectpicker" defaultValue="15">
                          <option value="15">9</option>
                          <option value="10">10</option>
                          <option value="20">11</option>
                          <option value="30">12</option>
                        </select>
                      </Col>

                      <Col md="2" sm="4">
                        <select className="selectpicker" defaultValue="position:asc">
                          <option value="position:asc">Date</option>
                          <option value="price:asc">Price: Lowest first</option>
                          <option value="price:desc">Price: Highest first</option>
                          <option value="name:asc">Product Name: A to Z</option>
                          <option value="name:desc">Product Name: Z to A</option>
                          <option value="quantity:desc">In stock</option>
                          <option value="reference:asc">Reference: Lowest first</option>
                          <option value="reference:desc">Reference: Highest first</option>
                        </select>
                      </Col>

                    </Row>
                  </div>

                  <div className="tab-content">
                    <div className="tab-pane active wow fadeInUp" id="grid" role="tabpanel">
                      <div className="category-books books grid-view">
                        <Row>
                          {
                            this.state.books.map((book) => (
                              <Fragment key={book._doc}>
                                <Col md="4" sm="6" className="padded">
                                  <Book book={book} />
                                </Col>
                              </Fragment>
                            ))
                          }
                        </Row>
                      </div>
                    </div>
                    <div className="tab-pane wow fadeInUp featured-book-holder" id="list" role="tabpanel">

                      {
                        this.state.books.map((book) => (
                          <Fragment key={book._doc}>
                            <div className="featured-book">
                              <div className="books clearfix">
                                <Row>
                                  <Col md="4" sm="5">
                                    <div className="book">
                                      <div className="hot-ribbon"><div className="hot-ribbon-content">hot</div></div>
                                      <div className="book-cover">
                                        <img className="img-responsive" width="193" height="261" src={book.imageUrl} alt={book.title} />
                                        <div className="fade"></div>
                                      </div>
                                    </div>
                                  </Col>

                                  <Col md="8" sm="7">
                                    <div className="book-details book-details-list-view">
                                      <h3 className="book-title">
                                        <Link to={`/book/${book._doc}`}>
                                          {book.title}
                                        </Link>
                                      </h3>
                                      <p className="book-author">{book.authorTitle}</p>
                                    </div>

                                    <div className="featured-book-content">
                                      <p className="hidden-sm hidden-md">{book.description}</p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Fragment>
                        ))
                      }

                    </div>

                  </div>

                  <ul className="pagination book-pagination">
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                  </ul>
                </Col>



                <Col sm="4" className="col-sm-pull-8">
                  <aside className="sidebar">
                    <section className="module">
                      <header className="module-header">
                        <h4 className="module-book-category-title">Book Category</h4>
                      </header>

                      <div className="module-body category-module-body">
                        <ul className="list-unstyled category-list">
                          {
                            this.state.tags.map((tag) => (
                              <li key={tag.tag}>
                                <Link to={`/search?tag=${tag.tag}`}>{tag.title}</Link>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </section>
                  </aside>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      );
    }
    else {
      return null;
    }
  }
}
export default SearchPage;