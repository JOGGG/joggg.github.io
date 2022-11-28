'use strict';

tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao=>', logicalTables)
            var lgTabel = logicalTables.find(item => {
                return item.caption === 'View_vesseldetail'
            })
            console.log(lgTabel)
            return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        });
    }).then(dataTable => {
        //筛选出船名
        let fieldA = dataTable.columns.find(column => column.fieldName === "Vesselname");
        var listA = [];
        for (let row of dataTable.data) {
            listA.push(row[fieldA.index].value);
        }
        let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        // document.getElementById("Ship").options.add(new Option('All', 'All'))
        addDataList('All', 'Ship')
       
        valuesA.forEach(item => {
            //存在筛选项
            if (item) {
                addDataList(item, 'Ship')
                // var shipOp = document.getElementById("Ship")
                // shipOp.options.add(new Option(item, item))
            }
        })
        document.getElementById('ShipInput').setAttribute("placeholder","All")
        // confirmDaraList('All', 'ShipInput')

        //筛选出航线
        let fieldB = dataTable.columns.find(column => column.fieldName === "Service");
        let listB = [];
        for (let row of dataTable.data) {
            listB.push(row[fieldB.index].value);
        }
        let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
        // document.getElementById("Service").options.add(new Option('All', 'All'))
        addDataList('All', 'Service')
        valuesB.sort().forEach(item => {
            if (item) {
                addDataList(item, 'Service')
                // var ser = document.getElementById("Service")
                // ser.options.add(new Option(item, item))
            }
        })
        // confirmDaraList('All', 'SerInput')
        document.getElementById('SerInput').setAttribute("placeholder","All")

        //筛选出地区
        let fieldC = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
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
        let fieldD = dataTable.columns.find(column => column.fieldName === "etd_weeks (View_vesseldetail)");
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
        let d1 = new Date()
        let d2 = new Date()
        d2.setMonth(0)
        d2.setDate(1)
        let rq = d1 - d2
        let s1 = Math.ceil(rq / (24 * 60 * 60 * 1000))
        let s2 = Math.ceil(s1 / 7)
        console.log('第' + s1 + '天,第' + s2 + '周')
        var fullYear = d1.getFullYear()
        var year = `${fullYear}`.slice(-2)+s2
        if(valuesD.indexOf(year) !== -1){
            var wekOp = document.getElementById("Week")
            for (let i = 0; i < wekOp.length; i++) {
                if (wekOp[i].value === year) {
                    wekOp[i].selected = true
                }
            }
            wekchange({
                value: year
            })
        }else{
            wekchange({
                value: 'All'
            })
        }
       
    });
});


function tarchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
            });
        }).then(dataTable => {
            //筛选出地区
            let fieldA = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
            data.applyFilterAsync('Region (View_vesseldetail)', valuesA, "replace", {
                isExcludeMode: false
            })
            data.applyFilterAsync('Region (DWS Portshiproute)', valuesA, "replace", {
                isExcludeMode: false
            })
            console.log('Region Region (DWS Portshiproute)', valuesA)
        });
        data.getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            //筛选出船名
            let fieldA = dataTable.columns.find(column => column.fieldName === "Vesselname");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            // console.log(valuesA,'VesselnameVesselnameVesselnameVesselnamev')
            // document.getElementById("Ship").options.length = 0
            // document.getElementById("Ship").options.add(new Option('All', 'All'))
            clearDataList('Ship')
            addDataList('All', 'Ship')
            valuesA.forEach(item => {
                //存在筛选项
                if (item) {
                    // var shipOp = document.getElementById("Ship")
                    // shipOp.options.add(new Option(item, item))
                    addDataList(item, 'Ship')
                }
            })
            data.applyFilterAsync('Vesselname', [...valuesA,'Null'], "replace", {
                isExcludeMode: false
            })
            // confirmDaraList('All', 'ShipInput')
            document.getElementById('ShipInput').value = ''

            //筛选出航线
            let fieldB = dataTable.columns.find(column => column.fieldName === "Service");
            let listB = [];
            for (let row of dataTable.data) {
                listB.push(row[fieldB.index].value);
            }
            let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            clearDataList('Service')
            addDataList('All', 'Service')

            // document.getElementById("Service").options.length = 0
            // document.getElementById("Service").options.add(new Option('All', 'All'))
            valuesB.sort().forEach(item => {
                if (item) {
                    // var ser = document.getElementById("Service")
                    // ser.options.add(new Option(item, item))
                    addDataList(item, 'Service')
                }
            })
            data.applyFilterAsync('Service', [...valuesB,'Null'], "replace", {
                isExcludeMode: false
            })
            // confirmDaraList('All', 'SerInput')
            document.getElementById('SerInput').value = ''


        })
    } else {
        data.applyFilterAsync("Region (View_vesseldetail)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        data.applyFilterAsync("Region (DWS Portshiproute)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('Region (DWS Portshiproute) Region  change=>', that.value)
        //级联
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            //→航线级联
            let alin = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
            let alinB = dataTable.columns.find(column => column.fieldName === "Service");
            let newAA = dataTable.data.filter(item => {
                return (item[alin.index].value == that.value)
            })

            var dataList = []
            newAA.forEach(item => {
                let newData = [item[alinB.index].value]
                dataList = [...dataList, ...newData]
            })
            let newnewList = [...new Set(dataList)]
            console.log(newnewList)
            clearDataList('Service')
            addDataList('All', 'Service')
            // var serOp = document.getElementById("Service")
            // serOp.options.length = 0
            // document.getElementById("Service").options.add(new Option('All', 'All'))
            newnewList.sort().forEach(item => {
                //存在筛选项
                addDataList(item, 'Service')
                // serOp.options.add(new Option(item, item))
            })
            // confirmDaraList('All', 'SerInput')
            document.getElementById('SerInput').value = ''

            data.applyFilterAsync("Service", [...newnewList, 'Null'], "replace", {
                isExcludeMode: false
            })

            //→船舶级联
            let shin = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
            let shinB = dataTable.columns.find(column => column.fieldName === "Vesselname");
            let newBB = dataTable.data.filter(item => {
                return (item[shin.index].value == that.value)
            })

            var dataList = []
            newBB.forEach(item => {
                let newData = [item[shinB.index].value]
                dataList = [...dataList, ...newData]
            })
            let filterList = [...new Set(dataList)]
            // var shipOp = document.getElementById("Ship")
            // shipOp.options.length = 0
            // document.getElementById("Ship").options.add(new Option('All', 'All'))
            clearDataList('Ship')
            addDataList('All', 'Ship')
            filterList.forEach(item => {
                //存在筛选项
                // shipOp.options.add(new Option(item, item))
                addDataList(item, 'Ship')
            })
            // confirmDaraList('All', 'ShipInput')
            document.getElementById('ShipInput').value = ''

            data.applyFilterAsync("Vesselname", [...filterList, 'Null'], "replace", {
                isExcludeMode: false
            })
        })
    }

}

function serchange(that) {
    if (!that.value) return
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
            });
        }).then(dataTable => {
            //筛选出航线
            let fieldA = dataTable.columns.find(column => column.fieldName === "Service");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
            data.applyFilterAsync('Service', valuesA, "replace", {
                isExcludeMode: false
            })
            console.log('Service', valuesA)
        });
        // data.clearFilterAsync("Service")
    } else {
        data.applyFilterAsync("Service", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('service change=>', that.value)
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            //船名
            let alin = dataTable.columns.find(column => column.fieldName === "Service");
            let alinB = dataTable.columns.find(column => column.fieldName === "Vesselname");
            let newAA = dataTable.data.filter(item => {
                return (item[alin.index].value == that.value)
            })

            var dataList = []
            newAA.forEach(item => {
                let newData = [item[alinB.index].value]
                dataList = [...dataList, ...newData]
            })
            let newnewList = [...new Set(dataList)]
            // var shipOp = document.getElementById("Ship")
            // shipOp.options.length = 0
            // document.getElementById("Ship").options.add(new Option('All', 'All'))
            clearDataList('Ship')
            addDataList('All', 'Ship')
            newnewList.forEach(item => {
                //存在筛选项
                // shipOp.options.add(new Option(item, item))
                addDataList(item, 'Ship')
            })
            document.getElementById('ShipInput').value = ''
            data.applyFilterAsync("Vesselname", [...newnewList, 'Null'], "replace", {
                isExcludeMode: false
            })

            //地区
            let regin = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
            let reginB = dataTable.columns.find(column => column.fieldName === "Service");
            let newFilter = dataTable.data.filter(item => {
                return (item[reginB.index].value == that.value)
            })

            var selectValue = []
            console.log(newFilter)
            newFilter.forEach(item => {
                let newData = [item[regin.index].value]
                selectValue = [...selectValue, ...newData]
            })
            let newFilterList = [...new Set(selectValue)][0]
            console.log(newFilterList)
            var RegOp = document.getElementById("Target")
            for (let i = 0; i < RegOp.length; i++) {
                if (RegOp[i].value === newFilterList) {
                    RegOp[i].selected = true
                }
            }
            data.applyFilterAsync("Region (DWS Portshiproute)", [newFilterList, 'Null'], "replace", {
                isExcludeMode: false
            })
            data.applyFilterAsync("Region (View_vesseldetail)", [newFilterList, 'Null'], "replace", {
                isExcludeMode: false
            })



        })

    }
}

