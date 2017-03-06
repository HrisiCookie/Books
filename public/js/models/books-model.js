const BOOKS_STORAGE = 'STORAGE_ALL_BOOKS';
const VERY_BIG_NUMBER_FOR_BOOKS_COUNT_FOR_OUR_SMALL_PROJECT = 1000000000;
// const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';

class BooksModel {

    getBooks(params) {
        let promise = new Promise((resolve, reject) => {
            let url = `api/books?page=${params.page}&size${params.size}`;

            requester.get(url)
                 .then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText)
                });
        });

        return promise;

    }

    getSingleBook(bookId) {
        let promise = new Promise((resolve, reject) => {
            let url = `api/books/${bookId}`;

            requester.get(url)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
            });
        });

        return promise;
    }

    addReview(bookId, review) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/mybooks/review';

            let options = {
                headers: {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                }
            };

            let body = {
                bookId,
                review
            };

            requester.putJSON(url, body, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });

        return promise;
    }

}

let booksModel = new BooksModel();
