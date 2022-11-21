tableau.extensions.initializeAsync().then(function () {
    var timeDate = new Date().toLocaleDateString()
    document.getElementById('timeA').innerHTML ='Up to date:'+ timeDate.replace(/\//g, '-')

}); 


