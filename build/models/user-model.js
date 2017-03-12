'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
var STORAGE_USERNAMES_AND_ID = 'STORAGE_USERNAMES';
var STORAGE_USERNAME = 'STORAGE_USERNAME';

// function createRequestOptions(user) {
//     let options = {
//         data: {
//             username: user.username,
//             passHash: CryptoJS.SHA1($(user.password).val()).toString()
//         }
//     };

//     return options;
// }

var UserModel = function () {
    function UserModel() {
        _classCallCheck(this, UserModel);
    }

    _createClass(UserModel, [{
        key: 'register',
        value: function register(user) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/users';
                // let options = createRequestOptions(user);
                var body = {
                    username: user.username,
                    passHash: CryptoJS.SHA1($(user.password).val()).toString()
                };

                requester.postJSON(url, body).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText);
                });
            });

            return promise;
        }
    }, {
        key: 'login',
        value: function login(user) {
            var promise = new Promise(function (resolve, reject) {
                var url = 'api/users/auth';
                var body = {
                    username: user.username,
                    passHash: CryptoJS.SHA1($(user.password).val()).toString()
                };

                requester.putJSON(url, body).then(function (res) {
                    localStorage.setItem(STORAGE_AUTH_KEY, res.authKey), localStorage.setItem(STORAGE_USERNAME, res.username);
                    resolve(res);
                }, function (err) {
                    reject(err.responseText);
                });
            });

            return promise;
        }
    }, {
        key: 'logout',
        value: function logout() {
            var promise = new Promise(function (resolve, reject) {
                localStorage.removeItem(STORAGE_AUTH_KEY);
                localStorage.removeItem(STORAGE_USERNAME);
                resolve();
            });

            return promise;
        }
    }, {
        key: 'isLoggedIn',
        value: function isLoggedIn() {
            return Promise.resolve().then(function () {
                return !!localStorage.getItem(STORAGE_AUTH_KEY);
            });
        }
    }, {
        key: 'getLoggedHeader',
        value: function getLoggedHeader() {
            return Promise.resolve().then(function () {
                var a = localStorage.getItem(STORAGE_AUTH_KEY);
                return {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                };
            });
        }
    }, {
        key: 'getNickNameByID',
        value: function getNickNameByID(userId) {
            return Promise.resolve().then(function () {
                var users = JSON.parse(localStorage.getItem(STORAGE_USERNAMES_AND_ID));

                return users[userId];
            });
        }
    }]);

    return UserModel;
}();

var userModel = new UserModel();