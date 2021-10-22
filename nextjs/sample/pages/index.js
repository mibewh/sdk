import React from "react";

import Layout from '../components/Layout';
import Slider from '../components/Slider';
import BooksContainer from '../components/BooksContainer';
import AuthorsContainer from "../components/AuthorsContainer";

import { useCloudCMSContext } from '../context/CloudCMSContext';

const HomePage = ({ data }) => {
    const books = data.allStoreBook.nodes.map(book => {
        book.imageUrl = book._system.attachments.default.path.publicURL;
        return book;
    });

    const authors = data.allStoreAuthor.nodes.map(author => {
        author.imageUrl = author._system.attachments.default.path.publicURL;
        return author;
    });

    return (
        <Layout>
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
    const { session } = useCloudCMSContext();
    const branchId = 'master';
    const repositoryId = 'c517484d30f8f7b4dee8';
    const books = (await session.query(repositoryId, branchId, { _type: "store:book" }, { limit: 4 })).rows;
    let authors = (await session.query(repositoryId, branchId, { _type: "store:author" }, { limit: 4 })).rows;

    return {
        books,
        authors
    }
}

export default HomePage;
