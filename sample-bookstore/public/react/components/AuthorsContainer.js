import React, { Fragment } from 'react'
import AuthorItem from './AuthorItem'

class AuthorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorMarkup: null
        };
    }

    componentDidMount() {
        const authorMarkup = this.props.authors.map((author) => (
            <Fragment key={author._doc}>
                <AuthorItem authorItem={author} />
            </Fragment>
        ));

        $("#featured-author-carousel").owlCarousel({
            items : 4,
            itemsMobile :[480,1],
            itemsDesktopSmall : [980,2],
            itemsDesktop :   [1199,3]
        });

        this.setState({ authorMarkup });
    }

    owlLeft() {
        $("#featured-author-carousel").trigger("owl.prev");
    }

    owlRight() {
        $("#featured-author-carousel").trigger("owl.next");
    }

    render() {
        return (
            <div className="featured-item-block">
                <div className="container">
                    <div className="wow fadeInUp">
                        <div className="module block-featured-author module-block">
                            <div className="module-heading">
                                <h2 className="module-title">Featured Authors</h2>
                                <div className="customNavigation">
                                    <a onClick={this.owlLeft} data-target="#featured-author-carousel" className="btn btn-navigation left-nav-arrow-featured owl-prev"><i className='icon fa fa-caret-left'></i></a>
                                    <a onClick={this.owlLeft} data-target="#featured-author-carousel" className="btn btn-navigation right-nav-arrow-featured owl-next"><i className='icon fa fa-caret-right'></i></a>
                                </div>
                            </div>
                            <div className="module-body" id="featured-author">
                                <div className="authors">
                                    <div id="featured-author-carousel" className="owl-carousel">

                                        {this.state.authorMarkup}

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

export default AuthorContainer