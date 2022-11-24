'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['warehouse', 'ports', 'factory','normal','delay','cancelled','incoming']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("Type (Factoryinfo)", [10, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("Type", [1, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("Type (Portinfo)", [5, 'Null'], "replace", {
        isExcludeMode: false
    })
    //未勾选清空
    data.applyFilterAsync("podeta_status", ['Null',1,2,3], "replace", {
        isExcludeMode: false
    })
    //勾选初始化
    data.applyFilterAsync("poletd_status", ['Null',1,2,3], "replace", {
        isExcludeMode: false
    })
    //incoming
    data.applyFilterAsync("Ship_direction",  ['I', 'Null'], "replace", {
        isExcludeMode: false
    })
    console.log('A')
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
       
    }
    data.applyFilterAsync("Ship_direction", filterData, "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("podeta_status", ['Null',1,2,3], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("poletd_status", ['Null',1,2,3], "replace", {
        isExcludeMode: false
    })
    var dataList = ['normal','delay','cancelled']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    console.log('OK','Ship_direction=>', that.checked ? 'I' : 'E')
}

function ports(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [5, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("Type (Portinfo)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('Type (Portinfo)=>', 5)
}

function warehouse(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
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

function factory(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    var filterData
    if (that.checked) {
        filterData = [10, 'Null']
    } else {
        filterData = ['Null']
    }
    data.applyFilterAsync("Type (Factoryinfo)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log('Type (Factoryinfo)=>', 10)
}