<template>
    <div class="container">
        <div class="wow fadeInUp">
            <div class="module block-new-books module-block">
                <div class="module-heading">
                    <h2 class="module-title">{{title}}</h2>
                    <div class="customNavigation">
                        <div v-on:click="previousItem" class="btn btn-navigation left-nav-arrow owl-prev"><i class='icon fa fa-caret-left'></i></div>
                        <div v-on:click="nextItem" class="btn btn-navigation right-nav-arrow owl-next"><i class='icon fa fa-caret-right'></i></div>
                    </div>
                    <p class="module-subtitle">{{description}}</p>
                </div>

                <div class="module-body">
                    <div class="books">
                        <div id="new-carousel" class="owl-carousel home-owl-carousel">
                            <div class="item item-carousel" v-for="book in booksList" :key="book._doc">
                                <Book v-bind:book="book" />
                            </div>
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

    props: {
        books: {
            type: Array,
            required: false
        },
        title: {
            type: String
        },
        description: {
            type: String
        }
    },

    data() {
        return {
            booksList: this.books
        }
    },

    created() {
        if (!this.booksList)
        {
            this.fetchBooks();
        }
        else
        {
            this.loadCarousel();
        }
    },

    mounted() {
        if (this.booksList)
        {
            this.loadCarousel();
        }
    },

    updated() {
        this.$nextTick(function() {
            this.loadCarousel()
        });
    },

    methods: {
        fetchBooks() {
            return axios.get('/api/books')
                .then(response => {
                    this.booksList = Object.values(response.data);
                });
        },
        loadCarousel() {
            $("#new-carousel").owlCarousel({
                items : 4,
                itemsMobile :[480,1],
                itemsDesktopSmall : [980,3],
                navigation : false,
                pagination : false,
                navText: [$("#new-carousel-left"), $("#new-carousel-right")]
            }); 
        },
        nextItem() {
            $("#new-carousel").trigger("owl.next");
        },
        previousItem() {
            $("#new-carousel").trigger("owl.prev");            
        }
    }
};
</script>
