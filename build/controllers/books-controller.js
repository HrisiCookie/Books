'use strict';

// const DEFAULT_BOOK_COVER_URL = 'http://www.jameshmayfield.com/wp-content/uploads/2015/03/defbookcover-min.jpg';
// const VERY_BIG_NUMBER_FOR_BOOKS_COUNT_FOR_OUR_SMALL_PROJECT = 1000000000;

// class BookController {
//     getBooks(context) {
//         booksModel.getBooks(context.params)
//             .then((books) => {
//                 let coveredBooks = books.map((book) => {
//                     let coverAsNumber = parseInt(book.coverUrl);
//                     if (!book.cover) {
//                         book.coverUrl = DEFAULT_BOOK_COVER_URL;
//                     }

//                     return templates.get('all-books');
//                 })
//                 .then(function(template) {
//                     context.$element().html(template());
//                 });
//             });
//     }      
// }

// let bookController = new BookController();

var booksController = function () {
    var DEFAULT_BOOK_COVER_URL = 'http://www.jameshmayfield.com/wp-content/uploads/2015/03/defbookcover-min.jpg';

    function getBooks(context) {
        booksModel.getBooks(context.params).then(function (books) {
            var coveredBooks = books.map(function (book) {
                var coverAsNumber = parseInt(book.coverUrl);
                if (!book.coverUrl) {
                    book.coverUrl = DEFAULT_BOOK_COVER_URL;
                }

                return book;
            });
            var currPage = +context.params.page;
            var firstPage = currPage === 1;
            var lastPage = books.length < context.params.size;
            var prevPage = firstPage ? currPage : currPage - 1;
            var nextPage = lastPage ? currPage : currPage + 1;
            var data = {
                books: books,
                page: currPage,
                firstPage: firstPage,
                lastPage: lastPage,
                prevPage: prevPage,
                nextPage: nextPage
            };

            templates.get('all-books').then(function (template) {
                context.$element().html(template(data));
            });
        });
    }

    function getSingleBook(context) {
        var book = void 0,
            isLoggedIn = void 0;

        booksModel.getSingleBook(context.params.id).then(function (resBook) {
            var reviews = resBook.reviews;

            reviews = reviews.map(function (review) {
                var nickName = void 0;
                userModel.getNickNameByID(review.userId).then(function (resNickName) {
                    nickName = resNickName;
                    review.nickName = nickName;
                });

                book = resBook;

                return book;
            });

            templates.get('single-book').then(function (template) {
                context.$element().html(template(book));

                $('#btn-review-send').on('click', function () {
                    var bookId = $('#title').attr('data-id');
                    var review = $('#tb-review').val();

                    booksModel.addReview(bookId, review).then(function () {
                        notificator.success(user.username + ' added review!');
                        location.reload();
                    }, function (err) {
                        notificator.error(err);
                    });
                });

                $('.change-status').on('click', '.btn-change-status', function () {
                    var status = $(this).attr('data-status');
                    var bookId = $('#title').attr('data-id');

                    // console.log(status);
                    // console.log(bookId);

                    booksModel.changeStatus(bookId, status).then(function () {
                        notificator.success('Status changed!');
                        location.reload();
                    }, function (err) {
                        notificator.error(err);
                    });
                });
            });
        });
    }

    function myBooks(context) {
        booksModel.getMyBooks().then(function (books) {
            var coveredBooks = books.map(function (book) {
                var coverAsNumber = parseInt(book.coverUrl);
                if (!book.coverUrl) {
                    book.coverUrl = DEFAULT_BOOK_COVER_URL;
                }

                return book;
            });

            var data = {
                books: books
            };

            templates.get('my-books').then(function (template) {
                context.$element().html(template(data));
            });
        });
    }

    function newBook(context) {
        templates.get('add-new-book').then(function (template) {
            context.$element().html(template());

            $('#btn-add-book').on('click', function () {
                var title = $('#tb-title').val();
                var author = $('#tb-author').val();
                var description = $('#tb-description').val();
                var pages = $('#tb-pages').val();
                var cover = $('#tb-cover').val() || DEFAULT_BOOK_COVER_URL;
                var genres = $('#tb-genres').val().split(', ');

                var bookToAdd = {
                    title: title,
                    author: author,
                    description: description,
                    pages: pages,
                    cover: cover,
                    genres: genres
                };

                booksModel.addNewBook(bookToAdd).then(function (res) {
                    notificator.success('Added new book!');
                    $('#tb-title').val('');
                    $('#tb-author').val('');
                    $('#tb-description').val('');
                    $('#tb-pages').val('');
                    $('#tb-cover').val('');
                    $('#tb-genres').val('');
                }, function (err) {
                    notificator.error(err);
                });
            });
        });
    }

    return {
        getBooks: getBooks,
        getSingleBook: getSingleBook,
        myBooks: myBooks,
        newBook: newBook
    };
}();