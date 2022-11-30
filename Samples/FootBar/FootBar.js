'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['alinCheck', 'lcCheck', 'warCheck','supCheck']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [1, 2, 3,4, 'Null'], "replace", {
        isExcludeMode: false
    })
});

function alinCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [1], that.checked?"add":"remove", {
        isExcludeMode: false
    })
}

function lcCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [2], that.checked?"add":"remove", {
        isExcludeMode: false
    })
}

function warCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [3], that.checked?"add":"remove", {
        isExcludeMode: false
    })
}

function supCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [4], that.checked?"add":"remove", {
        isExcludeMode: false
    })
}

function spaCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    data.applyFilterAsync("Type", [7], that.checked?"add":"remove", {
        isExcludeMode: false
    })
}