'use strict';


tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_baseCity'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        })
        .then(dataTable => {
            console.log('dataTable=>', dataTable)

            //筛选区域
            let fieldA = dataTable.columns.find(column => column.fieldName === "sup area (View!baseCity)");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            document.getElementById("Logistic").options.add(new Option('All', 'All'))
            console.log('options=>', valuesA)
            window.Region = valuesA
            valuesA.forEach(item => {
                //存在筛选项
                if (item) {
                    var shipOp = document.getElementById("Logistic")
                    shipOp.options.add(new Option(item, item))
                }
            })

            //筛选省份
            let fieldB = dataTable.columns.find(column => column.fieldName === "sup province (View!baseCity)");
            var listB = [];
            for (let row of dataTable.data) {
                listB.push(row[fieldB.index].value);
            }
            let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            document.getElementById("Province").options.add(new Option('All', 'All'))
            console.log('options=>', valuesB)
            window.Province = valuesB
            valuesB.forEach(item => {
                //存在筛选项
                if (item) {
                    var shipOp = document.getElementById("Province")
                    shipOp.options.add(new Option(item, item))
                }
            })
            logchange({
                value: 'All'
            })

            // prochange({
            //     value: 'All'
            // })
        });
    //pickList
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log(logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_baseCity'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //PickList
            })
        })
        .then(dataTable => {
            //pickList
            console.log(dataTable)
            let Province = dataTable.columns.find(column => column.fieldName === "sup province (View!baseCity)");
            let Region = dataTable.columns.find(column => column.fieldName === "sup area (View!baseCity)");
            window.listPick = [];
            for (let row of dataTable.data) {
                listPick.push({
                    Region: row[Region.index].value,
                    Province: row[Province.index].value,
                });
            }
            console.log('window.listPick=>', window.listPick)

        });
});

function logchange(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    if (that.value === 'All') {
        data.getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_baseCity'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选区域
            let fieldA = dataTable.columns.find(column => column.fieldName === "sup area (View!baseCity)");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            window.Region = valuesA
            var log = document.getElementById("Logistic")
            log.options.length = 0
            var filterLog = ['Null']
            // var filterLog = []
            log.options.add(new Option('All', 'All'))
            valuesA.forEach(item => {
                //存在筛选项
                if (item) {
                    filterLog.push(item)
                    log.options.add(new Option(item, item))
                }
            })


            //筛选省份
            let fieldB = dataTable.columns.find(column => column.fieldName === "sup province (View!baseCity)");
            var listB = [];
            for (let row of dataTable.data) {
                listB.push(row[fieldB.index].value);
            }
            let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            var pro = document.getElementById("Province")
            pro.options.length = 0
            pro.options.add(new Option('All', 'All'))
            var filterPro = ['Null']
            // var filterPro = []
            valuesB = [...new Set(valuesB)]
            valuesB.forEach(item => {
                //存在筛选项
                if (item) {
                    pro.options.add(new Option(item, item))
                    filterPro.push(item)
                }
            })
            console.log('sup area (View!baseCity)', valuesA)
            console.log(filterLog,'<======area')
            data.applyFilterAsync("sup area (View!baseCity)", filterLog, "replace", {
                isExcludeMode: false
            })
            console.log(filterPro,'<======province')

            data.applyFilterAsync("sup province (View!baseCity)", filterPro, "replace", {
                isExcludeMode: false
            })
            console.log(filterLog, filterPro)
            getData()
        });
    } else {
        data.applyFilterAsync("sup area (View!baseCity)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        reloadPro(that.value)
        console.log('Region change=>', that.value)
    }

}

function prochange(that) {

    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    if (that.value !== 'All') {
        data.applyFilterAsync('sup province (View!baseCity)', [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        data.getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'View_baseCity' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            let regin = dataTable.columns.find(column => column.fieldName === "sup area (View!baseCity)");
            let reginB = dataTable.columns.find(column => column.fieldName === "sup province (View!baseCity)");
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
            var RegOp = document.getElementById("Logistic")
            for (let i = 0; i < RegOp.length; i++) {
                if (RegOp[i].value === newFilterList) {
                    RegOp[i].selected = true
                }
            }
        })
    } else {
        var sonAll = window.listPick.filter(item => {
            return item.Region == document.getElementById('Logistic').value
        })
        var filterData = ['Null']
        sonAll.forEach(item => {
            //存在筛选项
            filterData.push(item.Province)
        })
        data.applyFilterAsync('sup province (View!baseCity)', filterData, "replace", {
            isExcludeMode: false
        })
    }
    getData('pro')
}

