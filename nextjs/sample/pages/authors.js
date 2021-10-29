import React from "react";
import Layout from '../components/Layout';
import AuthorsContainer from '../components/AuthorsContainer';
import { getAuthors } from '../lib/cloudcms';

const AuthorsPage = ({ authors }) => {
    return (
        <Layout title="All Books">
            <AuthorsContainer
                authors={authors}
                title="Authors"
                subtitle="Our store features books by several reputable authors:" />
        </Layout>
    );
}

export async function getStaticProps(context)
{
    let authors = await getAuthors();

    return {
        props: {
            authors,
        }
    }
}

export default AuthorsPage;
