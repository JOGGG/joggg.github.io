var viz, workbook, activeSheet, regionList;
tableau.extensions.initializeAsync().then(function () {
    this.clearAllFilter();
    // Initialization succeeded! 
    //Add your JavaScript code here to call the Extensions API
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）").getDataSourcesAsync().then(datasources => {
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
        data.applyFilterAsync("Layer_Tag", [1, 'Null'], "replace", {
            isExcludeMode: false
        })
        
        // console.log('---船舶 columns------')
        // dataTable.columns.forEach(item => {
        //     console.log('---column------', item.fieldName)
        // })

        //筛选出Pol
        let fieldA = dataTable.columns.find(column => column.fieldName === "pol (DWS Vesselinfo)");
        var listA = [];
        for (let row of dataTable.data) {
            listA.push(row[fieldA.index].value);
        }
        let valuesA = listA.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("PortPol").options.add(new Option('All', 'All'))
        valuesA.forEach(item => {
            //存在筛选项
            if (item) {
                var portPolOp = document.getElementById("PortPol")
                portPolOp.options.add(new Option(item, item))
            }
        })

        //筛选出Pol
        let fieldB = dataTable.columns.find(column => column.fieldName === "pod (DWS Vesselinfo)");
        console.log('========pod:' + fieldB);
        var listB = [];
        for (let row of dataTable.data) {
            listB.push(row[fieldB.index].value);
        }
        let valuesB = listB.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("PortPod").options.add(new Option('All', 'All'))
        valuesB.forEach(item => {
            //存在筛选项
            if (item) {
                var polpodOP = document.getElementById("PortPod")
                polpodOP.options.add(new Option(item, item))
            }
        })

        //筛选出service
        let fieldC = dataTable.columns.find(column => column.fieldName === "Service Line");
        console.log('========pod:' + fieldC);
        var listC = [];
        for (let row of dataTable.data) {
            listC.push(row[fieldC.index].value);
        }
        let valuesC = listC.filter((el, i, arr) => arr.indexOf(el) === i);
        document.getElementById("ServiceLine").options.add(new Option('All', 'All'))
        valuesC.forEach(item => {
            //存在筛选项
            if (item) {
                var serviceLinrOp = document.getElementById("ServiceLine")
                serviceLinrOp.options.add(new Option(item, item))
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

        // //筛选delayDetectBy
        // var delayDetectBy = document.getElementById("delayDetectBy");
        // delayDetectBy.options.add(new Option('ETD (POL)', 'ETD (POL)'))
        // delayDetectBy.options.add(new Option('ETA (POL)', 'ETA (POL)'))
        // delayDetectBy.options.add(new Option('ETA (POD)', 'ETA (POD)'))

        // //筛选delayThreshold
        // var delayThreshold = document.getElementById("delayThreshold");
        // delayThreshold.options.add(new Option('0 day', '0'))
        // delayThreshold.options.add(new Option('3 day', '3'))
        // delayThreshold.options.add(new Option('7 day', '7'))
        getList()
    })
});


function clearAllFilter() {
    console.log('========clearAllFilter=========');
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）");
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶航线明细表");
    data.clearFilterAsync("pol (DWS Vesselinfo)");
    data.clearFilterAsync("pod (DWS Vesselinfo)");
    data.clearFilterAsync("Service Line");
    data.clearFilterAsync("Etd Weeks");
    shipData.clearFilterAsync("pol (DWS Vesselinfo)");
    shipData.clearFilterAsync("pod (DWS Vesselinfo)");
    shipData.clearFilterAsync("Service Line");
    shipData.clearFilterAsync("Etd Weeks");

}

//PortPol filter
function portPolChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    if (that.value === 'All') {
        console.log("portPol all");
        data.clearFilterAsync("pol (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("pol (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('portPol change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶航线明细表")
    if (that.value === 'All') {
        console.log("shipData portPol all");
        shipData.clearFilterAsync("pol (DWS Vesselinfo)")
    } else {
        shipData.applyFilterAsync("pol (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('shipData portPol change=>', that.value)
    }
    getList()
}

//PortPod filter
function portPodChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    if (that.value === 'All') {
        data.clearFilterAsync("pod (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("pod (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶航线明细表")
    if (that.value === 'All') {
        shipData.clearFilterAsync("pod (DWS Vesselinfo)")
    } else {
        shipData.applyFilterAsync("pod (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
    getList()
}

//ServiceLine filter
function serviceLineChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    if (that.value === 'All') {
        data.clearFilterAsync("Service Line")
    } else {
        data.applyFilterAsync("Service Line", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶航线明细表")
    if (that.value === 'All') {
        shipData.clearFilterAsync("Service Line")
    } else {
        shipData.applyFilterAsync("Service Line", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
    getList()
}

//Week filter
function weekOnchange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    if (that.value === 'All') {
        data.clearFilterAsync("Etd Weeks")
    } else {
        data.applyFilterAsync("Etd Weeks", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶航线明细表")
    if (that.value === 'All') {
        shipData.clearFilterAsync("Etd Weeks")
    } else {
        shipData.applyFilterAsync("Etd Weeks", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
}

//DelayDetectByOn filter
function delayDetectByOnchange(that) {
    console.log('--- delayDetectByOnchange=>', that.value)
    changeParam(7)
    // var data = tableau.extensions.dashboardContent.dashboard;
    // if (that.value === 'All') {
    //     console.log("portPol all");
    // } else {
    //     data.changeParameterValueAsync("poletaDay", 7).then(function(){console.log(" changeParamete success");})
    // }


    // delayDetectBy.options.add(new Option('ETA (POL)', 'ETA (POL)'))
    // delayDetectBy.options.add(new Option('ETD (POL)', 'ETD (POL)'))
    // delayDetectBy.options.add(new Option('ETA (POD)', 'ETA (POD)'))


    // if (that.value === 'All') {
    //     data.clearFilterAsync("Poleta Status");        
    //     data.clearFilterAsync("Poletd Status");      
    //     data.clearFilterAsync("Podeta Status");
    // } else if(ETA (POL)) {
    //     data.applyFilterAsync("Etd Weeks", [that.value, 'Null'], "replace", {
    //         isExcludeMode: false
    //     })
    //     console.log('ship change=>', that.value)
    // }

}

//DelayThreshold filter
function delayThresholdOnchange(that) {
    //TODO
}



// function initializeViz() {
//   var placeholderDiv = document.getElementById("vizContainer");
//    var url = "https://10.192.112.83/views/-1127/sheet13";
// //   var options = {
// //      width: "800px",
// //      height: "700px",
// //     onFirstInteractive: function () {
// //       workbook = viz.getWorkbook();
// //       activeSheet = workbook.getActiveSheet();
// //     }
// //   };
// //   viz = new tableauSoftware.Viz(placeholderDiv, url, options);

//   var options = {
//     hideTabs: true,
//     onFirstInteractive: function () {
//         workbook = viz.getWorkbook();
//       var sheetCount = viz.getWorkbook().getPublishedSheetsInfo().length;
//   }
// };
//   viz = new tableau.Viz(placeholderDiv, url, options); 
// }

function showParams() {
    workbook.getParametersAsync()
        .then(function (params) {
            var msg = '';
            for (var i = 0; i < params.length; i++) {
                msg += params[i].getName() + ' - ' + params[i].getDataType() + '\n';
            }
            alert(msg);
        })
}

function changeParam(value) {
    workbook.changeParameterValueAsync("poletaDay", value)
        .then(function () {
            alert('success');
        })
        .otherwise(function (err) {
            alert('failed: ' + err);
        });
}

function getList() {
    valuePol = document.getElementById('PortPol').value
    valuePod = document.getElementById('PortPod').value
    console.log(valuePod, valuePol)
    var sheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界宏观海运图（航线仪表板用）")
    sheet.getDataSourcesAsync().then(datasources => {
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
        let fieldPol = dataTable.columns.find(column => column.fieldName === "pol (DWS Vesselinfo)"),
            fieldSer = dataTable.columns.find(column => column.fieldName === "Service Line"),
            fieldPod = dataTable.columns.find(column => column.fieldName === "pod (DWS Vesselinfo)"),
            fieldRegion = dataTable.columns.find(column => column.fieldName === "Region (DWS Vesselinfo)");
        var valuesA = [], //region
            valuesB = [] //ser

        if (valuePol == 'All' && valuePod == 'All') {
            //region
            dataTable.data.forEach(item => {
                valuesA.push(item[fieldRegion.index].value)
            })
            //ser
            dataTable.data.forEach(item => {
                valuesB.push(item[fieldSer.index].value)
            })
        } else if (valuePol == 'All' && valuePod !== 'All') {
            //region
            let List = dataTable.data.filter(item => {
                return (item[fieldPod.index].value == valuePod)
            })
            List.forEach(item => {
                valuesA.push(item[fieldRegion.index].value)
            })
            //ser
            let ListB = dataTable.data.filter(item => {
                return (item[fieldPod.index].value == valuePod)
            })
            ListB.forEach(item => {
                valuesB.push(item[fieldSer.index].value)
            })
        } else if (valuePol !== 'All' && valuePod == 'All') {
            //region
            let List = dataTable.data.filter(item => {
                return (item[fieldPol.index].value == valuePol)
            })
            List.forEach(item => {
                valuesA.push(item[fieldRegion.index].value)
            })
            //ser
            let ListB = dataTable.data.filter(item => {
                return (item[fieldPol.index].value == valuePol)
            })
            ListB.forEach(item => {
                valuesB.push(item[fieldSer.index].value)
            })
        } else {
            //region
            let List = dataTable.data.filter(item => {
                return (item[fieldPol.index].value == valuePol && item[fieldPod.index].value == valuePod)
            })
            List.forEach(item => {
                valuesA.push(item[fieldRegion.index].value)
            })
            //ser
            let ListB = dataTable.data.filter(item => {
                return (item[fieldPol.index].value == valuePol && item[fieldPod.index].value == valuePod)
            })
            ListB.forEach(item => {
                valuesB.push(item[fieldSer.index].value)
            })
        }
        console.log('regionList========>', [...new Set(valuesA)])
        console.log('serList========>', [...new Set(valuesB)])
        valuesA = [...new Set(valuesA)]
        valuesB = [...new Set(valuesB)]
        //航线赋值
        var Ser = document.getElementById('ServiceLine')
        if (valuesB.length) {
            Ser.options.length = 0
            Ser.options.add(new Option('All', 'All'))
            valuesB.forEach(item => {
                //存在筛选项
                Ser.options.add(new Option(item), item)
            })
        } else {
            Ser.options.length = 0
            Ser.options.add(new Option('--', ''))
        }
        sheet.applyFilterAsync('Region (DWS Portshiproute)', ['Null', ...valuesA], 'replace')
    })
}