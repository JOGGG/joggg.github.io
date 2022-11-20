'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['warehouse', 'ports', 'factory']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("类型 (海外工厂)", [10, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("类型", [1, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("类型 (港口)", [5, 'Null'], "replace", {
        isExcludeMode: false
    })
    //未勾选清空
    data.applyFilterAsync("podeta_status", ['Null'], "replace", {
        isExcludeMode: false
    })
    //勾选清空
    data.applyFilterAsync("poletd_status", ['Null'], "replace", {
        isExcludeMode: false
    })
    //incoming
    data.applyFilterAsync("Ship_direction",  ['E', 'Null'], "replace", {
        isExcludeMode: false
    })
});

function normal(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var incoming = document.getElementById('incoming').checked
    if (that.checked ) {
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", ['Null', 1], "add", {
            isExcludeMode: false
        })
        console.log('podeta_status=>', ['Null', 1], that.checked, incoming)
    } else{
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", [1], "remove", {
            isExcludeMode: false
        })
    }
}

function delay(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var incoming = document.getElementById('incoming').checked
    if (that.checked ) {
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", ['Null', 2], "add", {
            isExcludeMode: false
        })
        console.log('podeta_status=>', ['Null', 2], that.checked, incoming)
    } else{
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", [2], "remove", {
            isExcludeMode: false
        })
    }
}

function cancelled(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var incoming = document.getElementById('incoming').checked
    if (that.checked ) {
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", ['Null', 3], "add", {
            isExcludeMode: false
        })
        console.log('podeta_status=>', ['Null', 3], that.checked, incoming)
    } else{
        data.applyFilterAsync(incoming?"poletd_status":"podeta_status", [3], "remove", {
            isExcludeMode: false
        })
    }
}

function incoming(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = ['I', 'Null']
        data.applyFilterAsync("poletd_status", [1], document.getElementById('normal').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("poletd_status", [2], document.getElementById('delay').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("poletd_status", [3], document.getElementById('cancelled').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("podeta_status", ['Null'], "replace", {
            isExcludeMode: false
        })
    } else {
        filterData = ['E', 'Null']
        data.applyFilterAsync("podeta_status", [1], document.getElementById('normal').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("podeta_status", [2], document.getElementById('delay').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("podeta_status", [3], document.getElementById('cancelled').checked ? "add" : "remove", {
            isExcludeMode: false
        })
        data.applyFilterAsync("poletd_status", ['Null'], "replace", {
            isExcludeMode: false
        })
    }
    data.applyFilterAsync("Ship_direction", filterData, "replace", {
        isExcludeMode: false
    })

    console.log('Ship_direction=>', that.checked ? 'I' : 'E')
}

function ports(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [5, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("类型 (港口)", filterData, "replace", {
        isExcludeMode: false
    })
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
    data.applyFilterAsync("类型", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('类型=>', 1)
}

function factory(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [10, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("类型 (海外工厂)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('类型 (海外工厂)=>', 10)
}