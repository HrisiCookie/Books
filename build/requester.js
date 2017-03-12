"use strict";

var requester = {
    get: function get(url) {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: "GET",
                success: function success(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    },
    putJSON: function putJSON(url, body) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var promise = new Promise(function (resolve, reject) {
            var headers = options.headers || {};
            $.ajax({
                url: url,
                headers: headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success: function success(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    },
    postJSON: function postJSON(url, body) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var promise = new Promise(function (resolve, reject) {
            var headers = options.headers || {};
            $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success: function success(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    },
    getJSON: function getJSON(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var promise = new Promise(function (resolve, reject) {
            var headers = options.headers || {};
            $.ajax({
                url: url,
                headers: headers,
                method: "GET",
                contentType: "application/json",
                success: function success(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }
};