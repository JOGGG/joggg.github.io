'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
}); function addFilter() {
    tableau.extensions.initializeAsync().then(function () {
        // Initialization succeeded! Get the dashboard
        
        tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图").getDataSourcesAsync().then(datasources => {
           var dataSource = datasources.find(datasource => datasource.name === "宏观航运New3.0");
            return dataSource.getUnderlyingDataAsync();
        }).then(dataTable => {
            let field = dataTable.columns.find(column => column.fieldName === "Sup Area");
            let list = [];
            for (let row of dataTable.data) {
                list.push(row[field.index].value);
            }
            let values = list.filter((el, i, arr) => arr.indexOf(el) === i);
            console.log(values)
        });

        // data.getSummaryDataAsync().then(function(sumdata) {
        //     //获取表单数据
        //     const worksheetData = sumdata;
        //     console.log(worksheetData);
        // });
        // var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "世界地图")
        // data.applyFilterAsync("位置", ["广州枝山仓库"], "replace", { isExcludeMode: false })
    }, function (err) {
        // something went wrong in initialization
        document.getElementById("resultBox").innerHTML = "Error while Initializing: " + err.toString();
    });
}
