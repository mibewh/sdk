<template>
    <div class="wrapper">

        <header class="header">

            <!-- top navbar -->
            <nav class="navbar navbar-top-bar navbar-static-top">
                <div class="container">
                    <ul class="navbar-nav nav">
                        <li><a href="index.html">Home</a></li>
                        <li class="disabled"><a href="index.html">About Us</a></li>
                    </ul>
                    <ul class="navbar-nav nav navbar-right">
                        <li class="disabled"><a href="#">Login</a></li>
                        <li>
                            <form class="navbar-form" method="get" action="search.html">
                                <div class="form-group">
                                    <input name="text" type="text" class="form-control" placeholder="Search">
                                </div>
                                <button type="submit" class="btn btn-default btn-search">Search</button>
                            </form>

                        </li>
                    </ul>
                </div>
            </nav>

            <!-- main navigation -->
            <div class="yamm navbar navbar-default navbar-default-book animate-dropdown" role="navigation">
                <div class="container">
                    <div class="header-mast">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#KYbook-navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                            <a class="navbar-brand" href="index.html">
                                <img class="logo" src="../images/book-flat.png">
                                <span class="title">Quick Start Books</span>
                            </a>
                        </div>
                        <!--
                        <div class="collapse navbar-collapse" id="KYbook-navbar">
                            <ul class="nav navbar-nav navbar-right">
                                <li class="active"><a href="index.html">Books</a></li>
                                <li class="disabled"><a href="index.html">Audiobooks</a></li>
                                <li class="disabled"><a href="index.html">Magazines</a></li>
                            </ul>
                        </div>
                        -->
                    </div>
                </div>
            </div>

        </header>



        <div class="content">
            <div class="home page">

                <div class="slider">
                    <div id="hero">
                        <div id="owl-main" class="owl-carousel1 owl-theme">
                            <HeroBook />
                        </div>

                    </div>

                </div>

                <div class="container">

                    <BookCarousel />

                </div>

                <!-- featured authors -->
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
                                            <!-- insert authors here -->
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
</template>

<script>
import HeroBook from "./components/HeroBook";
import BookCarousel from "./components/BookCarousel";

export default {
    name: "App",
    components: {
        HeroBook,
        BookCarousel
    }
};
</script>

<style>

</style>
