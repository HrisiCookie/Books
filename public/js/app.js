(function() {
    var sammyApp = Sammy('#content', function(){
        // this.get('#/', function() {
        //     this.redirect('#/home');
        // });

        // this.get('#/home', homeController.all);

        this.get('#/register', usersController.register);

        this.get('#/login', usersController.login);

        this.get('#/logout', usersController.logout);

        this.get('#/books', booksController.getBooks);

        this.get('#/books/:id', booksController.getSingleBook);
    });

    $(function() {
        sammyApp.run('#/');
    });
}());