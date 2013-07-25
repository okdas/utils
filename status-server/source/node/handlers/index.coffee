module.exports= (app) ->

    Status= require './Status'

    app.get '/', (req, res, next) ->
        res.redirect '/status'

    app.get '/status', Status.servers

