import React from "react";
import { getBooks, getAuthors } from '../lib/cloudcms';
import Head from 'next/head'

import Layout from '../components/Layout';
import Slider from '../components/Slider';
import BooksContainer from '../components/BooksContainer';
import AuthorsContainer from "../components/AuthorsContainer";

const HomePage = ({ books, authors }) => {
    return (
        <Layout title="Quick Start Books">
            <Slider book={books[0]} />
            <BooksContainer
                books={books}
                title="New Books"
                subtitle="Do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
            <AuthorsContainer authors={authors} />
        </Layout>
    );
}

export async function getStaticProps(context)
{
    let books = await getBooks();
    let authors = await getAuthors();

    return {
        props: {
            books,
            authors
        }
    }
}

export default HomePage;
