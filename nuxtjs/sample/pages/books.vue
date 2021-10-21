<template>
     <div class="content">
        <div class="books page">

          <BookList title="Books" description="Choose from our fine selection of books" :books="books" />

        </div>
    </div>
</template>

<script>
import BookList from "../components/BookList";

export default {
    components: {
        BookList
    },

    async asyncData({ $cloudcms }) {

        let books = (await $cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { _type: "store:book" }, { limit: 1000 })).rows;
        for (let book of books)
        {
            book.imageUrl = await $cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, book._doc);
        }

        return {
            books: books
        };
    }
}
</script>
