'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
});
function normal(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("status (DWS Vesselinfo)", [1], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('status (DWS Vesselinfo)=>', 1)
}
function delay(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("status (DWS Vesselinfo)", [2], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('status (DWS Vesselinfo)=>', 2)
}
function cancelled(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("status (DWS Vesselinfo)", [3], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('status (DWS Vesselinfo)=>', 2)
}
function incoming(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Ship direction", [1], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('Ship direction=>', 1)
}
function ports(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Type (Placeinfo)", [5], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('Type (Placeinfo)=>', 1)
}
function warehouse(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Type (Placeinfo)", [3], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('Type (Placeinfo)=>', 1)
}
function factory(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Type (Placeinfo)", [10], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('Type (Placeinfo)=>', 1)
}

