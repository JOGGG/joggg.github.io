'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList =['warehouse','ports','factory']
    dataList.forEach(item=>{
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("类型 (海外工厂)", [10, 'Null'],  "add", { isExcludeMode: false })
    data.applyFilterAsync("类型", [1, 'Null'], "add", { isExcludeMode: false })
    data.applyFilterAsync("类型 (港口)", [5, 'Null'], "add", { isExcludeMode: false })

});
function normal(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [1, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("poleta_status", filterData, "add" , { isExcludeMode: false })
    console.log('poleta_status=>', 1)
}
function delay(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [2, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("poleta_status", filterData,"add", { isExcludeMode: false })
    console.log('poleta_status=>', 2)
}
function cancelled(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [3, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("poleta_status", filterData, "add", { isExcludeMode: false })
    console.log('poleta_status=>', 3)
}
function incoming(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = ['E', 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("Ship_direction", filterData, "add", { isExcludeMode: false })
    console.log('Ship_direction=>', 'E')
}
function ports(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [5, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("类型 (港口)", filterData, "add", { isExcludeMode: false })
    console.log('类型 (港口)=>', 5)
}
function warehouse(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [1, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("类型", filterData, "add", { isExcludeMode: false })
    console.log('类型=>',1)
}
function factory(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [10, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("类型 (海外工厂)", filterData,  "add", { isExcludeMode: false })
    console.log('类型 (海外工厂)=>', 10)
}

