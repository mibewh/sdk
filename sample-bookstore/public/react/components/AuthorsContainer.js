import React from 'react'

class AuthorContainer extends React.Component {
    render() {
        return (
            <div class="featured-item-block">
                <div class="container">
                    <div class="wow fadeInUp">
                        <div class="module block-featured-author module-block">
                            <div class="module-heading">
                                <h2 class="module-title">Featured Authors</h2>
                                <div class="customNavigation">
                                    <a href="#" data-target="#featured-author-carousel" class="btn btn-navigation left-nav-arrow-featured owl-prev"><i class='icon fa fa-caret-left'></i></a>
                                    <a href="#" data-target="#featured-author-carousel" class="btn btn-navigation right-nav-arrow-featured owl-next"><i class='icon fa fa-caret-right'></i></a>
                                </div>
                            </div>
                            <div class="module-body" id="featured-author">
                                <div class="authors">
                                    <div id="featured-author-carousel" class="owl-carousel">



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