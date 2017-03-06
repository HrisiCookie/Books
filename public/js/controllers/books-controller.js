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

var booksController = function() {
    const DEFAULT_BOOK_COVER_URL = 'http://www.jameshmayfield.com/wp-content/uploads/2015/03/defbookcover-min.jpg';

   function getBooks(context) {
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
            let data = {
                books,
                page: currPage,
                firstPage,
                lastPage,
                prevPage,
                nextPage
            };

            templates.get('all-books')
            .then(function(template) {
                context.$element().html(template(data));
            });
        });
    }

    function getSingleBook(context) {
        let book;

        booksModel.getSingleBook(context.params.id)
            .then((resBook) => {
                let reviews = resBook.reviews;

                reviews = reviews.map((review) => {
                    let nickName;
                    userModel.getNickNameByID(review.userId)
                        .then((resNickName) => {
                            nickName = resNickName;
                            review.nickName = nickName;
                        });

                book = resBook;

                return book;

                });

        templates.get('single-book')
                    .then(function(template) {
                        context.$element().html(template(book));

                        $('#btn-review-send').on('click', function() {
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
                    });

            });
    }

    return {
        getBooks: getBooks,
        getSingleBook: getSingleBook
    }
}();