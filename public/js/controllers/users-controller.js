var usersController = function() {

    function register(context) {
        templates.get('register')
            .then(function(template) {
                context.$element().html(template());

                $('#btn-register').on('click', () => {
                    // console.log('Here');
                    let user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };

                    userModel.register(user)
                        .then(() => {
                            console.log('User registred!');
                        });
                });
            });
    }

    function login(context) {
        templates.get('login')
            .then(function(template) {
                context.$element().html(template());

                $('#btn-login').on('click', () => {
                    let user = {
                        username: $('#tb-username').val(),
                        password: $('#tb-password').val()
                    };
                    
                    userModel.login(user)
                        .then(() => {
                            console.log('User logged in!')
                        });
                });
            });
    }

    return {
        register: register,
        login: login
    };
}();