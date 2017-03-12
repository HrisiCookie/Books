'use strict';

var templates = function () {

    var handlebars = window.handlebars || window.Handlebars;

    function get(name) {
        var promise = new Promise(function (resolve, reject) {
            var url = 'templates/' + name + '.handlebars';
            $.get(url, function (html) {
                var template = handlebars.compile(html);
                resolve(template);
            });
        });

        return promise;
    }

    return {
        get: get
    };
}();

// class Templater{
//      get(name) {
//         let url = `./templates/${name}.handlebars`;
//         var promise = new Promise((resolve, reject) => {
//             $.get(url, (html) => {
//                 let template = handlebars.compile(html);
//                 resolve(template);
//             });
//         });

//         return promise;
//     }

// }

// let templater = new Templater();