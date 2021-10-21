<template>
     <div class="content">
        <div class="authors page">

          <AuthorList title="Authors" description="Our store features books by several reputable authors:" :authors="authors" />

        </div>
    </div>
</template>

<script>
import AuthorList from "../components/AuthorList";

export default {
    components: {
        AuthorList
    },

    async asyncData({ $cloudcms }) {

        let authors = (await $cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { _type: "store:author" }, { limit: 1000 })).rows;
        for (let author of authors)
        {
            author.imageUrl = await $cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, author._doc);
        }

        return {
            authors: authors
        };
    }
}
</script>
