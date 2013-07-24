var http= require('http'),
    fs= require('fs'),
    async= require('async'),
    mcquery= require('mcquery'),

    App = module.exports = require('express'),

    cfg= require('./package.json').config;


var app= App();


app.configure(function() {
    app.use(App.compress());

    app.use(App.static(__dirname + '/views/assets'));
    app.set('views', __dirname + '/views/pages');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });

    app.use(App.bodyParser());
    app.use(App.cookieParser());
    app.use(App.methodOverride());

    app.use(App.session({
        secret: cfg.auth.secret
    }));
    app.locals.title = 'QueryServer';
});

app.configure('development', function() {
    app.use(App.logger('tiny'));
    app.use(App.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

port= cfg.port;

server= http.createServer(app);

server.listen(port, function() {
    console.log('Listening on ' + port);
});









var minecraftStatus= function() {
    var servers= require('./servers.json');

    async.map(servers,
        function(server, cb) {
            var output= {}

            output.title= server.title

            var query = new mcquery(server.host, server.port)
            query.connect(function(err) {
                if (err) {
                    output.error= err.error
                    return cb(null, output)
                }

                query.basic_stat(function(err, stat) {
                    if (err) {
                        output.error= err.error
                    } else {
                        output.stat= {
                            numplayers: stat.numplayers,
                            maxplayers: stat.maxplayers
                        }
                    }
                    cb(null, output)
                })
            })
        },
        function(err, result) {
            fs.writeFile(cfg.output, JSON.stringify(result, null, 4), function (err) {
                if (err) return console.log(err)
            })
        }
    )
}

setInterval(minecraftStatus, cfg.interval * 1000)



app.get('/', function(req, res, next) {
    res.send(200)
})




