'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['normal', 'delay', 'cancelled']
    // dataList.forEach(item => {
    //     document.getElementById(item).checked = true
    // })
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    // data.applyFilterAsync("Type (Factoryinfo)", [10, 'Null'], "replace", {
    //     isExcludeMode: false
    // })
 
    var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    const markSelection = tableau.TableauEventType.FilterChanged;
    //监听筛选器
    worksheet.addEventListener(markSelection, function (selectionEvent) {
        // When the selection changes, reload the data
        console.log('will123 filterChange=>>>>>>>>>', selectionEvent)
         if (selectionEvent.fieldName === "service (DWS Vesselinfo)") {
            console.log('---------service (DWS Vesselinfo)=>>>>>>>>>')
            //获取船舶表数据
            tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
                var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
                return dataSource.getLogicalTablesAsync().then((logicalTables) => {
                    console.log('nihao123=>', logicalTables)
                    var lgTabel = logicalTables.find(item => {
                        return item.caption === '船舶'
                    })
                    console.log(lgTabel)
                    console.log("---------lgTabel-------------");
                    return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
                });
            }).then(dataTable => {

                //获取筛选器的值
                var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
                data.getFiltersAsync().then(res => {
                    //serviceline
                    var fvServiceLine = res.find(item => {
                        return item.fieldName == 'service (DWS Vesselinfo)'
                    })
                    var List = []
                    fvServiceLine.appliedValues.forEach(item => {
                        List.push(item.value)
                    })
                    var valServiceLine = List[0];
                    console.log("---------service (DWS Vesselinfo):"+valServiceLine)

                    
                    //Pol
                    var fvPol = res.find(item => {
                        return item.fieldName == 'pol (DWS Vesselinfo)'
                    })
                    var listPol = []
                    fvPol.appliedValues.forEach(item => {
                        listPol.push(item.value)
                    })
                    var valPol = listPol[0];
                    console.log("---------pol (DWS Vesselinfo):"+valPol)

                    
                    //Pod
                    var fvPod = res.find(item => {
                        return item.fieldName == 'pod (DWS Vesselinfo)'
                    })
                    var listPod = []
                    fvPod.appliedValues.forEach(item => {
                        listPod.push(item.value)
                    })
                    var valPod = listPod[0];
                    console.log("---------pod (DWS Vesselinfo):"+valPod)

                    
                    //Etd Weeks
                    var fvWeek = res.find(item => {
                        return item.fieldName == 'Etd Weeks'
                    })
                    var listWeek = []
                    fvWeek.appliedValues.forEach(item => {
                        listWeek.push(item.value)
                    })
                    var valWeek = listWeek[0];
                    console.log("---------Etd Weeks:"+valWeek)

                    console.log("---------dataTable-------------");
                    let fieldServiceLine = dataTable.columns.find(column => column.fieldName === "service (DWS Vesselinfo)");
                    let fieldPol = dataTable.columns.find(column => column.fieldName === "pol (DWS Vesselinfo)");
                    let fieldPod = dataTable.columns.find(column => column.fieldName === "pod (DWS Vesselinfo)");
                    let fieldWeek = dataTable.columns.find(column => column.fieldName === "Etd Weeks");
                    let fieldPodeta = dataTable.columns.find(column => column.fieldName === "Podeta Status");
                    let fieldPoletd = dataTable.columns.find(column => column.fieldName === "Poletd Status");
                    console.log(fieldPoletd);
                    console.log(fieldPodeta);
                    let filterData =dataTable.data;
                    if(valServiceLine){
                        filterData = filterData.filter(item => {
                            return (item[fieldServiceLine.index].value == valServiceLine )
                        }) 
                    }
                    
                    if(valPol){
                        filterData = filterData.filter(item => {
                            return (item[fieldPol.index].value == valPol )
                        }) 
                    }

                    if(valPod){
                        filterData = filterData.filter(item => {
                            return (item[fieldPod.index].value == valPod )
                        }) 
                    }

                    if(valWeek){
                        filterData = filterData.filter(item => {
                            return (item[fieldWeek.index].value == valWeek )
                        }) 
                    }

                    
    
                    console.log("---------filterData-------------");
                    console.log(filterData.length);
                    console.log(filterData);

                    let rowsNormal = filterData.filter(item => {
                        return (item[fieldPodeta.index].value == 1 || item[fieldPoletd.index].value == 1)
                    })                
                    console.log("---------normal-------------:"+rowsNormal.length);
                    
                    document.getElementById('normal').innerText = rowsNormal.length
    
                    let rowsDelay = filterData.filter(item => {
                        return (item[fieldPodeta.index].value == 2 || item[fieldPoletd.index].value == 2)
                    })
                    console.log("---------Delay-------------:"+rowsDelay.length);
                    document.getElementById('delay').innerText = rowsDelay.length
    
                    let rowsCancel = filterData.filter(item => {
                        return (item[fieldPodeta.index].value == 3 || item[fieldPoletd.index].value == 3)
                    })
                    console.log("---------Cancle-------------:"+rowsCancel.length);
                    document.getElementById('cancelled').innerText = rowsCancel.length


                });

                // let result = [];

            });
                //筛选出Pol
        //     var dataList = ['normal', 'delay', 'cancelled']
        //     dataList.forEach(item => {
        //         document.getElementById(item).checked = true
        //     })
        //     normal({checked:true})
        //     delay({checked:true})
        //     cancelled({checked:true})
        }
    });
});


