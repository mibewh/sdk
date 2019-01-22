import React from "react";
import { graphql } from "gatsby";

import Layout from '../components/layout';
import Slider from '../components/Slider';
import BooksContainer from '../components/BooksContainer';
import AuthorsContainer from "../components/AuthorsContainer";

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link>
//   </Layout>
// )

const HomePage = ({ data }) => (
  <Layout>
    <Slider book={data.cloudcms.store_books[0]} />
    <BooksContainer
        books={data.cloudcms.store_books}
        title="New Books"
        subtitle="Do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
    <AuthorsContainer authors={data.cloudcms.store_authors} />
  </Layout>
);

export const query = graphql`
  query {
    cloudcms {
      store_books {
        _doc
        title
        description
        author {
          title
        }
        _attachments {
          uri
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
