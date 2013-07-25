Status= require 'streamcraft-status'
stat= {}

exports.servers= (req, res, next) ->
    stat= new Status
        config: 'app/servers.json'
        output: 'app/status.json'

    stat.start(2)
    setTimeout(
        () ->
            stat.stop()
        7500)
    res.send 200

