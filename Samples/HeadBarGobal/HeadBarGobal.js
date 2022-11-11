'use strict';

tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "宏观航运New3.0");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao=>', logicalTables)
            return dataSource.getLogicalTableDataAsync(logicalTables[3].id)//基础信息表
        });
    }).then(dataTable => {
        //筛选出地区
        let field = dataTable.columns.find(column => column.fieldName === "Sup Area");
        let list = [];
        for (let row of dataTable.data) {
            list.push(row[field.index].value);
        }
        let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
        values.forEach(item => {
            if (item) {
                var tar = document.getElementById("Target")
                tar.options.add(new Option(item), item)
            }
        })
    });

    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "宏观航运New3.0");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao=>', logicalTables)
            return dataSource.getLogicalTableDataAsync(logicalTables[2].id)//航线表
        });
    }).then(dataTable => {
        //筛选出船名
        let fieldA = dataTable.columns.find(column => column.fieldName === "Vessel Name");
        let listA = [];
        for (let row of dataTable.data) {
            listA.push(row[fieldA.index].value);
        }
        let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        valuesA.forEach(item => {
            if (item) {
                var shipOp = document.getElementById("Ship")
                shipOp.options.add(new Option(item), item)
            }
        })

        //筛选出航线
        let fieldB = dataTable.columns.find(column => column.fieldName === "service (DWS Vesselinfo)");
        let listB = [];
        for (let row of dataTable.data) {
            listB.push(row[fieldB.index].value);
        }
        let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
        valuesB.forEach(item => {
            if (item) {
                var ser = document.getElementById("Service")
                ser.options.add(new Option(item), item)
            }
        })
    });
});
function tarchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Sup Area", [that.value], "replace", { isExcludeMode: false })
    console.log('area change=>', that.value)
}
function serchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("service (DWS Vesselinfo)", [that.value], "replace", { isExcludeMode: false })
    console.log('service change=>', that.value)
}
function shipchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
    data.applyFilterAsync("Vessel Name", [that.value], "replace", { isExcludeMode: false })
    console.log('ship change=>', that.value)
}
