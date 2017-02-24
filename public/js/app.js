(function() {
    var sammyApp = Sammy('#content', function(){
        this.get('#/register', usersController.register);
    });

    $(function() {
        sammyApp.run('#/');
    });
}());