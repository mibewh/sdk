import React, { Fragment } from "react";
import Slider from './components/Slider';
import BooksContainer from './components/BooksContainer';
import AuthorsContainer from './components/AuthorsContainer';

const HomePage = ({ bookList, authorList }) => (
    <Fragment>
        <Slider book={bookList[0]} />
        <BooksContainer books={bookList} />
        <AuthorsContainer authors={authorList} />
    </Fragment>
)

export default HomePage
