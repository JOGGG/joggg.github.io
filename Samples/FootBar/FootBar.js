'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['alinCheck', 'lcCheck', 'warCheck']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // data.applyFilterAsync("Type", [1, 'Null'], "replace", {
    //     isExcludeMode: false
    // })
    // data.applyFilterAsync("type (Lcenterinfo)", [2, 'Null'], "replace", {
    //     isExcludeMode: false
    // })
    // data.applyFilterAsync("type (Ex warehouseinfo)", [3, 'Null'], "replace", {
    //     isExcludeMode: false
    // })
});

function alinCheck(that) {
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // var filterData
    // if (that.checked) {
    //     filterData = [1, 'Null']
    // } else {
    //     filterData = ['Null']
    // }
    // data.applyFilterAsync("Type", filterData, "replace", {
    //     isExcludeMode: false
    // })
    // console.log('Type=>', 1)
}

function lcCheck(that) {
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // var filterData
    // if (that.checked) {
    //     filterData = [2, 'Null']
    // } else {
    //     filterData = ['Null']
    // }
    // data.applyFilterAsync("type (Lcenterinfo)", filterData, "replace", {
    //     isExcludeMode: false
    // })
    // console.log('type (Lcenterinfo)=>', 2)
}

function warCheck(that) {
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // var filterData
    // if (that.checked) {
    //     filterData = [3, 'Null']
    // } else {
    //     filterData = ['Null']
    // }
    // data.applyFilterAsync("type (Ex warehouseinfo)", filterData, "replace", {
    //     isExcludeMode: false
    // })
    // console.log('type (Ex warehouseinfo)=>', 3)
}

function supCheck(that) {
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // var filterData
    // if (that.checked) {
    //     filterData = [4, 'Null']
    // } else {
    //     filterData = ['Null']
    // }
    // data.applyFilterAsync("Type (Suppliersinfo)", filterData, "replace", {
    //     isExcludeMode: false
    // })
    // console.log('Type (Suppliersinfo)=>', 4)
}

function spaCheck(that) {
    // console.log('spaCheck')
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    // var filterData
    // if (that.checked) {
    //     filterData = [1, 'Null']
    // } else {
    //     filterData = [0, 'Null']
    // }
    // data.applyFilterAsync("Status (Suppliersinfo)", filterData, "replace", {
    //     isExcludeMode: false
    // })
    // console.log('Status (Suppliersinfo)=>')
}