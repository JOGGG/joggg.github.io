'use strict';


tableau.extensions.initializeAsync().then(function () {
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === '完整数据'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        })
        .then(dataTable => {
            //筛选区域
            let fieldA = dataTable.columns.find(column => column.fieldName === "Sup Area");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
            document.getElementById("Logistic").options.add(new Option('All', 'All'))
            console.log('options=>', valuesA)
            valuesA.forEach(item => {
                //存在筛选项
                if (item) {
                    var shipOp = document.getElementById("Logistic")
                    shipOp.options.add(new Option(item, item))
                }
            })

            //筛选省份
            let fieldB = dataTable.columns.find(column => column.fieldName === "Sup Province");
            var listB = [];
            for (let row of dataTable.data) {
                listB.push(row[fieldB.index].value);
            }
            let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
            document.getElementById("Province").options.add(new Option('All', 'All'))
            console.log('options=>', valuesB)
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
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log(logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === '完整数据'
                })
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //PickList
            })
        })
        .then(dataTable => {
            //pickList
            console.log(dataTable)
            let Province = dataTable.columns.find(column => column.fieldName === "sup province (View baseCity)");
            let Region = dataTable.columns.find(column => column.fieldName === "sup area (View baseCity)");
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
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    if (that.value === 'All') {
        data.getDataSourcesAsync().then(datasources => {
            var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)");
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                var lgTabel = logicalTables.find(item => {
                    return item.caption === '完整数据'
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //仓库
            })
        }).then(dataTable => {
            console.log('dataTable=>', dataTable.columns)
            //筛选区域
            let fieldA = dataTable.columns.find(column => column.fieldName === "Sup Area");
            var listA = [];
            for (let row of dataTable.data) {
                listA.push(row[fieldA.index].value);
            }
            let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
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
            let fieldB = dataTable.columns.find(column => column.fieldName === "Sup Province");
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
            console.log('Sup Area', valuesA)
            console.log(filterLog, '<======area')
            data.applyFilterAsync("Sup Area", filterLog, "replace", {
                isExcludeMode: false
            })
            console.log(filterPro, '<======province')

            data.applyFilterAsync("Sup Province", filterPro, "replace", {
                isExcludeMode: false
            })
            console.log(filterLog, filterPro)
            getData()
        });
    } else {
        data.applyFilterAsync("Sup Area", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        reloadPro(that.value)

        console.log('Region change=>', that.value)
    }

}

function prochange(that) {

    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    if (that.value !== 'All') {
        data.applyFilterAsync('Sup Province', [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        data.getDataSourcesAsync().then(datasources => {
            console.log('datasource=>', datasources)
            var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
            return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                console.log('nihao=>', logicalTables)
                var lgTabel = logicalTables.find(item => {
                    return item.caption === '完整数据' //表名
                })
                console.log(lgTabel)
                return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
            })
        }).then(dataTable => {
            let regin = dataTable.columns.find(column => column.fieldName === "Sup Area");
            let reginB = dataTable.columns.find(column => column.fieldName === "Sup Province");
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
        data.applyFilterAsync('Sup Province', filterData, "replace", {
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
        Province.options.add(new Option(item, item))
        filterData.push(item)
    })

    var newFilter = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT")
    newFilter.applyFilterAsync("Sup Province", filterData, "replace", {
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
    if (txt == 'pro' && Province !== 'All') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable)
                //多重条件筛选数据
                let alinB = dataTable.columns.find(column => column.fieldName === "Sup Province");
                let alinA = dataTable.columns.find(column => column.fieldName === "Type");

                let newAA = dataTable.data.filter(item => {
                    return (item[alinB.index].value == Province && item[alinA.index].value == 1)
                })
                alinAll = newAA.length
                document.getElementById('alinAll').innerText = alinAll
                console.log(alinAll)

            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let LcenterA = dataTable.columns.find(column => column.fieldName === "Type");
                let LcenterB = dataTable.columns.find(column => column.fieldName === "Sup Province");
                let newAA = dataTable.data.filter(item => {
                    return (item[LcenterB.index].value == Province && item[LcenterA.index].value == 2)
                })
                lcAll = newAA.length

                document.getElementById('lcAll').innerText = lcAll
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let warA = dataTable.columns.find(column => column.fieldName === "Type");
                let warB = dataTable.columns.find(column => column.fieldName === "Sup Province");
                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Province && item[warA.index].value == 3)
                })
                warAll = newAA.length
                document.getElementById('warAll').innerText = warAll
                console.log(warAll, warM)
            });
        //supAll
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let supA = dataTable.columns.find(column => column.fieldName === "Type");
                let supB = dataTable.columns.find(column => column.fieldName === "Sup Province");
                let newAA = dataTable.data.filter(item => {
                    return (item[supB.index].value == Province && item[supA.index].value == 4)
                })
                let newSp = dataTable.data.filter(item => {
                    return (item[supB.index].value == Province && item[supA.index].value == 7)
                })
                console.log(newAA)
                supAll = newAA.length
                supM = newSp.length
                document.getElementById('supAll').innerText = supAll
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
            });

    } else if (Logistic == 'All' && Province == 'All') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let alinA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[alinA.index].value == 1)
                })
                alinAll = newAA.length
                document.getElementById('alinAll').innerText = alinAll
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let lcA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[lcA.index].value == 2)
                })
                lcAll = newAA.length
                document.getElementById('lcAll').innerText = lcAll
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let warA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[warA.index].value == 3)
                })
                warAll = newAA.length
                document.getElementById('warAll').innerText = warAll
                console.log(warAll, warM)
            });
        //supAll
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let warA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[warA.index].value == 4)
                })
                let newBB = dataTable.data.filter(item => {
                    return (item[warA.index].value == 7)
                })
                supAll = newAA.length
                supM = newBB.length
                document.getElementById('supAll').innerText = supAll
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
            });
    } else if (txt == 'reg' || Province == 'All') {
        //Alin
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let alinB = dataTable.columns.find(column => column.fieldName === "Sup Area");
                let alinA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[alinB.index].value == Logistic && item[alinA.index].value == 1)
                })
                alinAll = newAA.length

                document.getElementById('alinAll').innerText = alinAll
                console.log(alinAll, alinM)
            });

        //lc
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let LcenterB = dataTable.columns.find(column => column.fieldName === "Sup Area");
                let LcenterA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[LcenterB.index].value == Logistic && item[LcenterA.index].value == 2)
                })
                lcAll = newAA.length
                document.getElementById('lcAll').innerText = lcAll
                console.log(lcAll, lcM)
            });
        //war
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                console.log(dataTable.data)
                let warB = dataTable.columns.find(column => column.fieldName === "Sup Area");
                let warA = dataTable.columns.find(column => column.fieldName === "Type");

                let newAA = dataTable.data.filter(item => {
                    return (item[warB.index].value == Logistic && item[warA.index].value == 3)
                })
                warAll = newAA.length
                document.getElementById('warAll').innerText = warAll
                console.log(warAll, warM)
            });
        //supM
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "中国地图正式版UAT").getDataSourcesAsync().then(datasources => {
                console.log('datasource=>', datasources)
                var dataSource = datasources.find(datasource => datasource.name === "ailninfo+ (KWE_NCIC_TABLEAU)"); //数据源
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '完整数据' //表名
                    })
                    console.log(lgTabel)
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //表Id
                })
            })
            .then(dataTable => {
                let supB = dataTable.columns.find(column => column.fieldName === "Sup Area");
                let supA = dataTable.columns.find(column => column.fieldName === "Type");
                let newAA = dataTable.data.filter(item => {
                    return (item[supB.index].value == Logistic && item[supA.index].value == 7)
                })
                let newBB = dataTable.data.filter(item => {
                    return (item[supB.index].value == Logistic && item[supA.index].value == 4)
                })
                supM = newAA.length
                supAll = newBB.length
                document.getElementById('supM').innerText = supM
                document.getElementById('MAll').innerText = supM
                document.getElementById('supAll').innerText = supAll
            });
    }
}