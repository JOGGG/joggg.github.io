'use strict';


tableau.extensions.initializeAsync().then(function () {
    // var dashboard = tableau.extensions.dashboardContent.dashboard
    // var obId = dashboard.objects.find(item=>{
    //     return item.name == "FootBar Sample"
    // }).id
    // console.log(dashboard.getDashboardObjectById(obId))
    // return
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === 'Suppliers'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        })
        .then(dataTable => {
            console.log('dataTable=>', dataTable)

            // //筛选区域
            // let fieldA = dataTable.columns.find(column => column.fieldName === "sup area (Suppliers)");
            // var listA = [];
            // for (let row of dataTable.data) {
            //     listA.push(row[fieldA.index].value);
            // }
            // let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            // document.getElementById("Logistic").options.add(new Option('All', 'All'))
            // document.getElementById("Logistic").options.add(new Option('1'), '1')
            // document.getElementById("Logistic").options.add(new Option('2'), '2')
            // console.log('options=>', valuesA)
            // window.Region = valuesA
            // valuesA.forEach(item => {
            //     //存在筛选项
            //     if (item) {
            //         var shipOp = document.getElementById("Logistic")
            //         shipOp.options.add(new Option(item, item))
            //     }
            // })

            // //筛选省份
            // let fieldB = dataTable.columns.find(column => column.fieldName === "sup province (Suppliers)");
            // var listB = [];
            // for (let row of dataTable.data) {
            //     listB.push(row[fieldB.index].value);
            // }
            // let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            // document.getElementById("Province").options.add(new Option('All', 'All'))
            // console.log('options=>', valuesB)
            // window.Province = valuesB
            // valuesB.forEach(item => {
            //     //存在筛选项
            //     if (item) {
            //         var shipOp = document.getElementById("Province")
            //         shipOp.options.add(new Option(item, item))
            //     }
            // })
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
                    return item.caption === 'Area_Province_Mapping'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //PickList
            })
        })
        .then(dataTable => {
            //pickList
            console.log(dataTable)
            let Id = dataTable.columns.find(column => column.fieldName === "Area Mapping Id");
            let Province = dataTable.columns.find(column => column.fieldName === "Province");
            let Region = dataTable.columns.find(column => column.fieldName === "Logistic Region");
            window.listPick = [];
            for (let row of dataTable.data) {
                listPick.push({
                    Region: row[Region.index].value,
                    Province: row[Province.index].value,
                    Id: row[Id.index].value
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
                    return item.caption === 'Suppliers'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选区域
            let fieldA = dataTable.columns.find(column => column.fieldName === "sup area (Suppliers)");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            window.Region = valuesA
            var log = document.getElementById("Logistic")
            log.options.length = 0
            var filterLog = []
            log.options.add(new Option('All', 'All'))
            valuesA.forEach(item => {
                //存在筛选项
                if (item) {
                    filterLog.push(item)
                    log.options.add(new Option(item, item))
                }
            })


            //筛选省份
            let fieldB = dataTable.columns.find(column => column.fieldName === "sup province (Suppliers)");
            var listB = [];
            for (let row of dataTable.data) {
                listB.push(row[fieldB.index].value);
            }
            let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            var pro = document.getElementById("Province")
            pro.options.length = 0
            pro.options.add(new Option('All', 'All'))
            var filterPro = []
            valuesB.forEach(item => {
                //存在筛选项
                if (item) {
                    pro.options.add(new Option(item, item))
                    filterPro.push(item)
                }
            })
            console.log('sup area (Suppliers)', valuesA)

            data.applyFilterAsync("sup area (Suppliers)", filterLog, "replace", {
                isExcludeMode: false
            })
            data.applyFilterAsync("sup province (Suppliers)", filterPro, "replace", {
                isExcludeMode: false
            })
            console.log(filterLog, filterPro)
            getData()
        });
    } else {
        data.applyFilterAsync("sup area (Suppliers)", [that.value], "replace", {
            isExcludeMode: false
        })
        reloadPro(that.value)
        console.log('Region change=>', that.value)
    }

}

function prochange(that) {

    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图")
    if (that.value !== 'All') {
        data.applyFilterAsync('sup province (Suppliers)', [that.value], "replace", {
            isExcludeMode: false
        })
        var RegItem = window.listPick.find(item => {
            return item.Province == that.value
        })
        var log = document.getElementById("Logistic")
        log.options.length = 0

        log.options.add(new Option(RegItem.Region), RegItem.Region)
        window.Region.forEach(item => {
            //存在筛选项
            if (item !== RegItem.Region) {
                log.options.add(new Option(item, item))
                console.log(item)
            }
        })
        log.options.add(new Option('All', 'All'))
    } else {
        var sonAll = window.listPick.filter(item => {
            return item.Region == document.getElementById('Logistic').value
        })
        var filterData = []
        sonAll.forEach(item => {
            //存在筛选项
            filterData.push(item.Province)
        })
        data.applyFilterAsync('sup province (Suppliers)', filterData, "replace", {
            isExcludeMode: false
        })
    }
    getData('pro')
}

function reloadPro(data) {
    console.log(data)
    var newOptions = window.listPick.filter(item => {
        return item.Region == data
    })
    var Province = document.getElementById("Province")
    var filterData = []
    Province.options.length = 0
    Province.options.add(new Option('All', 'All'))
    newOptions.forEach(item => {
        //存在筛选项
        Province.options.add(new Option(item.Province), item.Province)
        filterData.push(item.Province)
    })

    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").applyFilterAsync("sup province (Suppliers)", filterData, "replace", {
        isExcludeMode: false
    })
    console.log(newOptions)

    getData('reg')
}