function shipchange(that) {
    if (!that.value) return
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
    if (that.value === 'All') {
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
            });
        }).then(dataTable => {
            //筛选出船名
            let fieldA = dataTable.columns.find(column => column.fieldName === "Vesselname");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            valuesA.push('Null')
            var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
            data.applyFilterAsync('Vesselname', valuesA, "replace", {
                isExcludeMode: false
            })
            console.log('Vesselname', valuesA)
        });
        // data.clearFilterAsync("Vesselname")
    } else {
        data.applyFilterAsync("Vesselname", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_vesseldetail' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            let alin = dataTable.columns.find(column => column.fieldName === "Service");
            let alinB = dataTable.columns.find(column => column.fieldName === "Vesselname");
            let newAA = dataTable.data.filter(item => {
                return (item[alinB.index].value == that.value)
            })

            var selectValue = []
            newAA.forEach(item => {
                let newData = [item[alin.index].value]
                selectValue = [...selectValue, ...newData]
            })
            let newnewList = [...new Set(selectValue)][0]
            console.log(newnewList)
            confirmDaraList(newnewList, "SerInput")
            // var serOp = document.getElementById("Service")
            // for (let i = 0; i < serOp.length; i++) {
            //     if (serOp[i].value === newnewList) {
            //         serOp[i].selected = true
            //     }
            // }
            data.applyFilterAsync("Service", [newnewList, 'Null'], "replace", {
                isExcludeMode: false
            })

            //地区
            let regin = dataTable.columns.find(column => column.fieldName === "Region (View_vesseldetail)");
            let reginB = dataTable.columns.find(column => column.fieldName === "Vesselname");
            let newFilter = dataTable.data.filter(item => {
                return (item[reginB.index].value == that.value)
            })

            var selectValue = []
            newFilter.forEach(item => {
                let newData = [item[regin.index].value]
                selectValue = [...selectValue, ...newData]
            })
            let newFilterList = [...new Set(selectValue)][0]
            console.log(newFilterList)
            var RegOp = document.getElementById("Target")
            for (let i = 0; i < RegOp.length; i++) {
                if (RegOp[i].value === newFilterList) {
                    RegOp[i].selected = true
                }
            }
            data.applyFilterAsync("Region (DWS Portshiproute)", [newFilterList, 'Null'], "replace", {
                isExcludeMode: false
            })
            data.applyFilterAsync("Region (View_vesseldetail)", [newFilterList, 'Null'], "replace", {
                isExcludeMode: false
            })
        })

        console.log('ship change=>', that.value)
    }

}

function wekchange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
    if (that.value === 'All') {
        data.clearFilterAsync("etd_weeks (View_vesseldetail)")
    } else {
        data.applyFilterAsync("etd_weeks (View_vesseldetail)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        
    }
    console.log('week change=>', that.value)
}

function dirchange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图New")
    if (that.value === 'All') {
        // data.clearFilterAsync("Ship_direction (View_vesseldetail)")
        data.applyFilterAsync("Ship_direction (View_vesseldetail)", ['I','E', 'Null'], "replace", {
            isExcludeMode: false
        })
    } else {
        data.applyFilterAsync("Ship_direction (View_vesseldetail)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
       
    }

}
//添加候选list
function addDataList(value, id) {
    var op = document.createElement("option");
    op.setAttribute("value", value);
    // console.log(op)
    document.getElementById(id).appendChild(op);
}
//清空候选list
function clearDataList(id) {
    var e = document.getElementById(id)
    var first = e.firstElementChild
    while (first) {
        first.remove()
        first = e.firstElementChild
    }

}

function confirmDaraList(val, id, onchange) {
    var o = document.getElementById(id)
    o.value = val
    if (!!onchange) {
        if (o.fireEvent) {
            o.fireEvent('onchange')
        } else {
            o.onchange()
        }
    }
}