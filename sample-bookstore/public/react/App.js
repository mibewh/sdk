import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import HomePage from "./HomePage";
import BookPage from "./BookPage";

class App extends React.Component {

  constuctor() {
    this.state = {
      books: null,
      authors: null,
      error: null
    };
  }

  fetchBooks() {
    return axios.get("/api/books");
  }

  fetchAuthors() {
    return axios.get("/api/authors");
  }

  componentDidMount() {
    axios.all([this.fetchBooks(), this.fetchAuthors()])
      .then(axios.spread((bs, as) => {
        this.setState({
          authors: as.data,
          books: bs.data
        });
      }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const books = this.state && this.state.books;
    if (!books) {
      return "Error: No book data found"
    }
    const bookList = Object.values(books);

    const authors = this.state && this.state.authors;
    if (!authors) {
      return "Error: No author data found"
    }
    const authorList = Object.values(authors);

    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <HomePage bookList={bookList} authorList={authorList} />} />
            <Route exact path={`/book/:id`} render={props => <BookPage book={books[props.match.params.id]}/>} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));