/// <reference path="./node_modules/DefinitelyTyped/node/node.d.ts"/>
var fs = require("fs");
var https = require("https");
var json = fs.readFileSync("data.json");
var data = JSON.parse(json.toString());
var link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=50.029057%2C15.769672&radius=100&key=AIzaSyA6UQD4OfUFEHqFnk7c3jM-3t9HPpuxkKA";
var _link = link;
var doResquest = function () {
    https.get(_link, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var json = JSON.parse(body);
            json.results.forEach(function (row) {
                console.log(row.name);
            });
            if (json.next_page_token) {
                _link = link + "&pagetoken=" + json.next_page_token;
                doResquest();
            }
        });
    });
};
doResquest();
//# sourceMappingURL=app.js.map