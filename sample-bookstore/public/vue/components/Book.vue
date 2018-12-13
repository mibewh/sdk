<template>
    <div class="books">
        <div class="book">
            <div class="book-cover">
                <div class="book-inner">
                    <a v-bind:href="bookLink">
                        <img v-bind:src="book.imageUrl" v-bind:alt="book.title">
                    </a>
                    <div class="fade"></div>
                    <div class="book-price">
                        <span class="price">
                            $ {{book.price}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="book-details">
                <router-link tag="h3" class="book-title" v-bind:to="bookLink"><a>{{book.title}}</a></router-link>
                <p class="book-author">{{book.authorTitle}}</p>
                <div class="star-rating">
                    <!-- <i class="fa fa-star {{#lte 1 book.rating}}color{{/lte}}"></i>
                    <i class="fa fa-star {{#lte 2 book.rating}}color{{/lte}}"></i>
                    <i class="fa fa-star {{#lte 3 book.rating}}color{{/lte}}"></i>
                    <i class="fa fa-star {{#lte 4 book.rating}}color{{/lte}}"></i>
                    <i class="fa fa-star {{#lte 5 book.rating}}color{{/lte}}"></i> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        book: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            bookLink: "/book/" + this.book._doc
        };
    }
};
</script>
