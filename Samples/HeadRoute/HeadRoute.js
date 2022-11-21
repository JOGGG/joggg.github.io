'use strict';

tableau.extensions.initializeAsync().then(function () {
    var timeDate = new Date().toLocaleDateString()
    var list = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
    var hour = new Date().getHours()
    var data = '00'
    if (hour < 2 || hour > 22) {
        data = '00'
    } else {
        var i = 0
        while (hour >= list[i]) {
            i++;
        }
        data = list[i - 1]
    }
    document.getElementById('timeA').innerHTML = 'Up to date:' + timeDate.replace(/\//g, '-') +' '+`${data}:00:00`   
});
function goChina(){
    window.parent.frames.location.href="https://10.192.112.83/#/views/KPI3_0/sheet6_1"
}