function reloadPro(data) {
    console.log(data)
    var newOptions = []
    console.log(window.listPick)
    window.listPick.forEach(item => {
        if (item.Region == data) {
            newOptions = [...newOptions, item.Province]
        }
    })
    var Province = document.getElementById("Province")
    var filterData = ['Null']
    Province.options.length = 0
    Province.options.add(new Option('All', 'All'))
    newOptions = Array.from(new Set(newOptions))

    newOptions.forEach(item => {
        //存在筛选项
        Province.options.add(new Option(item), item)
        filterData.push(item)
    })
   
    var newFilter = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    newFilter.applyFilterAsync("sup province (View!baseCity)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log(newOptions)

    getData('reg')
}

function getData(txt) {
    var Logistic = document.getElementById('Logistic').value,
        Province = document.getElementById('Province').value,
        alinAll = 0,
        alinM = 0,
        lcAll = 0,
        lcM = 0,
        warAll = 0,
        warM = 0,
        supAll = 0,
        supM = 0
    if (txt == 'pro') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '仓库' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable)
                //多重条件筛选数据
                let alinB = dataTable.columns.find(column => column.fieldName === "Sup Province");

                let newAA = dataTable.data.filter(item => {
                    return (item[alinB.index].value == Province)
                })
                alinAll = newAA.length
                document.getElementById('alinAll').innerText = alinAll
                console.log(alinAll)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenterinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                // let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                let LcenterB = dataTable.columns.find(column => column.fieldName === "sup province (Lcenterinfo)");
                let newAA = dataTable.data.filter(item => {
                    return (item[LcenterB.index].value == Province)
                })
                lcAll = newAA.length

                document.getElementById('lcAll').innerText = lcAll
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex_warehouseinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let warB = dataTable.columns.find(column => column.fieldName === "sup province (Ex warehouseinfo)");
                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Province)
                })
                warAll = newAA.length

                document.getElementById('warAll').innerText = warAll
                console.log(warAll, warM)
            });
        //supAll
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'suppliersinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                document.getElementById('supAll').innerText = dataTable.data.length
                console.log(warAll, warM)
            });
        //supM
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'View_SpecialSupplier' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let warB = dataTable.columns.find(column => column.fieldName === "sup province (View!SpecialSupplier)");
                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Province)
                })
                supM = newAA.length
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
            });
      

    } else if (txt == 'reg') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '仓库' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let alinB = dataTable.columns.find(column => column.fieldName === "Sup Area");
                let newAA = dataTable.data.filter(item => {
                    return (item[alinB.index].value == Logistic)
                })
                alinAll = newAA.length

                document.getElementById('alinAll').innerText = alinAll
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenterinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                let LcenterB = dataTable.columns.find(column => column.fieldName === "sup area (Lcenterinfo)");
                let newAA = dataTable.data.filter(item => {
                    return (item[LcenterB.index].value == Logistic)
                })
                lcAll = newAA.length

                // dataTable.data.forEach(item => {
                //     if (item[Lcenter.index].value == '1' && item[LcenterB.index].value == Logistic && item[lcAA.index].value == 2) {
                //         lcM += 1
                //     }
                // })
                document.getElementById('lcAll').innerText = lcAll
                // document.getElementById('lcM').innerText = lcM
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex_warehouseinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                // let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                let warB = dataTable.columns.find(column => column.fieldName === "sup area (Ex warehouseinfo)");
                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Logistic)
                })
                warAll = newAA.length
                // dataTable.data.forEach(item => {
                //     if (item[war.index].value == '1' && item[warB.index].value == Logistic && item[warAA.index].value == 3) {
                //         warM += 1
                //     }
                // })
                document.getElementById('warAll').innerText = warAll
                // document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //supM
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'View_SpecialSupplier' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let warB = dataTable.columns.find(column => column.fieldName === "sup area (View!SpecialSupplier)");
                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Logistic)
                })
                supM = newAA.length
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
            });
        //supAll
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'suppliersinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let supB = dataTable.columns.find(column => column.fieldName === "Sup Area (Suppliersinfo)");
                let newAA = dataTable.data.filter(item => {
                    return (item[supB.index].value == Logistic)
                })
                supAll = newAA.length
                document.getElementById('supAll').innerText = supAll
            });
        document.getElementById('MAll').innerText = supM

    } else if (Logistic == 'All' && Province == 'All') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '仓库' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // let alin = dataTable.columns.find(column => column.fieldName === "Special Monitoring");
                // let alAA = dataTable.columns.find(column => column.fieldName === "Type");
                // let newAA = dataTable.data.filter(item => {
                //     return item[alAA.index].value == 1
                // })
                // alinAll = newAA.length
                // dataTable.data.forEach(item => {
                //     if (item[alin.index].value == '1' && item[alAA.index].value == 1) {
                //         alinM += 1
                //     }
                // })
                document.getElementById('alinAll').innerText = dataTable.data.length
                // document.getElementById('alinM').innerText = alinM
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenterinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                // let LcAA = dataTable.columns.find(column => column.fieldName === "type (Lcenterinfo)");
                // let newAA = dataTable.data.filter(item => {
                //     return item[LcAA.index].value == 2
                // })
                // lcAll = newAA.length
                // dataTable.data.forEach(item => {
                //     if (item[Lcenter.index].value == '1' && item[LcAA.index].value == 2) {
                //         lcM += 1
                //     }
                // })
                document.getElementById('lcAll').innerText = dataTable.data.length
                // document.getElementById('lcM').innerText = lcM
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex_warehouseinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                // let warAA = dataTable.columns.find(column => column.fieldName === "type (Ex warehouseinfo)");
                // let newAA = dataTable.data.filter(item => {
                //     return item[warAA.index].value == 3
                // })
                // warAll = newAA.length
                // dataTable.data.forEach(item => {
                //     if (item[war.index].value == '1' && item[warAA.index].value == 3) {
                //         warM += 1
                //     }
                // })
                document.getElementById('warAll').innerText = dataTable.data.length
                // document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //supAll
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'suppliersinfo' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                // let warAA = dataTable.columns.find(column => column.fieldName === "type (Ex warehouseinfo)");
                // let newAA = dataTable.data.filter(item => {
                //     return item[warAA.index].value == 3
                // })
                // warAll = newAA.length
                // dataTable.data.forEach(item => {
                //     if (item[war.index].value == '1' && item[warAA.index].value == 3) {
                //         warM += 1
                //     }
                // })
                document.getElementById('supAll').innerText = dataTable.data.length
                // document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //supM
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'View_SpecialSupplier' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                // dataTable.data.forEach(item => {
                //     if (item[sup.index].value == '1' && item[supAA.index].value == 4) {
                //         supM += 1
                //     }
                // })
                supM = dataTable.data.length
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
            });
       

    }

    // document.getElementById('MAll').innerText = supM + warM + lcM + alinM
}