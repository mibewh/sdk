<template>
     <div class="content">
        <div class="home page">

            <div class="slider">
                <div id="hero">
                    <div id="owl-main" class="owl-carousel1 owl-theme">
                        <HeroBook />
                    </div>

                </div>

            </div>

            <BookCarousel title="New Books" description="Do eiusmod tempor incididunt ut labore et dolore magna aliqua" />

            <!-- featured authors -->
            <div class="featured-item-block">
                <AuthorCarousel />
            </div>

        </div>
    </div>
</template>

<script>
import HeroBook from "../components/HeroBook";
import BookCarousel from "../components/BookCarousel";
import AuthorCarousel from "../components/AuthorCarousel";

export default {
    components: {
        HeroBook,
        BookCarousel,
        AuthorCarousel
    }
}
</script>
