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
                        .then((res) => {
                            notificator.success(`${res.username} signed up successfully!`);
                            console.log('User registred!');
                            $('#tb-username').val('');
                            $('#tb-password').val('');
                        }, (err) => {
                            notificator.error(JSON.parse(err).err);
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
                        .then((res) => {
                            notificator.success(`${res.username} signed in!`);
                            console.log('User logged in!');
                            $('#tb-username').val('');
                            $('#tb-password').val('');
                        }, 
                        function (err) {
                            notificator.error('Invalid username or password!');
                        });
                });
            });
    }

    function logout(context) {
        userModel.logout()
            .then(() => {
                notificator.success('User signed out!');
                console.log('User logged out!')
            });
    }

    return {
        register: register,
        login: login,
        logout: logout
    };
}();