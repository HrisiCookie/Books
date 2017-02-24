const STORAGE_AUTH_KEY = 'STORAGE_AUTHENTICATION_KEY';
const STORAGE_USERNAMES_AND_ID = 'STORAGE_USERNAMES';
const STORAGE_USERNAME = 'STORAGE_USERNAME';

function createRequestOptions(user) {
    let options = {
        data: {
            username: user.username,
            passHash: CryptoJS.SHA1($(user.password).val()).toString()
        }
    };
    
    return options;
}

class UserModel {
    register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = 'api/users';
            let options = createRequestOptions(user);

            requester.postJSON(url, body, options)
                .then(function(res) {
                    resolve(res);
                }, function(err) {
                    reject(err.responseText)
                });
        });

        return promise;
    }
}

let userModel = new UserModel();