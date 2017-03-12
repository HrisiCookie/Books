'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOOKS_STORAGE = 'STORAGE_ALL_BOOKS';
var VERY_BIG_NUMBER_FOR_BOOKS_COUNT_FOR_OUR_SMALL_PROJECT = 1000000000;
// const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';

var BooksModel = function () {
    function BooksModel() {
        _classCallCheck(this, BooksModel);
    }

    _createClass(BooksModel, [{
        key: 'getBooks',
        value: function getBooks(params) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/books?page=' + params.page + '&size' + params.size;

                requester.get(url).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText);
                });
            });

            return promise;
        }
    }, {
        key: 'getSingleBook',
        value: function getSingleBook(bookId) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/books/' + bookId;

                requester.get(url).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });

            return promise;
        }
    }, {
        key: 'addReview',
        value: function addReview(bookId, review) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/mybooks/review';

                // let options = {
                //     headers: {
                //         'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                //     }
                // };

                var body = {
                    bookId: bookId,
                    review: review
                };

                // requester.putJSON(url, body, options)
                //     .then((res) => {
                //         resolve(res);
                //     }, (err) => {
                //         reject(err);
                //     });

                userModel.getLoggedHeader().then(function (headers) {
                    var options = { headers: headers };
                    return requester.putJSON(url, body, options);
                }).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });

            return promise;
        }
    }, {
        key: 'changeStatus',
        value: function changeStatus(bookId, status) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/mybooks';

                // let options = {
                //     headers: {
                //         'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                //     }
                // };

                var body = {
                    bookId: bookId,
                    bookStatus: status
                };

                // requester.putJSON(url, body, options)
                //     .then((res) => {
                //         resolve(res);
                //     }, (err) => {
                //         reject(err);
                //     });

                userModel.getLoggedHeader().then(function (headers) {
                    var options = { headers: headers };
                    return requester.putJSON(url, body, options);
                }).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });

            return promise;
        }
    }, {
        key: 'getMyBooks',
        value: function getMyBooks() {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/mybooks/all';

                // let options = {
                //     headers: {
                //         'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                //     }
                // };

                // requester.get(url, options)
                //     .then((res) => {
                //         resolve(res);
                //     }, (err) => {
                //         reject(err);
                //     });

                userModel.getLoggedHeader().then(function (headers) {
                    var options = { headers: headers };
                    return requester.getJSON(url, options);
                }).then(resolve, reject);
            });

            return promise;
        }
    }, {
        key: 'addNewBook',
        value: function addNewBook(bookToAdd) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/books';
                var headers = void 0;
                var body = {
                    data: bookToAdd
                };

                userModel.getLoggedHeader().then(function (resHeader) {
                    headers = resHeader;
                }).then(function () {
                    var options = { headers: headers };

                    return requester.postJSON(url, body, options);
                }).then(function (res) {
                    var books = JSON.parse(localStorage.getItem(BOOKS_STORAGE));
                    books.push(res);
                    localStorage.setItem(BOOKS_STORAGE, JSON.stringify(books));
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });

            return promise;
        }
    }]);

    return BooksModel;
}();

var booksModel = new BooksModel();