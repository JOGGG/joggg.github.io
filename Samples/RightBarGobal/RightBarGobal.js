tableau.extensions.initializeAsync().then(function () {
    // Initialization succeeded! 
    //Add your JavaScript code here to call the Extensions API
}); 
function getData() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "在货库存明细").getFiltersAsync().then(datasources => {
            console.log(datasources)
        })
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
}); function addFilter() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "在货库存明细")
        data.applyFilterAsync("位置", ["广州枝山仓库"], "replace", { isExcludeMode: false })
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}
 function nihao(){
    var data = tableau.extensions.dashboardContent.dashboard
    data.applyFilterAsync("位置", ["广州枝山仓库"], "replace", { isExcludeMode: false })

 }
