<template>
    <div class="wrapper">

        <Header />

        <div class="content">
            <div class="home page">

                <div class="slider">
                    <div id="hero">
                        <div id="owl-main" class="owl-carousel1 owl-theme">
                            <HeroBook />
                        </div>

                    </div>

                </div>

                <BookCarousel />

                <!-- featured authors -->
                <div class="featured-item-block">
                    <AuthorCarousel />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Header from "./components/Header";
import HeroBook from "./components/HeroBook";
import BookCarousel from "./components/BookCarousel";
import AuthorCarousel from "./components/AuthorCarousel";

export default {
    name: "App",
    components: {
        Header,
        HeroBook,
        BookCarousel,
        AuthorCarousel
    }
};
</script>

<style>

</style>
