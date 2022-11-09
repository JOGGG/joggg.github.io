'use strict';

tableau.extensions.initializeAsync().then(function () {
    // Initialization succeeded! 
    //Add your JavaScript code here to call the Extensions API
}); function initialize() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
                console.log(datasources)
            }).then(dataTable => {
                // process the dataTable...
            });

        // var map = dashboard.getDashboardObjectById(3)

        // document.getElementById("headTitle").innerHTML = "I'm running in a dashboard named <strong>" + dashboard.name + "</strong>";
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}
