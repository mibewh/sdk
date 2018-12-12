import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import BookItem from '../components/BookItem'
import Content from '../components/Content'
import Slider from '../components/Slider'

const Index = (props) => (
  <Layout>
    <h1>CCMS</h1>
    <ul>
      {getBookList(props.books).map((book) => (
        <li key={book._doc}>
        <BookItem bookItem={book}/>
        </li>
      ))}
    </ul>

    <Content>
      <Slider bookItem={getBookList(props.books)[0]}/>
    </Content>
  </Layout>
)

function getBookList(data) {
    let bookList = [];
    Object.keys(data).forEach((bid) => (
        bookList.push(data[bid])
    ))
    return bookList
}

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:2999/api/books')
  const data = await res.json()

  return {
    books: data
  }
}

export default Index