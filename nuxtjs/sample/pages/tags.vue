<template>
     <div class="content">
        <div class="tags page">

          <TagList title="Tags" :tags="tags" />

        </div>
    </div>
</template>

<script>
import TagList from "../components/TagList";

export default {
    components: {
        TagList
    },

    async asyncData({ $cloudcms }) {

        let tags = (await $cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { _type: "n:tag" }, { limit: 1000 })).rows;

        return {
            tags: tags
        };
    }
}
</script>
