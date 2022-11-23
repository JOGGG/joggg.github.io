'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['alinCheck', 'lcCheck', 'warCheck', 'supCheck']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    data.applyFilterAsync("Type", [1, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Lcenter)", [2, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Ex-warehouse)", [3, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("type (Suppliers)", [4, 'Null'], "replace", {
        isExcludeMode: false
    })

});

function alinCheck(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    var filterData
    if (that.checked) {
        filterData = [1, 'Null']
    } else {
        filterData = ['Null']
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
        filterData = [2, 'Null']
    } else {
        filterData = ['Null']
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
        filterData = [3, 'Null']
    } else {
        filterData = ['Null']
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
        filterData = [4, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("type (Suppliers)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('type (Suppliers)=>', 4)
}