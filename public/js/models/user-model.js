const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
const STORAGE_USERNAMES_AND_ID = 'STORAGE_USERNAMES';
const STORAGE_USERNAME = 'STORAGE_USERNAME';

// function createRequestOptions(user) {
//     let options = {
//         data: {
//             username: user.username,
//             passHash: CryptoJS.SHA1($(user.password).val()).toString()
//         }
//     };

//     return options;
// }

class UserModel {
    register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users';
            // let options = createRequestOptions(user);
            let body = {
                username: user.username,
                passHash: CryptoJS.SHA1($(user.password).val()).toString()
            };

            requester.postJSON(url, body)
                .then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err.responseText)
                });
        });

        return promise;
    }

    login(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users/auth';
            let body = {
                username: user.username,
                passHash: CryptoJS.SHA1($(user.password).val()).toString()
            };

            requester.putJSON(url, body)
                .then(function(res) {
                    localStorage.setItem(STORAGE_AUTH_KEY, res.authKey),
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    resolve(res);
                }, function(err) {
                    reject(err.responseText)
                });
            });
        
        return promise;    
    }

    logout() {
        let promise = new Promise((resolve, reject) => {
            localStorage.removeItem(STORAGE_AUTH_KEY);
            localStorage.removeItem(STORAGE_USERNAME);
            resolve()
        });

        return promise;
    }

    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem(STORAGE_AUTH_KEY);
            });
    }

    getLoggedHeader() {
        return Promise.resolve()
            .then(() => {
                let a = localStorage.getItem(STORAGE_AUTH_KEY);
                return {
                    'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)
                };
            });
    }

    getNickNameByID(userId) {
        return Promise.resolve()
            .then(() => {
                let users = JSON.parse(localStorage.getItem(STORAGE_USERNAMES_AND_ID));
                
                return users[userId];
            });
    }

}

let userModel = new UserModel();