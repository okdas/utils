app= angular.module 'app', ['ngResource']

app.factory 'Server', ($resource) ->
    return $resource '/servers'

app.controller 'ServersCtrl', ($scope, Server) ->
    $scope.servers= Server.query
    ,   () ->
            console.log 'загружено'
    ,   () ->
            console.error 'не загружено'


