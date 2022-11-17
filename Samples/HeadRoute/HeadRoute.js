'use strict';

tableau.extensions.initializeAsync().then(function () {
    var timeDate = new Date().toLocaleDateString()
    document.getElementById('timeA').innerHTML ='Up to date:'+ timeDate.replace(/\//g, '-')
   
});
function goChina(){
    window.parent.frames.location.href="https://10.192.112.83/#/views/KPI3_0/sheet6_1"
}