function normal(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.getFiltersAsync().then(res => {
        var direction = res.find(item => {
            return item.fieldName == 'Ship direction'
        })
        console.log(direction)
        var List = []
        direction.appliedValues.forEach(item => {
            List.push(item.value)
        })
        if (direction.isAllSelected) {
            
            if (that.checked) {
                data.applyFilterAsync("Poletd Status", ['Null', 1], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", ['Null', 1], "add", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Poletd Status", [1], "remove", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", [1], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('E') !== -1) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Podeta Status", ['Null', 1], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Poletd Status", [1], "remove", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Podeta Status", [1], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('I') !== -1) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Poletd Status", ['Null', 1], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", [1], "remove", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Poletd Status", [1], "remove", {
                    isExcludeMode: false
                })

            }
        }
    })


}

function delay(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.getFiltersAsync().then(res => {
        var direction = res.find(item => {
            return item.fieldName == 'Ship direction'
        })
        console.log(direction)
        var List = []
        direction.appliedValues.forEach(item => {
            List.push(item.value)
        })

        if (direction.isAllSelected) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Poletd Status", ['Null', 2], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", ['Null', 2], "add", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Poletd Status", [2], "remove", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", [2], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('E') !== -1) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Podeta Status", ['Null', 2], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Poletd Status",  [1], "remove", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Podeta Status",  [2], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('I') !== -1) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Poletd Status", ['Null', 2], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status",  [2], "remove", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Poletd Status",  [2], "remove", {
                    isExcludeMode: false
                })

            }
        }
    })
}

function cancelled(that) {
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")

    data.getFiltersAsync().then(res => {
        var direction = res.find(item => {
            return item.fieldName == 'Ship direction'
        })
        console.log(direction)
        var List = []
        direction.appliedValues.forEach(item => {
            List.push(item.value)
        })

        if (direction.isAllSelected) {
            
            if (that.checked) {
                
                data.applyFilterAsync("Poletd Status", ['Null', 3], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", ['Null', 3], "add", {
                    isExcludeMode: false
                })
            } else {
                
                data.applyFilterAsync("Poletd Status", [3], "remove", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status", [3], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('E') !== -1) {
            if (that.checked) {

                data.applyFilterAsync("Podeta Status", ['Null', 3], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Poletd Status",  [3], "remove", {
                    isExcludeMode: false
                })
            } else {

                data.applyFilterAsync("Podeta Status", [3], "remove", {
                    isExcludeMode: false
                })
            }
        } else if (List.indexOf('I') !== -1) {
            if (that.checked) {
                data.applyFilterAsync("Poletd Status", ['Null', 3], "add", {
                    isExcludeMode: false
                })
                data.applyFilterAsync("Podeta Status",  [3], "remove", {
                    isExcludeMode: false
                })
            } else {
                data.applyFilterAsync("Poletd Status", [3], "remove", {
                    isExcludeMode: false
                })

            }
        }
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
