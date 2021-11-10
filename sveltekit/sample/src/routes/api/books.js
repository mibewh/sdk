import { connect } from '$lib/api/cloudcms';

// POST /api/books
export const post = async (request) => {
	let query = request.body || {};
	query._type = "store:book";

	const pagination = Object.fromEntries(request.query);

	const session = await connect(fetch);
	const branch = await session.master();

    let books = (await branch.queryNodes(query, pagination)).rows;


	return {
		body: {
			books
		}
	};
};