// function reloadReg(data) {
//     var newOptions = window.listPick.filter(item => {
//         return item.Province == data
//     })
//     var Logistic = document.getElementById("Logistic")
//     var filterData = []
//     Logistic.options.length = 0

//     newOptions.forEach(item => {
//         //存在筛选项
//         Logistic.options.add(new Option(item.Region), item.Region)
//         filterData.push(item.Region)
//     })
//     Logistic.options.add(new Option('All', 'All'))
//     tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").applyFilterAsync("sup area (Suppliers)", filterData, "replace", {
//         isExcludeMode: false
//     })
//     console.log(newOptions)
// }
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
                        return item.caption === 'A-ILN' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                alinAll = dataTable.data.length
                let alin = dataTable.columns.find(column => column.fieldName === "Special Monitoring");
                let alinB = dataTable.columns.find(column => column.fieldName === "sup province (A-ILN)");
                dataTable.data.forEach(item => {
                    if (item[alin.index].value == 'Yes' && item[alinB.index].value == Province) {
                        alinM += 1
                    }
                })
                document.getElementById('alinAll').innerText = alinAll
                document.getElementById('alinM').innerText = alinM
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenter' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                lcAll = dataTable.data.length
                let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                let LcenterB = dataTable.columns.find(column => column.fieldName === "sup province (Lcenter)");
                dataTable.data.forEach(item => {
                    if (item[Lcenter.index].value == 'Yes' && item[LcenterB.index].value == Province) {
                        lcM += 1
                    }
                })
                document.getElementById('lcAll').innerText = lcAll
                document.getElementById('lcM').innerText = lcM
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex-warehouse' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                warAll = dataTable.data.length
                let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                let warB = dataTable.columns.find(column => column.fieldName === "sup province (Ex-warehouse)");
                dataTable.data.forEach(item => {
                    if (item[war.index].value == 'Yes' && item[warB.index].value == Province) {
                        warM += 1
                    }
                })
                document.getElementById('warAll').innerText = warAll
                document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //sup
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Suppliers' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                supAll = dataTable.data.length
                let sup = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Suppliers)");
                let supB = dataTable.columns.find(column => column.fieldName === "sup province (Suppliers)");
                dataTable.data.forEach(item => {
                    if (item[sup.index].value == 'Yes' && item[supB.index].value == Province) {
                        supM += 1
                    }
                })
                document.getElementById('supAll').innerText = supAll
                document.getElementById('supM').innerText = supM
                console.log(supAll, supM)
            });
    } else if (txt == 'reg') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'A-ILN' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                alinAll = dataTable.data.length
                let alin = dataTable.columns.find(column => column.fieldName === "Special Monitoring");
                let alinB = dataTable.columns.find(column => column.fieldName === "sup area (A-ILN)");
                dataTable.data.forEach(item => {
                    if (item[alin.index].value == 'Yes' && item[alinB.index].value == Logistic) {
                        alinM += 1
                    }
                })
                document.getElementById('alinAll').innerText = alinAll
                document.getElementById('alinM').innerText = alinM
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenter' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                lcAll = dataTable.data.length
                let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                let LcenterB = dataTable.columns.find(column => column.fieldName === "sup area (Lcenter)");
                dataTable.data.forEach(item => {
                    if (item[Lcenter.index].value == 'Yes' && item[LcenterB.index].value == Logistic) {
                        lcM += 1
                    }
                })
                document.getElementById('lcAll').innerText = lcAll
                document.getElementById('lcM').innerText = lcM
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex-warehouse' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                warAll = dataTable.data.length
                let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                let warB = dataTable.columns.find(column => column.fieldName === "sup area (Ex-warehouse)");
                dataTable.data.forEach(item => {
                    if (item[war.index].value == 'Yes' && item[warB.index].value == Logistic) {
                        warM += 1
                    }
                })
                document.getElementById('warAll').innerText = warAll
                document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //sup
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Suppliers' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                supAll = dataTable.data.length
                let sup = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Suppliers)");
                let supB = dataTable.columns.find(column => column.fieldName === "sup area (Suppliers)");
                dataTable.data.forEach(item => {
                    if (item[sup.index].value == 'Yes' && item[supB.index].value == Logistic) {
                        supM += 1
                    }
                })
                document.getElementById('supAll').innerText = supAll
                document.getElementById('supM').innerText = supM
                console.log(supAll, supM)
            });
    } else if (Logistic == 'All' && Province == 'All') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'A-ILN' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                alinAll = dataTable.data.length
                let alin = dataTable.columns.find(column => column.fieldName === "Special Monitoring");
                dataTable.data.forEach(item => {
                    if (item[alin.index].value == 'Yes') {
                        alinM += 1
                    }
                })
                document.getElementById('alinAll').innerText = alinAll
                document.getElementById('alinM').innerText = alinM
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Lcenter' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                lcAll = dataTable.data.length
                let Lcenter = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Lcenter)");
                dataTable.data.forEach(item => {
                    if (item[Lcenter.index].value == 'Yes') {
                        lcM += 1
                    }
                })
                document.getElementById('lcAll').innerText = lcAll
                document.getElementById('lcM').innerText = lcM
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Ex-warehouse' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                warAll = dataTable.data.length
                let war = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Ex-warehouse)");
                dataTable.data.forEach(item => {
                    if (item[war.index].value == 'Yes') {
                        warM += 1
                    }
                })
                document.getElementById('warAll').innerText = warAll
                document.getElementById('warM').innerText = warM
                console.log(warAll, warM)
            });
        //sup
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观海运中国地图").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === 'Suppliers' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                supAll = dataTable.data.length
                let sup = dataTable.columns.find(column => column.fieldName === "Special Monitoring (Suppliers)");
                dataTable.data.forEach(item => {
                    if (item[sup.index].value == 'Yes') {
                        supM += 1
                    }
                })
                document.getElementById('supAll').innerText = supAll
                document.getElementById('supM').innerText = supM
                console.log(supAll, supM)
            });
    }


    document.getElementById('MAll').innerText = supM + warM + lcM + alinM
}