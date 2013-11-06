var api = require("simple-api");

var v0 = new api({
    prefix: ["api", "v0"],
    port: 8080,
    host: "0.0.0.0",
    fallback: function(req, res) {
        res.end("Error: wrong hole.");
        console.log("Fallback Hit");
    },
    host: "localhost",
    logLevel: 4
});

var CheckIPController = v0.Controller("checkip", require(__dirname + "/controllers/checkip.js"));

if(typeof(module.exports !== "undefined") || typeof(exports) !== "undefined") {
    module.exports = exports = v0;
}