import React from "react";

const Slider = (props) => (
    <div className="slider">
        <div id="hero">
            <div id="owl-main" className="owl-carousel1 owl-theme">
                <div className="item">
                <div className="container">
                    <div className="content caption">
                        <div className="row">
                            <div className="col-sm-5 col-sm-push-7">
                                <div className="book-in-shelf">
                                    <div className="book-shelf">
                                        <div className="book-cover slider-book-cover">
                                            <img className="img-responsive" alt="" src={props.bookItem.imageUrl} width="258" height="351" />
                                            <div className="fade"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-7 col-sm-pull-5">
                                <div className="clearfix slider-caption">
                                    <div className="slider-caption-heading">
                                        <h1 className="slider-caption-title fadeInDown-1">{props.bookItem.title}</h1>
                                        <p className="slider-caption-subtitle fadeInDown-2 hidden-xs">{props.bookItem.description}</p>
                                    </div>
                                    <div className="clearfix slider-price fadeInDown-3 hidden-xs">
                                        <a className="btn btn-secondary btn-price" href="#">${props.bookItem.price}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
)

export default Slider