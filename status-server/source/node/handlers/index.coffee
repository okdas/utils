module.exports= (app) ->

    Status= require './Status'

    app.get '/', (req, res, next) ->
        res.redirect '/status'

    app.get '/status', Status.status


    app.post '/api/v1/status/server/add', Status.addServer

    app.get '/api/v1/status/stats', Status.checkStats

    app.get '/api/v1/status/start/interval/:interval', Status.startStatus
    app.get '/api/v1/status/stop', Status.stopStatus


