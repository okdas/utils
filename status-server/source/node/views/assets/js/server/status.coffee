app= angular.module 'app', ['ngResource'], ($routeProvider) ->
    $routeProvider.when '#/servers/:serverId',
        templateUrl: 'servers/'
        controller: 'GetServersCtrl'





app.factory 'StatusDaemon', ($resource) ->
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





app.filter 'ServerFilter', () ->
    return (servers) ->
        filtered= []
        angular.forEach servers, (server) ->
            if server.id?
                filtered.push server
        return filtered




app.controller 'GetServersCtrl', ($routeParams) ->
    @$routeParams= $routeParams



app.controller 'ServersCtrl', ($scope, StatusDaemon, Server) ->
    $scope.stats= StatusDaemon.query ->
        console.log 'загружено'


    $scope.addServer= ->

        Server.create
            id: $scope.id
            title: $scope.title
            host: $scope.host
            port: $scope.port
        , ->
            $scope.stats.push
                id: $scope.id
                title: $scope.title
                host: $scope.host
                port: $scope.port

            $scope.title= ''
            $scope.host= ''
            $scope.port= ''
        , ->
            alert 'Ошибка создания'


    $scope.deleteServer= (server) ->
        $scope.stats.map (val, i) ->
            if val.id == server.id
                Server.delete
                    serverId: server.id
                , ->
                    $scope.stats.splice i, 1
                , ->
                    alert 'Ошибка удаления'

