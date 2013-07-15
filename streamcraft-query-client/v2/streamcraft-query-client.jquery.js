var statsUrl= '/json/stats.json';
var refreshInterval= 15000;

$(function () {
    var $stats= $('#monitoring');

    var fullWidth= 80;
    var calcWidth= function (num, max) {
        var percent= num / (max / 100);
        if (percent > 100) { percent= 100 }
        return Math.round((fullWidth / 100) * percent);
    }

    var renderAlive= function (server) {
        var width= calcWidth(server.stat.numplayers, server.stat.maxplayers);
        return $('<div id="server_monitor_body"/>').append(
            $('<h5/>').html(server.title +'&nbsp;')
        ).append(
            $('<div id="server_monitor_panel" style="width:80px;"/>').append(
                $('<div class="ssp_status_line"/>').css({
                    width: width
                })
            ).append(
                $('<span class="ssp_status_info"/>').html(server.stat.numplayers +' / '+ server.stat.maxplayers)
            )
        );
    }

    var renderError= function (server) {
        return $('<div id="server_monitor_body"/>').append(
            $('<h5/>').html(server.title +'&nbsp;')
        ).append(
            $('<div id="server_monitor_panel" style="width:80px;"/>').append(
                $('<div class="ssp_status_line"/>').css({
                    width: 0
                })
            ).append(
                $('<span class="ssp_status_info"><font color="red" style="margin-left:7px;">Offline</font></span>')
            )
        );
    }

    var renderTotal= function (total) {
        var width= calcWidth(total.numplayers, total.maxplayers);
        return $('<div id="server_monitor_body" style="display:block; margin-top:0;"/>').append(
            $('<h5/>').html('Общий онлайн&nbsp;')
        ).append(
            $('<div id="server_monitor_panel" style="width:80px;"/>').append(
                $('<div class="ssp_status_line"/>').css({
                    width: width
                })
            ).append(
                $('<span class="ssp_status_info"/>').html(total.numplayers +' / '+ total.maxplayers)
            )
        );
    }

    var refresh= function () {
        $.get(statsUrl, function(servers) {
            $stats.empty();

            var total= {
                numplayers: 0,
                maxplayers: 0
            };

            for (var i in servers) {
                if (!servers.hasOwnProperty(i)) return;

                var server= servers[i];
                if (server.title) {
                    if (server.stat) {
                        var stat= server.stat;
                        total.numplayers= total.numplayers + stat.numplayers;
                        total.maxplayers= total.maxplayers + stat.maxplayers;
                        $stats.append(
                            renderAlive(server)
                        )
                    }
                    if (server.error) {
                        $stats.append(
                            renderError(server)
                        )
                    }
                }
            }

            $stats.prepend(
                renderTotal(total)
            );
        });
    }

    refresh();
    setInterval(function () {
        refresh();
    }, refreshInterval)
})