module.exports= (app) ->

    Status= require './Status'

    app.get '/', (req, res, next) ->
        res.redirect '/status'

    app.get '/status', Status.servers

    app.get '/status/check', Status.checkStatus

    app.get '/status/start/interval/:interval', Status.startStatus
    app.get '/status/stop', Status.stopStatus


