<template>
    <div class="container">
        <div class="wow fadeInUp">
            <div class="module block-featured-author module-block">
                <div class="module-heading">
                    <h2 class="module-title">Featured Authors</h2>
                    <div class="customNavigation">
                        <div v-on:click="previousItem" class="btn btn-navigation left-nav-arrow-featured owl-prev"><i class='icon fa fa-caret-left'></i></div>
                        <div v-on:click="nextItem" class="btn btn-navigation right-nav-arrow-featured owl-next"><i class='icon fa fa-caret-right'></i></div>
                    </div>
                </div>
                <div class="module-body" id="featured-author">
                    <div class="authors">
                        <div id="featured-author-carousel" class="owl-carousel">
                            <div class="item item-carousel" v-for="author in authors" :key="author._doc">
                                <Author v-bind:author="author" />
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
import Author from "./Author";

export default {
    components: {
        Author
    },

    data() {
        return {
            authors: []
        };
    },

    created() {
        this.fetchAuthors();
    },

    updated() {
        this.$nextTick(function() {
            $("#featured-author-carousel").owlCarousel({
                items : 4,
                itemsMobile :[480,1],
                itemsDesktopSmall : [980,2],
                itemsDesktop :   [1199,3]
            });
        });
    },

    methods: {
        fetchAuthors() {
            return axios.get('/api/authors')
                .then(response => {
                    this.authors = Object.values(response.data);
                });
        },
        nextItem() {
            $("#featured-author-carousel").trigger("owl.next");
        },
        previousItem() {
            $("#featured-author-carousel").trigger("owl.prev");            
        }
    }
}
</script>

