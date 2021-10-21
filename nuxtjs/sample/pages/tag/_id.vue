<template>
    <div class="tag-detail page">
        <div class="container">
            <div class="primary-block clearfix">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="tag-detail-header">
                            <h2 class="tag-title">{{tag.title}}</h2>
                        </div>
                    </div>

                    <div class="col-sm-8">

                      <BookList title="Tagged Results" description="The following books and authors have this tag" :books="results" />

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import BookList from "../../components/BookList";

export default {
    components: {
        BookList
    },

    data() {
        return {
            tag: {},
            results: [],
            tagLink: "#",
            loaded: false
        }
    },

    async asyncData(context) {

        const tagSlug = context.params.id;

        // find tag instance
        let tag = (await context.$cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { "_type": "n:tag", "tag": tagSlug }, { limit: 1 })).rows[0];

        // find tagged documents
        let results = (await context.$cloudcms.queryNodes(process.env.repositoryId, process.env.branchId, { "_type": { "$in": ["store:book", "store:author"] }, "tags": tagSlug }, { limit: 100 })).rows;
        for (let result of results)
        {
            result.imageUrl = await context.$cloudcms.createAttachmentLink(process.env.repositoryId, process.env.branchId, result._doc);
        }

        return {
            tag: tag,
            results: results,
            tagLink: "/tag/" + tag.tag,
            loaded: true
        };
    }

}
</script>
