var sfs = require('spamcheck');
var ObjectController;
ObjectController = {
    options: {
    },
    routes: {
        getAllowedIP: {
            method: "GET",
            path: "/ip/#ip"
        }
    },
    actions: {
        getAllowedIP: function (req, res, params) {
            if (res.connection.remoteAddress !== "127.0.0.1") {
                res.statusCode = 403;
                res.end('denied');
                return;
            }

            sfs.checkSpammer({ip: params.ip}, function(err, isSpammer) {
                if (err) console.log(err);
                if (isSpammer) {
                    res.end('spammer');
                    return;
                } else {
                    res.end('allowed');
                }
            });
        }
    },
    helpers: {
    }
};

module.exports = exports = ObjectController;