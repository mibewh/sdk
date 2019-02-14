import React from "react";
import { graphql } from "gatsby";

import Layout from '../components/Layout';
import Slider from '../components/Slider';
import BooksContainer from '../components/BooksContainer';
import AuthorsContainer from "../components/AuthorsContainer";

const HomePage = ({ data }) => {
  const books = data.cloudcms.store_books.map(book => {
    book.imageUrl = data.site.siteMetadata.baseCDNURL + "/static/" + book._doc + "-image.jpg?node=" + book._doc;
    return book;
  });
  const authors = data.cloudcms.store_authors.map(author => {
    author.imageUrl = data.site.siteMetadata.baseCDNURL + "/static/" + author._doc + "-image.jpg?node=" + author._doc;
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

export const query = graphql`
  query {
    site {
      siteMetadata {
          baseCDNURL
      }
    }
    cloudcms {
      store_books {
        _doc
        title
        description
        author {
          title
        }
      }
      store_authors {
        _doc
        title
      }
    }
  }
`;

export default HomePage;
