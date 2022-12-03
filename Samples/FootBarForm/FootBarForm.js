'use strict';
var filterData;
tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    // dataList.forEach(item => {
    //     document.getElementById(item).checked = true
    // })
    // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    // data.applyFilterAsync("Type (Factoryinfo)", [10, 'Null'], "replace", {
    //     isExcludeMode: false
    // })  

    console.log('---Footbar form initializeAsync------')
    tableau.extensions.dashboardContent.dashboard.worksheets.forEach(item => {
        console.log('---worksheet------', item.name)
    })

    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）").getParametersAsync().then(function (parameters) {
        parameters.forEach(function (p) {

            console.log('---elePara name:' + p.name);
            console.log('---elePara value:' + p.value);
            console.log('---elePara innerText:' + p.currentValue.value);
            p.addEventListener(tableau.TableauEventType.ParameterChanged, onParameterChange);
            //   parameterRow(p).appendTo(tableBody);
        });
    });

    var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    const markSelection = tableau.TableauEventType.FilterChanged;
    //监听筛选器
    worksheet.addEventListener(markSelection, function (selectionEvent) {
        // When the selection changes, reload the data
        console.log('----Listener start------', selectionEvent)
        //{
        calcOnFilterChange();
    });
    calcOnFilterChange();
    
});

function onParameterChange(parameterChangeEvent) {
    parameterChangeEvent.getParameterAsync().then(function (param) {

        console.log('---------参数变更-------------');
        console.log('参数变更前数量：' + filterData.length);
        console.log('---param name:' + param.name);
        console.log('---param currentValue.formattedValue:' + param.currentValue.formattedValue);
        console.log('---param currentValue:' + param.currentValue.value);

        calcOnFilterChange();
        //     console.log("---------newRow-------------:"+rowsCancel.length);
        //   const newRow = parameterRow(param);
        //   const oldRow = $("tr[data-fieldname='" + param.id + "'");
        //   oldRow.replaceWith(newRow);
    });
}



