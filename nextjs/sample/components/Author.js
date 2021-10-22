import React from "react";
import Link from "next/link";
import Image from 'next/image'

const Author = ({ author }) => (
    <div className="item item-author-block author" style={{"textAlign": "center"}}>
        <Link href={`/author/${author._doc}`}>
            <div className="author-dp">
                <Image src={author.imageUrl} alt={author.title} />
            </div>
        </Link>
        <div className="author-details">
            <h3 className="author-name">
                <Link to={`/`}>
                    {author.title}
                </Link>
            </h3>
            <Link href={`/`} className="btn btn-primary btn-view-books">
                View Books
            </Link>
        </div>
    </div>
)

export default Author