<template>
    <div class="wow fadeInUp">
        <div class="module block-new-books module-block">
            <div class="module-heading">
                <h2 class="module-title">New Books</h2>
                <div class="customNavigation">
                    <div data-target="#new-carousel" class="btn btn-navigation left-nav-arrow owl-prev"><i class='icon fa fa-caret-left'></i></div>
                    <div data-target="#new-carousel" class="btn btn-navigation right-nav-arrow owl-next"><i class='icon fa fa-caret-right'></i></div>
                </div>
                <p class="module-subtitle">Do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>

            <div class="module-body">
                <div class="books">
                    <div id="new-carousel" class="owl-carousel home-owl-carousel">
                        <div class="item item-carousel" v-for="book in books" :key="book._doc">
                            <Book v-bind:book="book" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Book from "./Book";

export default {
    components: {
        Book
    },

    data() {
        return {
            books: []
        }
    },

    created() {
        this.fetchBooks();
    },

    methods: {
        fetchBooks() {
            return axios.get('/api/books')
                .then(response => {
                    this.books = Object.values(response.data);
                });
        }
    }
};
</script>
