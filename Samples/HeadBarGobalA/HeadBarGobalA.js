'use strict';

tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao=>', logicalTables)
            var lgTabel = logicalTables.find(item => {
                return item.caption === '船舶'
            })
            console.log(lgTabel)
            return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        });
    }).then(dataTable => {
        //筛选出船名
        let fieldA = dataTable.columns.find(column => column.fieldName === "Vessel Name");
        var listA = [];
        for (let row of dataTable.data) {
            listA.push(row[fieldA.index].value);
        }
        let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Ship").options.add(new Option('All', 'All'))
        valuesA.forEach(item => {
            //存在筛选项
            if (item) {
                var shipOp = document.getElementById("Ship")
                shipOp.options.add(new Option(item, item))
            }
        })

        //筛选出航线
        let fieldB = dataTable.columns.find(column => column.fieldName === "service (DWS Vesselinfo)");
        let listB = [];
        for (let row of dataTable.data) {
            listB.push(row[fieldB.index].value);
        }
        let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Service").options.add(new Option('All', 'All'))
        valuesB.forEach(item => {
            if (item) {
                var ser = document.getElementById("Service")
                ser.options.add(new Option(item, item))
            }
        })

        //筛选出地区
        let fieldC = dataTable.columns.find(column => column.fieldName === "Region (DWS Vesselinfo)");
        let listC = [];
        for (let row of dataTable.data) {
            listC.push(row[fieldC.index].value);
        }
        let valuesC = listC.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Target").options.add(new Option('All', 'All'))
        valuesC.forEach(item => {
            if (item) {
                var tar = document.getElementById("Target")
                tar.options.add(new Option(item, item))
            }
        })

        //筛选出week
        let fieldD = dataTable.columns.find(column => column.fieldName === "Etd Weeks");
        let listD = [];
        for (let row of dataTable.data) {
            listD.push(row[fieldD.index].value);
        }
        let valuesD = listD.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Week").options.add(new Option('All', 'All'))
        valuesD.sort().forEach(item => {
            if (item) {
                var tar = document.getElementById("Week")
                tar.options.add(new Option(item, item))
            }
        })
        var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
        const markSelection = tableau.TableauEventType.FilterChanged;
        //
        worksheet.addEventListener(markSelection, function (selectionEvent) {
            // When the selection changes, reload the data
            console.log('filterChange=>>>>>>>>>', selectionEvent)
        });
        tarchange({
            value: 'All'
        })
        serchange({
            value: 'All'
        })
        shipchange({
            value: 'All'
        })
        wekchange({
            value: 'All'
        })
        dirchange({
            value: 'All'
        })


    });
});


function tarchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        // tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        //     var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        //     return dataSource.getLogicalTablesAsync().then((logicalTables) => {
        //         console.log('nihao=>', logicalTables)
        //         var lgTabel = logicalTables.find(item => {
        //             return item.caption === '船舶'
        //         })
        //         return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        //     });
        // }).then(dataTable => {
        //     //筛选出地区
        //     let fieldA = dataTable.columns.find(column => column.fieldName === "Region (DWS Vesselinfo)");
        //     var listA = [];
        //     for (let row of dataTable.data) {
        //         listA.push(row[fieldA.index].value);
        //     }
        //     let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        //     valuesA.push('Null')
        //     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
        //     data.applyFilterAsync('Region (DWS Vesselinfo)', valuesA, "replace", {
        //         isExcludeMode: false
        //     })
        //     data.applyFilterAsync('Region (DWS Portshiproute)', valuesA, "replace", {
        //         isExcludeMode: false
        //     })
        //     console.log('Region Region (DWS Portshiproute)', valuesA)
        // });
        data.clearFilterAsync("Region (DWS Portshiproute)")
        data.clearFilterAsync("Region (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("Region (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        data.applyFilterAsync("Region (DWS Portshiproute)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('Region (DWS Portshiproute) Region  change=>', that.value)
    }

}

function serchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        // tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        //     var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        //     return dataSource.getLogicalTablesAsync().then((logicalTables) => {
        //         console.log('nihao=>', logicalTables)
        //         var lgTabel = logicalTables.find(item => {
        //             return item.caption === '船舶'
        //         })
        //         return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        //     });
        // }).then(dataTable => {
        //     //筛选出航线
        //     let fieldA = dataTable.columns.find(column => column.fieldName === "service (DWS Vesselinfo)");
        //     var listA = [];
        //     for (let row of dataTable.data) {
        //         listA.push(row[fieldA.index].value);
        //     }
        //     let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        //     valuesA.push('Null')
        //     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
        //     data.applyFilterAsync('service (DWS Vesselinfo)', valuesA, "replace", {
        //         isExcludeMode: false
        //     })
        //     console.log('service (DWS Vesselinfo)', valuesA)
        // });
        data.clearFilterAsync("service (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("service (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('service change=>', that.value)
    }
}

function shipchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        // tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        //     var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        //     return dataSource.getLogicalTablesAsync().then((logicalTables) => {
        //         console.log('nihao=>', logicalTables)
        //         var lgTabel = logicalTables.find(item => {
        //             return item.caption === '船舶'
        //         })
        //         return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        //     });
        // }).then(dataTable => {
        //     //筛选出船名
        //     let fieldA = dataTable.columns.find(column => column.fieldName === "Vessel Name");
        //     var listA = [];
        //     for (let row of dataTable.data) {
        //         listA.push(row[fieldA.index].value);
        //     }
        //     let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        //     valuesA.push('Null')
        //     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
        //     data.applyFilterAsync('Vessel Name', valuesA, "replace", {
        //         isExcludeMode: false
        //     })
        //     console.log('Vessel Name', valuesA)
        // });
        data.clearFilterAsync("Vessel Name")
    } else {
        data.applyFilterAsync("Vessel Name", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

}

function wekchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        // tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        //     var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        //     return dataSource.getLogicalTablesAsync().then((logicalTables) => {
        //         console.log('nihao=>', logicalTables)
        //         var lgTabel = logicalTables.find(item => {
        //             return item.caption === '船舶'
        //         })
        //         return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        //     });
        // }).then(dataTable => {
        //     //筛选出week
        //     let fieldA = dataTable.columns.find(column => column.fieldName === "Etd Weeks");
        //     var listA = [];
        //     for (let row of dataTable.data) {
        //         listA.push(row[fieldA.index].value);
        //     }
        //     let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        //     valuesA.push('Null')
        //     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
        //     data.applyFilterAsync('Etd Weeks', valuesA, "replace", {
        //         isExcludeMode: false
        //     })
        //     console.log('Etd Weeks', valuesA)
        // });
        data.clearFilterAsync("Etd Weeks")
    } else {
        data.applyFilterAsync("Etd Weeks", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
}

function dirchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.clearFilterAsync("Ship direction")
    } else {
        data.applyFilterAsync("Ship direction", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('Ship direction=>', that.value)
    }

}