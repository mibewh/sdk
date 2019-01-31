<template>
    <div class="container">
        <div class="wow fadeInUp">
            <div class="module block-new-books module-block">
                <div class="module-heading">
                    <h2 class="module-title">{{title}}</h2>
                    <p class="module-subtitle">{{description}}</p>
                </div>

                <div class="module-body">
                    <div class="books">
                        <div class="row">
                            <div class="col-md-3" v-for="book in booksList" :key="book._doc">
                                <Book v-bind:book="book" width="255" height="261" />
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
        title: {
            type: String
        },
        description: {
            type: String
        }
    },
    
    // computed: {
    //     booksList() {
    //         console.log(this.$store.state.books.books);
    //         return Object.values(this.$store.state.books.books).slice(0, 5);
    //     }
    // },

    data() {
        return {
            booksList: []
        }
    },

    // created() {
    //     if (!this.booksList)
    //     {
    //         this.fetchBooks();
    //     }
    // },

    asyncData(context) {
        // DOESN'T WORK ON COMPONENTS!
        // MOVE THIS TO THE PAGE(S) THEMSELVES PLS
        console.log('fetching');
        return axios.get('http://localhost:2999/api/books')
            .then(response => {
                const booksList = Object.values(response.data).slice(0,5);
                return { booksList: booksList };
            });
    },

    // methods: {
    //     fetchBooks() {
    //         return axios.get('http://localhost:2999/api/books')
    //             .then(response => {
    //                 this.booksList = Object.values(response.data);
    //                 this.booksList = this.booksList.slice(0, Math.min(4, this.booksList.length));
    //             });
    //     }
    // }
};
</script>
