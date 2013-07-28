app= angular.module 'app', ['ngResource']



app.factory 'Stats', ($resource) ->
    return $resource '/api/v1/status/stats'


app.factory 'Server', ($resource) ->
    Server= $resource '/api/v1/status/servers/:serverId', {},
        create:
            method: 'post'

        delete:
            method: 'delete'
            params:
                serverId: '@id'

    return Server





app.controller 'ServersCtrl', ($scope, Stats, Server) ->
    $scope.stats= Stats.query ->
        console.log 'загружено'


    $scope.addServer= ->

        Server.create {
            title: $scope.title
            host: $scope.host
            port: $scope.port
        }, ->
            $scope.stats.push
                title: $scope.title
                host: $scope.host
                port: $scope.port

            $scope.title= ''
            $scope.host= ''
            $scope.port= ''
        , ->
            alert 'Ощибка создания'


    $scope.deleteServer= ->
        $scope.stats.map (val, i) ->
            console.log val.id, $scope.id
            if val.id == $scope.id
                console.log '!!!'
                $scope.stats= $scope.stats.splice --i, 1

        ###
        Server.delete {
            id: $scope.id
        }, ->
            $scope.stats.map (val, i) ->
                if val.id == $scope.id
                    console.log '!!!'
                    $scope.stats= $scope.stats.splice --i, 1
        ###

