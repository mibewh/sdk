<template>
    <div class="item item-author-block author">
        <a href="detail.html">
            <div class="author-dp">
                <img v-bind:src="author.imageUrl"  v-bind:alt="author.title">
            </div>
        </a>
        <div class="author-details">
            <h3 class="author-name"><a href="search.html">{{author.title}}</a></h3>
            <blockquote class="author-testimonial">{{author.testimonial}}</blockquote>
            <a href="search.html" class="btn btn-primary btn-view-books">View Books</a>
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
