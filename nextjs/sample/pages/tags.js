import React from "react";
import Layout from '../components/Layout';
import TagsContainer from '../components/TagsContainer';
import { getTags } from '../lib/cloudcms';

const TagsPage = (props) => {
    const title = props.title || "Tags";
    return (
        <Layout title={title}>
            <TagsContainer title={title} tags={props.tags} />
        </Layout>
    );
}

export async function getStaticProps(context)
{
    let tags = await getTags(context);

    return {
        props: {
            tags,
        }
    }
}

export default TagsPage;
