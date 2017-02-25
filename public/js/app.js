(function() {
    var sammyApp = Sammy('#content', function(){
        this.get('#/register', usersController.register);

        this.get('#/login', usersController.login);
    });

    $(function() {
        sammyApp.run('#/');
    });
}());