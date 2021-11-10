<script context="module">

	export const load = async ({ fetch }) => {
		const res = await fetch('/api/books?limit=-1', { method: 'POST'}).then(res => res.json());

		return {
			props: {
				books: res.books
			}
		}
	};
</script>

<script>
	export let books;
</script>

<svelte:head>
	<title>Books</title>
</svelte:head>

<div class="todos">
	<h1>Books</h1>
	<ul>
		{#each books as book}
			<li>{book.title}</li>
		{/each}
	</ul>

	
</div>

<style>

</style>
