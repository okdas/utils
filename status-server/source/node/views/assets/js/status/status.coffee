app= angular.module 'app', ['ngResource']



app.factory 'Stats', ($resource) ->
    return $resource '/api/v1/status/stats'


app.factory 'AddServer', ($resource) ->
    newServer= $resource '/api/v1/status/server/add', {},
        create:
            method:'post'
            params:
                title: '@title'
                host: '@host'
                port: '@port'

    return newServer


app.controller 'ServersCtrl', ($scope, Stats, AddServer) ->
    $scope.stats= Stats.query ->
        console.log 'загружено'


    $scope.addServer= ->
        console.log 'okko'

