'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
});
function normal(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("poleta_status", [1,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('poleta_status=>', 1)
}
function delay(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("poleta_status", [2,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('poleta_status=>', 2)
}
function cancelled(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("poleta_status", [3,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('poleta_status=>', 2)
}
function incoming(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("Ship_direction", ['E','Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('Ship_direction=>', 'E')
}
function ports(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("类型 (港口)", [5,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('类型 (港口)=>', 5)
}
function warehouse(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("类型", [3,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('类型=>', 3)
}
function factory(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("类型 (海外工厂)", [10,'Null'], that.checked ? "add" : "remove", { isExcludeMode: false })
    console.log('类型 (海外工厂)=>', 10)
}

