<template>
     <div class="content">
        <div class="home page">
            <div class="slider">
                <div id="hero">
                    <div id="owl-main" class="owl-carousel1 owl-theme">
                        <HeroBook :book="heroBook" />
                    </div>
                </div>

            </div>

            <BookList title="New Books" description="Do eiusmod tempor incididunt ut labore et dolore magna aliqua" :books="books" />

            <!-- featured authors -->
            <div class="featured-item-block">
                <AuthorList :authors="authors" />
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeroBook from "../components/HeroBook";
import BookList from "../components/BookList";
import AuthorList from "../components/AuthorList";

export default {
    components: {
        HeroBook,
        BookList,
        AuthorList
    },

    asyncData(context) {
        return context.$getCloudCMS().then(function({ branch }) {

            return branch.queryNodes({ _type: "store:book" }).then(function() {
                var books = this.asArray().slice(0,4);
                books.forEach(function(book) {
                    book.imageUrl = context.app.$baseCDNURL + "/static/" + book._doc + "-image.jpg?node=" + book._doc;
                });

                return branch.queryNodes({ _type: "store:author" }).then(function() {
                    const authors = this.asArray().slice(0,4);
                    authors.forEach(function(author) {
                        author.imageUrl = context.app.$baseCDNURL + "/static/" + author._doc + "-image.jpg?node=" + author._doc;
                    });
                    
                    return {
                        heroBook: books[0],
                        books: books,
                        authors: authors
                    };
                });
            });
        });

        // return context.app.$getGitanaPlatform(function() {}).then(function() {
        //     var platform = this;
        //     return platform.readRepository("2e746f5ff87eb5b3508d").readBranch("master").then(function() {
        //         const branch = this;

        //         return branch.queryNodes({ _type: "store:book" }).then(function() {
        //             var books = this.asArray().slice(0,4);
        //             books.forEach(function(book) {
        //                 book.imageUrl = context.app.$baseCDNURL + "/static/" + book._doc + "-image.jpg?node=" + book._doc;
        //             });

        //             return branch.queryNodes({ _type: "store:author" }).then(function() {
        //                 const authors = this.asArray().slice(0,4);
        //                 authors.forEach(function(author) {
        //                     author.imageUrl = context.app.$baseCDNURL + "/static/" + author._doc + "-image.jpg?node=" + author._doc;
        //                 });

        //                 return {
        //                     heroBook: books[0],
        //                     books: books,
        //                     authors: authors
        //                 };
        //             });
        //         });
        //     });
            
        // });
    }
}
</script>
