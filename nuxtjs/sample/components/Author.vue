<template>
    <div class="item item-author-block author" style="text-align: center">
        <a href="/">
            <div class="author-dp">
                <img v-bind:src="author.imageUrl"  v-bind:alt="author.title">
            </div>
        </a>        
        <div class="author-details">
            <h3 class="author-name">
                <a href="/">{{author.title}}</a>
            </h3>
            <blockquote class="author-testimonial">{{author.testimonial}}</blockquote>
            <a href="/" class="btn btn-primary btn-view-books">View books</a>
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