function calcOnFilterChange() {

    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）").getDataSourcesAsync().then(datasources => {
        var dataSource = datasources.find(datasource => datasource.name === "仓库+ (宏观航运全局New)");
        return dataSource.getLogicalTablesAsync().then((logicalTables) => {
            console.log('nihao123=>', logicalTables)
            var lgTabel = logicalTables.find(item => {
                return item.caption === '船舶'
            })
            console.log(lgTabel)
            return dataSource.getLogicalTableDataAsync(lgTabel.id) //船舶表
        });
    }).then(dataTable => {
        // let result = [];
        console.log("---------calcOnFilterChange 开始获取船舶明细表的筛选器-------------");
        //获取筛选器的值
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
        data.getFiltersAsync().then(res => {
            console.log('res>>>>>>>>' , res)
            //serviceline
            var fvServiceLine = res.find(item => {
                return item.fieldName == 'Service Line'
            })
            var List = []
            var valServiceLine = "";
            if (fvServiceLine) {
                if(!fvServiceLine.isAllSelected){
                    fvServiceLine.appliedValues.forEach(item => {
                        List.push(item.value)
                    })
                    valServiceLine = List[0];
                }
            }
            console.log("---------serviceLine:" + valServiceLine)


            //Pol
            var fvPol = res.find(item => {
                return item.fieldName == 'pol (DWS Vesselinfo)'
            })
            var listPol = []
            var valPol = "";
            console.log("---------fvPol:", +fvPol)
            if (fvPol) {
                if(!fvPol.isAllSelected){
                    fvPol.appliedValues.forEach(item => {
                        listPol.push(item.value)
                    })
                    valPol = listPol[0];
                    
                }
            }
            console.log("---------pol:" + valPol)


            //Pod
            var fvPod = res.find(item => {
                return item.fieldName == 'pod (DWS Vesselinfo)'
            })
            var listPod = []
            var valPod = "";
            console.log("---------fvPod:" + fvPod)
            if (fvPod) {
                if(!fvPod.isAllSelected){
                    fvPod.appliedValues.forEach(item => {
                        listPod.push(item.value)
                    })
                    valPod = listPod[0];
                }
            }
            console.log("---------pod:" + valPod)


            //Etd Weeks
            var fvWeek = res.find(item => {
                return item.fieldName == 'Etd Weeks'
            })
            var listWeek = []
            var valWeek = "";
            console.log("---------fvWeek:" + fvWeek)
            if (fvWeek) {
                if(!fvWeek.isAllSelected){
                    fvWeek.appliedValues.forEach(item => {
                        listWeek.push(item.value)
                    })
                    valWeek = listWeek[0];
                } 
            }
            console.log("---------Weeks:" + valWeek)

            console.log("---------获取船舶明细表的筛选器结束-------------");

            console.log("---------开始筛选-------------");
            let fieldServiceLine = dataTable.columns.find(column => column.fieldName === "Service Line");
            let fieldPol = dataTable.columns.find(column => column.fieldName === "pol (DWS Vesselinfo)");
            let fieldPod = dataTable.columns.find(column => column.fieldName === "pod (DWS Vesselinfo)");
            let fieldWeek = dataTable.columns.find(column => column.fieldName === "Etd Weeks");
            let fieldTag = dataTable.columns.find(column => column.fieldName === "Layer_Tag");
            let fieldShip = dataTable.columns.find(column => column.fieldName === "Ship direction");
            let fieldPodeta = dataTable.columns.find(column => column.fieldName === "Podeta Status");
            let fieldPoletd = dataTable.columns.find(column => column.fieldName === "Poletd Status");
            console.log(fieldPoletd);
            console.log(fieldPodeta);
            console.log("fieldPoletd_Index" + fieldPoletd.index);
            console.log("fieldPodeta_Index" + fieldPodeta.index);
            console.log("fieldShip_Index" + fieldShip.index);
            filterData = dataTable.data;
            console.log("为筛选前数量：" + filterData.length);
            if (valServiceLine) {
                console.log("===valServiceLine:" + valServiceLine)
                filterData = filterData.filter(item => {
                    return (item[fieldServiceLine.index].value == valServiceLine)
                })
                console.log("ServiceLine筛选后数量：" + filterData.length);
            }

            if (valPol) {
                console.log("===valPol:" + valPol)
                filterData = filterData.filter(item => {
                    return (item[fieldPol.index].value == valPol)
                })
                console.log("Pol筛选后数量：" + filterData.length);
            }

            if (valPod) {
                console.log("===valPod:" + valPod)
                filterData = filterData.filter(item => {
                    return (item[fieldPod.index].value == valPod)
                })
                console.log("Pod筛选后数量：" + filterData.length);
            }

            if (valWeek) {
                console.log("===valWeek:" + valWeek)
                filterData = filterData.filter(item => {
                    return (item[fieldWeek.index].value == valWeek)
                })
                console.log("Week筛选后数量：" + filterData.length);
            }
            
            filterData = filterData.filter(item => {
                return (item[fieldTag.index].value == 1)
            })

            console.log("---------筛选结束-------------");
            console.log("Layer_Tag筛选后数量" + filterData.length);
            console.log(filterData.length);
            console.log(filterData);

            var rNormal = 0
            var rDelay = 0
            var rCancel = 0
            console.log(document.getElementById('normal'))


            filterData.forEach(item => {
                if (item[fieldShip.index].value == 'I' && item[fieldPoletd.index].value == '1') {
                    rNormal = rNormal + 1
                } else if (item[fieldShip.index].value == 'E' && item[fieldPodeta.index].value == '1') {
                    rNormal = rNormal + 1
                } else if (item[fieldShip.index].value == 'I' && item[fieldPoletd.index].value == '2') {
                    rDelay = rDelay + 1
                } else if (item[fieldShip.index].value == 'E' && item[fieldPodeta.index].value == '2') {
                    rDelay = rDelay + 1
                } else if (item[fieldShip.index].value == 'I' && item[fieldPoletd.index].value == '3') {
                    rCancel = rCancel + 1
                } else if (item[fieldShip.index].value == 'E' && item[fieldPodeta.index].value == '3') {
                    rCancel = rCancel + 1
                }
            })
            console.log(rNormal, rDelay, rCancel)
            document.getElementById('normal').innerText = rNormal;
            document.getElementById('delay').innerText = rDelay;
            document.getElementById('cancelled').innerText = rCancel;
        });



    })
}


//   function calcOnParameterChange (parameterChangeEvent) {
//     parameterChangeEvent.getParameterAsync().then(function (param) {

//         console.log('---12param name:'+param.name);
//         console.log('---param currentValue.formattedValue:'+param.currentValue.formattedValue);
//         console.log('---param currentValue:'+param.currentValue.value);
//     //     console.log("---------newRow-------------:"+rowsCancel.length);
//     //   const newRow = parameterRow(param);
//     //   const oldRow = $("tr[data-fieldname='" + param.id + "'");
//     //   oldRow.replaceWith(newRow);
//     });
//   }