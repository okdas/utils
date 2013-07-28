fs= require 'fs'


Status= require 'streamcraft-status'

config= 'app/servers.json'
output= 'app/stats.json'





exports.status= (req, res, next) ->
    res.render 'Status/status.jade'



exports.checkStats= (req, res, next) ->
    if not fs.existsSync output

        Status.check config, output, (out) ->
            return res.json out if out
            res.send 400

    else

        res.json JSON.parse fs.readFileSync output



exports.startStatus= (req, res, next) ->
    if do Status.isWorking
        return res.send 'is working', 400

    Status.start config, output, req.params.interval
    res.send 200



exports.stopStatus= (req, res, next) ->
    if not do Status.isWorking
        return res.send 'is not working', 400

    do Status.stop
    res.send 200





exports.addServer= (req, res, next) ->
    servers= JSON.parse fs.readFileSync config
    servers.push
        title: req.body.title
        host: req.body.host
        port: req.body.port

    fs.writeFile config, JSON.stringify(servers, null, 4), (err) ->
        return res.send err, 400 if err
        return res.send 200



exports.deleteServer= (req, res, next) ->
    res.send req.body

