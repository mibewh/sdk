export const state = ()=> ({
    books: {}
});

export const mutations = {
    setBooks (state, books) {
        console.log('set me');
        console.log(books);
        state.books = books;
    }
};