import React, { Fragment } from "react";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {

    componentDidMount() {

    }

    render() {


        return (
            <div className="category page">
                <div className="container">
                    <div className="page-header category-page-header">
                        <h2 className="page-title">Search</h2>
                        <p className="page-subtitle">Find the books you're looking for</p>
                    </div>

                    <div className="page-body">
                        <div className="row">

                            <div className="col-sm-8 col-sm-push-4">
                                <div className="category-toolbar">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-4">
                                            <ul id="myTab" className="nav nav-tabs grid-list-view-buttons" role="tablist">
                                                <li role="presentation" className="active"><Link to={`${this.props.match.url}#grid`} className="btn navbar-btn" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-th active"></span></Link></li>
                                                <li role="presentation"><a href="#list" className="btn navbar-btn" role="tab" data-toggle="tab"><span className="glyphicon glyphicon-th-list"></span></a></li>
                                            </ul>
                                        </div>

                                        <div className="col-md-2 col-sm-4">
                                            <select className="selectpicker" defaultValue="15">
                                                <option value="15">9</option>
                                                <option value="10">10</option>
                                                <option value="20">11</option>
                                                <option value="30">12</option>
                                            </select>
                                        </div>

                                        <div className="col-md-2 col-sm-4">
                                            <select className="selectpicker" defaultValue="position:asc">
                                                <option value="position:asc">Date</option>
                                                <option value="price:asc">Price: Lowest first</option>
                                                <option value="price:desc">Price: Highest first</option>
                                                <option value="name:asc">Product Name: A to Z</option>
                                                <option value="name:desc">Product Name: Z to A</option>
                                                <option value="quantity:desc">In stock</option>
                                                <option value="reference:asc">Reference: Lowest first</option>
                                                <option value="reference:desc">Reference: Highest first</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="tab-content">
                                    <div className="tab-pane active wow fadeInUp" id="grid" role="tabpanel">
                                        <div className="category-books books grid-view">
                                            <div className="row">

                                                {/* book results */}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane wow fadeInUp featured-book-holder" id="list" role="tabpanel">

                                        {/* featured books */}

                                    </div>

                                </div>

                                <ul className="pagination book-pagination">
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                </ul>
                            </div>



                            <div className="col-sm-4 col-sm-pull-8">
                                <aside className="sidebar">
                                    <section className="module">
                                        <header className="module-header">
                                            <h4 className="module-book-category-title">Book Category</h4>
                                        </header>

                                        <div className="module-body category-module-body">
                                            <ul className="list-unstyled category-list">
                                                {/* tags */}
                                            </ul>
                                        </div>
                                    </section>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage
