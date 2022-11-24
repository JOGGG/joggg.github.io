'use strict';

tableau.extensions.initializeAsync().then(function () {
    //Add your JavaScript code here to call the Extensions API
    var dataList = ['warehouse', 'ports', 'factory', 'normal', 'delay', 'cancelled']
    dataList.forEach(item => {
        document.getElementById(item).checked = true
    })
    var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    data.applyFilterAsync("Type (Factoryinfo)", [10, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("Type", [1, 'Null'], "replace", {
        isExcludeMode: false
    })
    data.applyFilterAsync("Type (Portinfo)", [5, 'Null'], "replace", {
        isExcludeMode: false
    })
    //未勾选初试化
    data.applyFilterAsync("Podeta Status", ['Null', 1, 2, 3], "replace", {
        isExcludeMode: false
    })
    //勾选初始化
    data.applyFilterAsync("Poletd Status", ['Null', 1, 2, 3], "replace", {
        isExcludeMode: false
    })
    var worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
    const markSelection = tableau.TableauEventType.FilterChanged;
    //
    worksheet.addEventListener(markSelection, function (selectionEvent) {
        // When the selection changes, reload the data
        console.log('filterChange=>>>>>>>>>', selectionEvent)
        if (selectionEvent.fieldName === "Ship direction") {
            var dataList = ['normal', 'delay', 'cancelled']
            dataList.forEach(item => {
                document.getElementById(item).checked = true
            })
            normal({checked:true})
            delay({checked:true})
            cancelled({checked:true})
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
        console.log(List.indexOf('E') !== -1,'E')
        console.log(List.indexOf('I') !== -1,'I')
        console.log(that.checked,List)
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

            } else {
                data.applyFilterAsync("Poletd Status", [3], "remove", {
                    isExcludeMode: false
                })

            }
        }
    })
}

// function incoming(that) {
//     var data = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === "宏观航运图")
//     var filterData
//     if (that.checked) {
//         filterData = ['I', 'Null']
//         data.applyFilterAsync("Poletd Status", [1], document.getElementById('normal').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })
//         data.applyFilterAsync("Poletd Status", [2], document.getElementById('delay').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })
//         data.applyFilterAsync("Poletd Status", [3], document.getElementById('cancelled').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })

//     } else {
//         filterData = ['E', 'Null']
//         data.applyFilterAsync("Podeta Status", [1], document.getElementById('normal').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })
//         data.applyFilterAsync("Podeta Status", [2], document.getElementById('delay').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })
//         data.applyFilterAsync("Podeta Status", [3], document.getElementById('cancelled').checked ? "add" : "remove", {
//             isExcludeMode: false
//         })

//     }
//     data.applyFilterAsync("Ship_direction", filterData, "replace", {
//         isExcludeMode: false
//     })
//     data.applyFilterAsync("Podeta Status", ['Null',1,2,3], "replace", {
//         isExcludeMode: false
//     })
//     data.applyFilterAsync("Poletd Status", ['Null',1,2,3], "replace", {
//         isExcludeMode: false
//     })
//     var dataList = ['normal','delay','cancelled']
//     dataList.forEach(item => {
//         document.getElementById(item).checked = true
//     })
//     console.log('OK','Ship_direction=>', that.checked ? 'I' : 'E')
// }

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