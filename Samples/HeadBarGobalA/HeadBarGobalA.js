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
        let listA = [];
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
        let values = listC.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("Target").options.add(new Option('All'), 'All')
        values.forEach(item => {
            if (item) {
                var tar = document.getElementById("Target")
                tar.options.add(new Option(item), item)
            }
        })
       
    });
    shipchange({value:'All'})
    serchange({value:'All'})
    tarchange({value:'All'})
});


function tarchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.applyFilterAsync("Region", ['Null'], "replace", { isExcludeMode: false })
        console.log('Region change=>', 'Null')
    } else {
        data.applyFilterAsync("Region", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('Region change=>', that.value)
    }

}
function serchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.applyFilterAsync("service", ['Null'], "replace", { isExcludeMode: false })
        console.log('service change=>', 'Null')
    } else {
        data.applyFilterAsync("service", [that.value, 'Null'], "replace", { isExcludeMode: false })
        console.log('service change=>', that.value)
    }
}

function shipchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if(that.value==='All'){
        data.applyFilterAsync("Vessel（船名）", [ 'Null'], "replace", { isExcludeMode: false })
        console.log('ship change=>', 'Null')
    }else{
        data.applyFilterAsync("Vessel（船名）", [that.value, 'Null'], "replace", { isExcludeMode: false })
    console.log('ship change=>', that.value)
    }
    
}

