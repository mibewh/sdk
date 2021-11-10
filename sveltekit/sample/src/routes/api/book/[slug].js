import { connect } from '$lib/api/cloudcms';

// GET /api/book/[slug]
export const get = async (request) => {
    const { slug } = request.params;
    const query = { 
        slug,
        _type: 'store:book'
    };

	const session = await connect(fetch);
	const branch = await session.master();

    let book = await branch.queryOneNode(query);


	return {
		body: {
			...book
		}
	};
};
