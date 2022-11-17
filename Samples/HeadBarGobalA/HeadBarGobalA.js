'use strict';

tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao=>', logicalTables)
            return dataSource.getLogicalTableDataAsync(logicalTables[6].id)//船舶表
        });
    }).then(dataTable => {
        console.log('dataTable=>', dataTable.columns)
        //筛选出船名
        let fieldA = dataTable.columns.find(column => column.fieldName === "Vessel（船名）");
        var listA = [];
        for (let row of dataTable.data) {
            listA.push(row[fieldA.index].value);
        }
        let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Ship").options.add(new Option('All'), 'All')
        valuesA.forEach(item => {
            //存在筛选项
            if (item) {
                var shipOp = document.getElementById("Ship")
                shipOp.options.add(new Option(item), item)
            }
        })

        //筛选出航线
        let fieldB = dataTable.columns.find(column => column.fieldName === "service");
        let listB = [];
        for (let row of dataTable.data) {
            listB.push(row[fieldB.index].value);
        }
        let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Service").options.add(new Option('All'), 'All')
        valuesB.forEach(item => {
            if (item) {
                var ser = document.getElementById("Service")
                ser.options.add(new Option(item), item)
            }
        })

        //筛选出地区
        let fieldC = dataTable.columns.find(column => column.fieldName === "Region");
        let listC = [];
        for (let row of dataTable.data) {
            listC.push(row[fieldC.index].value);
        }
        let valuesC = listC.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Target").options.add(new Option('All'), 'All')
        valuesC.forEach(item => {
            if (item) {
                var tar = document.getElementById("Target")
                tar.options.add(new Option(item), item)
            }
        })

         //筛选出week
         let fieldD = dataTable.columns.find(column => column.fieldName === "etd_weeks");
         let listD = [];
         for (let row of dataTable.data) {
             listD.push(row[fieldD.index].value);
         }
         let valuesD = listD.filter((el, i, arr) => arr.indexOf(el) === i);
         document.getElementById("Week").options.add(new Option('All'), 'All')
         valuesD.forEach(item => {
             if (item) {
                 var tar = document.getElementById("Week")
                 tar.options.add(new Option(item), item)
             }
         })
        tarchange({value:'All'})
        serchange({value:'All'})
        shipchange({value:'All'})
        wekchange({value:'All'})
    });
});


function tarchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                return dataSource.getLogicalTableDataAsync(logicalTables[6].id)//船舶表
            });
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选出地区
            let fieldA = dataTable.columns.find(column => column.fieldName === "Region");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
            data.applyFilterAsync('Region', valuesA, "replace", { isExcludeMode: false })
            console.log('Region', valuesA)
        });
    } else {
        data.applyFilterAsync("Region", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('Region change=>', that.value)
    }

}
function serchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                return dataSource.getLogicalTableDataAsync(logicalTables[6].id)//船舶表
            });
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选出航线
            let fieldA = dataTable.columns.find(column => column.fieldName === "service");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
            data.applyFilterAsync('service', valuesA, "replace", { isExcludeMode: false })
            console.log('service', valuesA)
        });
    } else {
        data.applyFilterAsync("service", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('service change=>', that.value)
    }
}

function shipchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                return dataSource.getLogicalTableDataAsync(logicalTables[6].id)//船舶表
            });
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选出船名
            let fieldA = dataTable.columns.find(column => column.fieldName === "Vessel（船名）");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
            data.applyFilterAsync('Vessel（船名）', valuesA, "replace", { isExcludeMode: false })
            console.log('Vessel（船名）', valuesA)
        });
    } else {
        data.applyFilterAsync("Vessel（船名）", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('ship change=>', that.value)
    }

}
function wekchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                return dataSource.getLogicalTableDataAsync(logicalTables[6].id)//船舶表
            });
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选出week
            let fieldA = dataTable.columns.find(column => column.fieldName === "etd_weeks");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
            data.applyFilterAsync('etd_weeks', valuesA, "replace", { isExcludeMode: false })
            console.log('etd_weeks', valuesA)
        });
    } else {
        data.applyFilterAsync("etd_weeks", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('ship change=>', that.value)
    }

}


