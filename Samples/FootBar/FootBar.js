'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['alinCheck', 'lcCheck', 'warCheck','supCheck']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    data.applyFilterAsync("Type", [1], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Lcenter)", [2], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Ex-warehouse)", [3], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Suppliers)", [4], "replace", {
        isExcludeMode: false
    })

});
function alinCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    var filterData
    if (that.checked) {
        filterData = [1]
    } else {
        filterData = []
    }
    data.applyFilterAsync("Type", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('Type=>', 1)
}
function lcCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    var filterData
    if (that.checked) {
        filterData = [2]
    } else {
        filterData = []
    }
    data.applyFilterAsync("type (Lcenter)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('type (Lcenter)=>', 2)
}
function warCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    var filterData
    if (that.checked) {
        filterData = [3]
    } else {
        filterData = []
    }
    data.applyFilterAsync("type (Ex-warehouse)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('type (Ex-warehouse)=>', 3)
}
function supCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    var filterData
    if (that.checked) {
        filterData = [4]
    } else {
        filterData = []
    }
    data.applyFilterAsync("type (Suppliers)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('type (Suppliers)=>', 4)
}