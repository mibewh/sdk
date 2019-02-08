<template>
    <div class="item item-author-block author" style="text-align: center">
        <nuxt-link to="/">
            <div class="author-dp">
                <img v-bind:src="author.imageUrl"  v-bind:alt="author.title">
            </div>
        </nuxt-link>        
        <div class="author-details">
            <h3 class="author-name">
                <nuxt-link tag="a" to="/">{{author.title}}</nuxt-link>
            </h3>
            <blockquote class="author-testimonial">{{author.testimonial}}</blockquote>
            <nuxt-link tag="a" to="/" class="btn btn-primary btn-view-books">View books</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        author: {
            type: Object,
            required: true
        }
    }
}
</script>
