import Link from 'next/link'

const BookItem = (props) => (
    <div>
        <Link href={props.bookItem.imageUrl}>
            <a>{props.bookItem.title}</a>
        </Link>
    </div>
)

export default BookItem