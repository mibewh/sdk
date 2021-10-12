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
import HeroBook from "../components/HeroBook";
import BookList from "../components/BookList";
import AuthorList from "../components/AuthorList";

export default {
    components: {
        HeroBook,
        BookList,
        AuthorList
    },

    async asyncData({ $cloudcms }) {
 
        let books = (await $cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { _type: "store:book" }, { limit: 4 })).rows;
        for (let book of books)
        {
            book.imageUrl = await $cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, book._doc);

        }

        let authors = (await $cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { _type: "store:author" }, { limit: 4 })).rows;
        for (let author of authors)
        {
            author.imageUrl = await $cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, author._doc);

        }
        
        let link = await $cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, books[0]._doc, "default");

        return {
            heroBook: books[0],
            books: books,
            authors: authors,
            link: link //`/cloudcms/assets/${process.env.repositoryId}/${process.env.branchId}/${books[0]._doc}/default`
        };
    }
}
</script>
