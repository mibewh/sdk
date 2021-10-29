import React from "react";
import Layout from '../../components/Layout';
import BooksContainer from '../../components/BooksContainer';
import { queryOne, query, getTags } from '../../lib/cloudcms';

const TagsPage = ({tag, results}) => {

    return (
        <Layout title={tag.title}>
            <div className="tag-detail page" data-cms-id={tag._doc}>
                <div className="container">
                    <div className="primary-block clearfix">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="tag-detail-header">
                                    <h2 className="tag-title">{tag.title}</h2>
                                </div>
                            </div>

                            <div className="col-sm-8">

                            <BooksContainer title="Tagged Results" description="The following books and authors have this tag" books={results} />

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    );
}

export async function getStaticProps(context)
{
    let tagSlug = context.params.tag;
    let tag = await queryOne({ _type: "n:tag", tag: tagSlug });

    let results = await query({ "_type": { "$in": ["store:book"] }, "tags": tagSlug });
    console.log(results);

    return {
        props: {
            tag,
            results
        }
    }
}

export async function getStaticPaths(context)
{
    const tags = await getTags();

    let paths = tags.map(tag => ({ params: { tag: tag.tag }}));
    return {
        paths,
        fallback: false
    }
}

export default TagsPage;
