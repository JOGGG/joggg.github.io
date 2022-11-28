
var viz, workbook, activeSheet;
tableau.extensions.initializeAsync().then(function () {
     this.clearAllFilter();
     initializeViz();
     changeParam(7);
    // Initialization succeeded! 
    //Add your JavaScript code here to call the Extensions API
    tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图").getDataSourcesAsync().then(datasources => {
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
        let fieldC = dataTable.columns.find(column => column.fieldName === "service (DWS Vesselinfo)");
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

        //筛选delayDetectBy
        var delayDetectBy = document.getElementById("delayDetectBy");
        delayDetectBy.options.add(new Option('ETD (POL)', 'ETD (POL)'))
        delayDetectBy.options.add(new Option('ETA (POL)', 'ETA (POL)'))
        delayDetectBy.options.add(new Option('ETA (POD)', 'ETA (POD)'))

        //筛选delayThreshold
        var delayThreshold = document.getElementById("delayThreshold");
        delayThreshold.options.add(new Option('0 day', '0'))
        delayThreshold.options.add(new Option('3 day', '3'))
        delayThreshold.options.add(new Option('7 day', '7'))

    })
});


function clearAllFilter() {
    console.log('========clearAllFilter=========');
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图");
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶明细表");
    data.clearFilterAsync("pol (DWS Vesselinfo)");
    data.clearFilterAsync("pod (DWS Vesselinfo)");
    data.clearFilterAsync("service (DWS Vesselinfo)");
    data.clearFilterAsync("Etd Weeks");
    shipData.clearFilterAsync("pol (DWS Vesselinfo)");
    shipData.clearFilterAsync("pod (DWS Vesselinfo)");
    shipData.clearFilterAsync("service (DWS Vesselinfo)");
    shipData.clearFilterAsync("Etd Weeks");

}

//PortPol filter
function portPolChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
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
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶明细表")
    if (that.value === 'All') {
        console.log("shipData portPol all");
        shipData.clearFilterAsync("pol (DWS Vesselinfo)")
    } else {
        shipData.applyFilterAsync("pol (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('shipData portPol change=>', that.value)
    }
    
}

//PortPod filter
function portPodChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.clearFilterAsync("pod (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("pod (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶明细表")
    if (that.value === 'All') {
        shipData.clearFilterAsync("pod (DWS Vesselinfo)")
    } else {
        shipData.applyFilterAsync("pod (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
    
}

//ServiceLine filter
function serviceLineChange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.clearFilterAsync("service (DWS Vesselinfo)")
    } else {
        data.applyFilterAsync("service (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶明细表")
    if (that.value === 'All') {
        shipData.clearFilterAsync("service (DWS Vesselinfo)")
    } else {
        shipData.applyFilterAsync("service (DWS Vesselinfo)", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }
}

//Week filter
function weekOnchange(that) {
    //下拉项添加筛选器
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    if (that.value === 'All') {
        data.clearFilterAsync("Etd Weeks")
    } else {
        data.applyFilterAsync("Etd Weeks", [that.value, 'Null'], "replace", {
            isExcludeMode: false
        })
        console.log('ship change=>', that.value)
    }

    //下拉项添加筛选器
    var shipData = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "船舶明细表")
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



function initializeViz() {
  var placeholderDiv = document.getElementById("vizContainer");
   var url = "https://10.192.112.83/views/-1127/sheet13";
//   var options = {
//      width: "800px",
//      height: "700px",
//     onFirstInteractive: function () {
//       workbook = viz.getWorkbook();
//       activeSheet = workbook.getActiveSheet();
//     }
//   };
//   viz = new tableauSoftware.Viz(placeholderDiv, url, options);

  var options = {
    hideTabs: true,
    onFirstInteractive: function () {
        workbook = viz.getWorkbook();
      var sheetCount = viz.getWorkbook().getPublishedSheetsInfo().length;
  }
};
  viz = new tableau.Viz(placeholderDiv, url, options); 
}

function showParams()
{
	workbook.getParametersAsync()
	.then(function (params) {
		var msg = '';
		for(var i=0; i<params.length; i++)
		{
			msg += params[i].getName() + ' - ' + params[i].getDataType() + '\n';
		}
		alert(msg);
	})
}

function changeParam(value)
{
	workbook.changeParameterValueAsync("poletaDay", value)
	.then(function() {alert('success');})
	.otherwise(function(err) { alert('failed: ' + err);});
}


function getData() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "在货库存明细").getFiltersAsync().then(datasources => {
            console.log(datasources)
        })
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
}); function addFilter() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "在货库存明细")
        data.applyFilterAsync("位置", ["广州枝山仓库"], "replace", { isExcludeMode: false })
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}
function nihao() {
    var data = tableau.extensions.dashboardContent.dashboard
    data.applyFilterAsync("位置", ["广州枝山仓库"], "replace", { isExcludeMode: false })

}
