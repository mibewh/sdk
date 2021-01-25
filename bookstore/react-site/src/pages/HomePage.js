import React, { Component } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import FeaturedBook from '../components/FeaturedBook';
import BooksContainer from '../components/BooksContainer';
import AuthorsContainer from '../components/AuthorsContainer';

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
  DEV_URL = 'http://localhost:3000';
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    };
  }


  componentDidMount() {

    axios.all([axios.get(`${DEV_URL}/api/books`), axios.get(`${DEV_URL}/api/authors`)])
    .then(axios.spread((booksRes, authorsRes) => {
        this.setState({
            authors: authorsRes.data,
            books: booksRes.data
        });
    }))
    .catch(error => this.setState({ error }));
  }
  render() {
      
    if (this.state.books)
    {
        return (
          <div className="HomePage">
            <FeaturedBook books={this.state.books}/>
            <BooksContainer
                    books={this.state.books}
                    title="New Books"
                    subtitle="Do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
            <AuthorsContainer authors={this.state.authors} />            
          </div>
        );
    }
    else
    {
        return null;
    }
  }
}
export default HomePage;