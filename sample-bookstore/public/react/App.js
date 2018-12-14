import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Layout from './components/Layout'
import BookItem from './components/BookItem'

class App extends React.Component {

    constuctor() {
        this.state = {
            books: null,
            error: null
        };
    }

    componentDidMount() {
        axios
            .get("/api/books")
            .then(res => {
                console.log("hello");
                console.log(res.data);
                this.setState({ books: res.data })
            })
            .catch(error => this.setState({ error }))
    }

    getBookList(data) {
        const bookList = Object.values(data);
        return bookList
    }

    render() {
        const books = this.state && this.state.books;
        if (books === null) {
            return "error"
        }

        return (
            <Layout>
                <h1>CCMS</h1>
                <ul>
                    {this.getBookList(books).map((book) => (
                        <li key={book._doc}>
                            <BookItem bookItem={book} />
                        </li>
                    ))}
                </ul>
            </Layout>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));