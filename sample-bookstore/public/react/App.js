import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Layout from './components/Layout';
import Slider from './components/Slider';
import BooksContainer from './components/BooksContainer';
import AuthorsContainer from './components/AuthorsContainer';

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
            <Layout>
                <Slider bookItem={bookList[0]} />
                <BooksContainer books={bookList} />
                <AuthorsContainer authors={authorList} />
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));