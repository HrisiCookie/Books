(function() {
    var sammyApp = Sammy('#content', function(){
        // this.get('#/', function() {
        //     this.redirect('#/home');
        // });

        // this.get('#/home', homeController.all);

        this.get('#/register', usersController.register);

        this.get('#/login', usersController.login);

        this.get('#/books', booksController.getBooks);
    });

    $(function() {
        sammyApp.run('#/');
    });
}());