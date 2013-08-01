fs= require 'fs'


config= 'app/servers.json'
output= 'app/stats.json'





exports.renderStatus= (req, res, next) ->
    res.render 'Server/status.jade'


exports.renderServer= (req, res, next) ->
    res.render 'Server/one.jade'








exports.addServer= (req, res, next) ->
    servers= JSON.parse fs.readFileSync config
    servers.push
        title: req.body.title
        host: req.body.host
        port: req.body.port

    # записываем конфиг с новым сервером
    fs.writeFile config, JSON.stringify(servers, null, 4), (err) ->
        return res.send err, 400 if err
        return res.send 200



exports.deleteServer= (req, res, next) ->
    servers= JSON.parse fs.readFileSync config

    servers.map (val, i) ->
        if val.id == (+req.params.serverId)
            # удаляем лишний сервер из конфига
            servers.splice i, 1

            # пишем новый конфиг без удаленного сервера
            fs.writeFile config, JSON.stringify(servers, null, 4), (err) ->
                return res.send err, 400 if err
                return res.send 200

    return res.send 400



exports.getServer= (req, res, next) ->
    res.send 200

