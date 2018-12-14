import React, { Fragment } from 'react'
import BookItem from './BookItem'
// import $ from 'jquery'
// import '../../assets/js/owl.carousel.min.js'

const containerStyle = {
    width: 2850,
    left: 0,
    display: "block"
}

class BooksContainer extends React.Component {

    // componentDidMount() {
    //     $("#new-carousel").owlCarousel({
    //         items: 4,
    //         itemsMobile: [480, 1],
    //         itemsDesktopSmall: [980, 3],
    //         navigation: false,
    //         pagination: false,
    //         navText: [$("#new-carousel-left"), $("#new-carousel-right")]
    //     })
    // }

    render() {
        return (
            <div className="container">
                <div className="wow fadeInUp">
                    <div className="module block-new-books module-block">
                        <div className="module-heading">
                            <h2 className="module-title">New Books</h2>
                            <div className="customNavigation">
                                <a href="#" data-target="#new-carousel" className="btn btn-navigation left-nav-arrow owl-prev"><i className='icon fa fa-caret-left'></i></a>
                                <a href="#" data-target="#new-carousel" className="btn btn-navigation right-nav-arrow owl-next"><i className='icon fa fa-caret-right'></i></a>
                            </div>
                            <p className="module-subtitle">Do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                        <div className="module-body">
                            <div className="books">
                                <div id="new-carousel" className="owl-carousel home-owl-carousel">
                                    <div className="owl-wrapper-outer">
                                        <div className="owl-wrapper" style={containerStyle}>
                                            {this.props.books.map((book) => (
                                                <Fragment key={book._doc}>
                                                    <BookItem bookItem={book} />
                                                </Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default BooksContainer
