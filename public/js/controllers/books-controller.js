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
    const DEFAULT_BOOK_COVER_URL = 'http://www.jameshmayfield.com/wp-content/uploads/2015/03/defbookcover-min.jpg';

    function getBooks(context) {
        var data;

        booksModel.getBooks(context.params)
            .then((books) => {
                let coveredBooks = books.map((book) => {
                    let coverAsNumber = parseInt(book.coverUrl);
                    if (!book.coverUrl) {
                        book.coverUrl = DEFAULT_BOOK_COVER_URL;
                    }

                    return book;
                });
                let currPage = +context.params.page;
                let firstPage = currPage === 1;
                let lastPage = books.length < context.params.size;
                let prevPage = firstPage ? currPage : currPage - 1;
                let nextPage = lastPage ? currPage : currPage + 1;
                data = {
                    books,
                    page: currPage,
                    firstPage,
                    lastPage,
                    prevPage,
                    nextPage
                };
                return booksModel.getBookPages();
            })
            .then(function (pagesCount) {
                var pages = [];
                for (let i = 0; i < pagesCount; i++) {
                    pages.push({
                        number: i + 1,
                        link: `#/books?page=${i + 1}&size=12`
                    });
                }

                data.pages = pages;
                return templates.get('all-books');
            })
            .then(function (template) {
                context.$element().html(template(data));
            });
    }

    function getSingleBook(context) {
        let book, isLoggedIn;

        booksModel.getSingleBook(context.params.id)
            .then((resBook) => {
                let reviews = resBook.reviews;

                // reviews = reviews.map((review) => {
                //     let nickName;
                //     userModel.getNickNameByID(review.userId)
                //         .then((resNickName) => {
                //             nickName = resNickName;
                //             review.nickName = nickName;
                //         });

                book = resBook;

                return book;

            }).then(function (book) {
                templates.get('single-book')
                    .then(function (template) {
                        context.$element().html(template(book));

                        $('#btn-review-send').on('click', function () {
                            let bookId = $('#title').attr('data-id');
                            let review = $('#tb-review').val();

                            booksModel.addReview(bookId, review)
                                .then(() => {
                                    notificator.success(`${user.username} added review!`);
                                    location.reload();
                                }, (err) => {
                                    notificator.error(err);
                                });
                        });

                        $('.change-status').on('click', '.dropdown-item', function () {
                            let status = $(this).attr('data-status');
                            let bookId = $('#title').attr('data-id');

                            // console.log(status);
                            // console.log(bookId);

                            // $('.change-status').on('click', '.dropdown-item', function(){
                            var selText = $(this).text();
                            $(this).parents('.change-status').find('.dropdown-toggle').html(selText + '<span class="caret"></span>');
                            // });

                            booksModel.changeStatus(bookId, status)
                                .then(() => {
                                    notificator.success('Status changed!');
                                    // location.reload();
                                }, (err) => {
                                    notificator.error(err);
                                });
                        });

                        $(document).ready(function () {
                            let readMoreHtml = $('.read-more').html();
                            let lessText = readMoreHtml.substr(0, 1350);
                            let readMoreHtmlMobile = $('.mobile-read-more').html();
                            let lessTextMobile = readMoreHtmlMobile.substr(0, 300);
                            let readMoreHtmlMiddle = $('.middle-read-more').html();
                            let lessTextMiddle = readMoreHtmlMiddle.substr(0, 700);

                            if (readMoreHtml.length > 1350) {
                                $('.read-more').html(lessText).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            } else {
                                $('.read-more').html(readMoreHtml);
                            }

                            console.log('here');

                            $('body').on('click', '.read-more-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.read-more').html(readMoreHtml).append("<br/><button class='btn-read-more-less show-less-link'>Show less</button>");
                            });

                            $('body').on('click', '.show-less-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.read-more').html(readMoreHtml.substr(0, 1350)).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            });

                            //mobile
                            if (readMoreHtmlMobile.length > 300) {
                                $('.mobile-read-more').html(lessTextMobile).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            } else {
                                $('.mobile-read-more').html(readMoreHtmlMobile);
                            }

                            $('body').on('click', '.read-more-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.mobile-read-more').html(readMoreHtmlMobile).append("<br/><button class='btn-read-more-less show-less-link'>Show less</button>");
                            });

                            $('body').on('click', '.show-less-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.mobile-read-more').html(readMoreHtmlMobile.substr(0, 300)).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            });

                            //middle
                            if (readMoreHtmlMiddle.length > 700) {
                                $('.middle-read-more').html(lessTextMiddle).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            } else {
                                $('.middle-read-more').html(readMoreHtmlMiddle);
                            }

                            $('body').on('click', '.read-more-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.middle-read-more').html(readMoreHtmlMiddle).append("<br/><button class='btn-read-more-less show-less-link'>Show less</button>");
                            });

                            $('body').on('click', '.show-less-link', function (event) {
                                event.preventDefault();
                                $(this).parent('.middle-read-more').html(readMoreHtmlMiddle.substr(0, 700)).append("<span>...</span><br/><button class='btn-read-more-less read-more-link'>Show more</button>");
                            });
                        });
                    });
            });



        // });
    }

    function myBooks(context) {
        booksModel.getMyBooks()
            .then((books) => {
                let coveredBooks = books.map((book) => {
                    let coverAsNumber = parseInt(book.coverUrl);
                    if (!book.coverUrl) {
                        book.coverUrl = DEFAULT_BOOK_COVER_URL;
                    }

                    return book;
                });

                let data = {
                    books
                };

                templates.get('my-books')
                    .then(function (template) {
                        context.$element().html(template(data));
                    });
            });
    }

    function newBook(context) {
        templates.get('add-new-book')
            .then(function (template) {
                context.$element().html(template());

                $('#btn-add-book').on('click', function () {
                    let title = $('#tb-title').val();
                    let author = $('#tb-author').val();
                    let description = $('#tb-description').val();
                    let pages = $('#tb-pages').val();
                    let cover = $('#tb-cover').val() || DEFAULT_BOOK_COVER_URL;
                    let genres = $('#tb-genres').val().split(', ');

                    let bookToAdd = {
                        title,
                        author,
                        description,
                        pages,
                        cover,
                        genres
                    };

                    booksModel.addNewBook(bookToAdd)
                        .then((res) => {
                            notificator.success('Added new book!');
                            $('#tb-title').val('');
                            $('#tb-author').val('');
                            $('#tb-description').val('');
                            $('#tb-pages').val('');
                            $('#tb-cover').val('');
                            $('#tb-genres').val('');
                        }, (err) => {
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
    }
} ();