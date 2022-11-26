'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['warehouse', 'ports', 'factory', 'normal', 'delay', 'cancelled']
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
    //初始化
    data.applyFilterAsync("status (View vesseldetail)", ['Null', 1, 2, 3], "replace", {
        isExcludeMode: false
    })
    // //勾选初始化
    // data.applyFilterAsync("Poletd Status", ['Null', 1, 2, 3], "replace", {
    //     isExcludeMode: false
    // })
    var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    const markSelection = tableau.TableauEventType.FilterChanged;
    //监听筛选器
    worksheet.addEventListener(markSelection, function (selectionEvent) {
        // When the selection changes, reload the data
        console.log('filterChange=>>>>>>>>>', selectionEvent)
        if (selectionEvent.fieldName === "Ship direction") {
            var dataList = ['normal', 'delay', 'cancelled']
            dataList.forEach(item => {
                document.getElementById(item).checked = true
            })
            normal({
                checked: true
            })
            delay({
                checked: true
            })
            cancelled({
                checked: true
            })
        }
    });
});

function normal(that) {
    //勾选项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.applyFilterAsync("status (View vesseldetail)", that.checked ? ['Null', 1] : [1], that.checked ? "add" : "remove", {
        isExcludeMode: false
    })
}

function delay(that) {
    //勾选项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.applyFilterAsync("status (View vesseldetail)", that.checked ? ['Null', 2] : [2], that.checked ? "add" : "remove", {
        isExcludeMode: false
    })
}

function cancelled(that) {
    //勾选项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.applyFilterAsync("status (View vesseldetail)", that.checked ? ['Null', 3] : [3], that.checked ? "add" : "remove", {
        isExcludeMode: false
    })
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
    //勾选项添加筛选器
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
// function normal(that) {
//     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

//     data.getFiltersAsync().then(res => {
//         var direction = res.find(item => {
//             return item.fieldName == 'Ship direction'
//         })
//         console.log(direction)
//         var List = []
//         direction.appliedValues.forEach(item => {
//             List.push(item.value)
//         })
//         if (direction.isAllSelected) {

//             if (that.checked) {
//                 data.applyFilterAsync("Poletd Status", ['Null', 1], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", ['Null', 1], "add", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Poletd Status", [1], "remove", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", [1], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('E') !== -1) {

//             if (that.checked) {

//                 data.applyFilterAsync("Podeta Status", ['Null', 1], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Poletd Status", [1], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Podeta Status", [1], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('I') !== -1) {

//             if (that.checked) {

//                 data.applyFilterAsync("Poletd Status", ['Null', 1], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", [1], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Poletd Status", [1], "remove", {
//                     isExcludeMode: false
//                 })

//             }
//         }
//     })


// }
// function delay(that) {
//     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

//     data.getFiltersAsync().then(res => {
//         var direction = res.find(item => {
//             return item.fieldName == 'Ship direction'
//         })
//         console.log(direction)
//         var List = []
//         direction.appliedValues.forEach(item => {
//             List.push(item.value)
//         })

//         if (direction.isAllSelected) {

//             if (that.checked) {

//                 data.applyFilterAsync("Poletd Status", ['Null', 2], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", ['Null', 2], "add", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Poletd Status", [2], "remove", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", [2], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('E') !== -1) {

//             if (that.checked) {

//                 data.applyFilterAsync("Podeta Status", ['Null', 2], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Poletd Status",  [1], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Podeta Status",  [2], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('I') !== -1) {

//             if (that.checked) {

//                 data.applyFilterAsync("Poletd Status", ['Null', 2], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status",  [2], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Poletd Status",  [2], "remove", {
//                     isExcludeMode: false
//                 })

//             }
//         }
//     })
// }
// function cancelled(that) {
//     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

//     data.getFiltersAsync().then(res => {
//         var direction = res.find(item => {
//             return item.fieldName == 'Ship direction'
//         })
//         console.log(direction)
//         var List = []
//         direction.appliedValues.forEach(item => {
//             List.push(item.value)
//         })

//         if (direction.isAllSelected) {

//             if (that.checked) {

//                 data.applyFilterAsync("Poletd Status", ['Null', 3], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", ['Null', 3], "add", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Poletd Status", [3], "remove", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status", [3], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('E') !== -1) {
//             if (that.checked) {

//                 data.applyFilterAsync("Podeta Status", ['Null', 3], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Poletd Status",  [3], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {

//                 data.applyFilterAsync("Podeta Status", [3], "remove", {
//                     isExcludeMode: false
//                 })
//             }
//         } else if (List.indexOf('I') !== -1) {
//             if (that.checked) {
//                 data.applyFilterAsync("Poletd Status", ['Null', 3], "add", {
//                     isExcludeMode: false
//                 })
//                 data.applyFilterAsync("Podeta Status",  [3], "remove", {
//                     isExcludeMode: false
//                 })
//             } else {
//                 data.applyFilterAsync("Poletd Status", [3], "remove", {
//                     isExcludeMode: false
//                 })

//             }
//         }
//     })
// }