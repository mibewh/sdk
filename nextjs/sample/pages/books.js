import React from "react";
import Layout from '../components/Layout';
import BooksContainer from '../components/BooksContainer';
import { getBooks } from '../lib/cloudcms';

const BooksPage = ({ books }) => {
    return (
        <Layout title="All Books">
            <BooksContainer
                books={books}
                title="Books"
                subtitle="Choose from our fine selection of books" />
        </Layout>
    );
}

export async function getStaticProps(context)
{
    let books = await getBooks();

    return {
        props: {
            books,
        }
    }
}

export default BooksPage;
