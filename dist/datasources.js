/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// Wrap everything in an anonymous function to avoid polluting the global namespace
(async () => {
    class DataSources {
        // Avoid globals.
        constructor(_$) {
            this._$ = _$;
        }
        /**
         * Refreshes the given dataSource
         * @param dataSource
         */
        static async refreshDataSource(dataSource) {
            await dataSource.refreshAsync();
            console.log(dataSource.name + ': Refreshed Successfully');
        }
        /**
         * Initializes the extension
         */
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            // Since dataSource info is attached to the worksheet, we will perform
            // one async call per worksheet to get every dataSource used in this
            // dashboard.  This demonstrates the use of Promise.all to combine
            // promises together and wait for each of them to resolve.
            const dataSourceFetchPromises = [];
            // To get dataSource info, first get the dashboard.
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            // Then loop through each worksheet and get its dataSources, save promise for later.
            dashboard.worksheets.forEach(worksheet => dataSourceFetchPromises.push(worksheet.getDataSourcesAsync()));
            const fetchResults = await Promise.all(dataSourceFetchPromises);
            // Maps dataSource id to dataSource so we can keep track of unique dataSources.
            const dataSourcesCheck = {};
            const dashboardDataSources = [];
            fetchResults.forEach(dss => {
                dss.forEach(ds => {
                    if (!dataSourcesCheck[ds.id]) {
                        // We've already seen it, skip it.
                        dataSourcesCheck[ds.id] = true;
                        dashboardDataSources.push(ds);
                    }
                });
            });
            this.buildDataSourcesTable(dashboardDataSources);
            // This just modifies the UI by removing the loading banner and showing the dataSources table.
            this._$('#loading').addClass('hidden');
            this._$('#dataSourcesTable')
                .removeClass('hidden')
                .addClass('show');
        }
        /**
         * Displays a modal dialog with more details about the given dataSource.
         * @param dataSource
         */
        async showModal(dataSource) {
            const modal = this._$('#infoModal');
            this._$('#nameDetail').text(dataSource.name);
            this._$('#idDetail').text(dataSource.id);
            this._$('#typeDetail').text((dataSource.isExtract) ? 'Extract' : 'Live');
            // Loop through every field in the dataSource and concat it to a string.
            let fieldNamesStr = '';
            dataSource.fields.forEach(function (field) {
                fieldNamesStr += field.name + ', ';
            });
            // Slice off the last ", " for formatting.
            this._$('#fieldsDetail').text(fieldNamesStr.slice(0, -2));
            // Loop through each connection summary and list the connection's
            // name and type in the info field
            const connectionSummaries = await dataSource.getConnectionSummariesAsync();
            let connectionsStr = '';
            connectionSummaries.forEach(function (summary) {
                connectionsStr += summary.name + ': ' + summary.type + ', ';
            });
            // Slice of the last ", " for formatting.
            this._$('#connectionsDetail').text(connectionsStr.slice(0, -2));
            // Loop through each table that was used in creating this datasource
            const activeTables = await dataSource.getActiveTablesAsync();
            let tableStr = '';
            activeTables.forEach(function (table) {
                tableStr += table.name + ', ';
            });
            // Slice of the last ", " for formatting.
            this._$('#activeTablesDetail').text(tableStr.slice(0, -2));
            // @ts-ignore
            modal.modal('show');
        }
        /**
         * Constructs UI that displays all the dataSources in this dashboard
         * given a mapping from dataSourceId to dataSource objects.
         * @param dataSources
         */
        buildDataSourcesTable(dataSources) {
            // Clear the table first.
            this._$('#dataSourcesTable > tbody tr').remove();
            const dataSourcesTable = this._$('#dataSourcesTable > tbody')[0];
            // Add an entry to the dataSources table for each dataSource.
            for (const dataSource of dataSources) {
                // @ts-ignore
                const newRow = dataSourcesTable.insertRow(dataSourcesTable.rows.length);
                const nameCell = newRow.insertCell(0);
                const refreshCell = newRow.insertCell(1);
                const infoCell = newRow.insertCell(2);
                const refreshButton = document.createElement('button');
                refreshButton.innerHTML = 'Refresh Now';
                refreshButton.type = 'button';
                refreshButton.className = 'btn btn-primary';
                refreshButton.addEventListener('click', () => DataSources.refreshDataSource(dataSource));
                const infoSpan = document.createElement('span');
                infoSpan.className = 'glyphicon glyphicon-info-sign';
                infoSpan.addEventListener('click', () => this.showModal(dataSource));
                nameCell.innerHTML = dataSource.name;
                refreshCell.appendChild(refreshButton);
                infoCell.appendChild(infoSpan);
            }
        }
    }
    console.log('Initializing DataSources extension.');
    await new DataSources($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFFekYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsUUFBUSxDQUFDLFNBQVMsR0FBRywrQkFBK0IsQ0FBQztnQkFDckQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDckMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUM7S0FDRjtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNuRCxNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb25zLWFwaS1zZGsvLi9TYW1wbGVzLVR5cGVzY3JpcHQvRGF0YVNvdXJjZXMvZGF0YXNvdXJjZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0B0YWJsZWF1L2V4dGVuc2lvbnMtYXBpLXR5cGVzJztcclxuXHJcbi8vIFdyYXAgZXZlcnl0aGluZyBpbiBhbiBhbm9ueW1vdXMgZnVuY3Rpb24gdG8gYXZvaWQgcG9sbHV0aW5nIHRoZSBnbG9iYWwgbmFtZXNwYWNlXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgY2xhc3MgRGF0YVNvdXJjZXMge1xyXG4gICAgLy8gQXZvaWQgZ2xvYmFscy5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgXyQ6IEpRdWVyeVN0YXRpYykgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZyZXNoZXMgdGhlIGdpdmVuIGRhdGFTb3VyY2VcclxuICAgICAqIEBwYXJhbSBkYXRhU291cmNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIHJlZnJlc2hEYXRhU291cmNlKGRhdGFTb3VyY2U6IERhdGFTb3VyY2UpIHtcclxuICAgICAgYXdhaXQgZGF0YVNvdXJjZS5yZWZyZXNoQXN5bmMoKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YVNvdXJjZS5uYW1lICsgJzogUmVmcmVzaGVkIFN1Y2Nlc3NmdWxseScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGV4dGVuc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1dhaXRpbmcgZm9yIERPTSByZWFkeScpO1xyXG4gICAgICBhd2FpdCB0aGlzLl8kLnJlYWR5O1xyXG4gICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIGV4dGVuc2lvbiBBUEknKTtcclxuICAgICAgYXdhaXQgdGFibGVhdS5leHRlbnNpb25zLmluaXRpYWxpemVBc3luYygpO1xyXG5cclxuICAgICAgLy8gU2luY2UgZGF0YVNvdXJjZSBpbmZvIGlzIGF0dGFjaGVkIHRvIHRoZSB3b3Jrc2hlZXQsIHdlIHdpbGwgcGVyZm9ybVxyXG4gICAgICAvLyBvbmUgYXN5bmMgY2FsbCBwZXIgd29ya3NoZWV0IHRvIGdldCBldmVyeSBkYXRhU291cmNlIHVzZWQgaW4gdGhpc1xyXG4gICAgICAvLyBkYXNoYm9hcmQuICBUaGlzIGRlbW9uc3RyYXRlcyB0aGUgdXNlIG9mIFByb21pc2UuYWxsIHRvIGNvbWJpbmVcclxuICAgICAgLy8gcHJvbWlzZXMgdG9nZXRoZXIgYW5kIHdhaXQgZm9yIGVhY2ggb2YgdGhlbSB0byByZXNvbHZlLlxyXG4gICAgICBjb25zdCBkYXRhU291cmNlRmV0Y2hQcm9taXNlczogQXJyYXk8UHJvbWlzZTxEYXRhU291cmNlW10+PiA9IFtdO1xyXG5cclxuICAgICAgLy8gVG8gZ2V0IGRhdGFTb3VyY2UgaW5mbywgZmlyc3QgZ2V0IHRoZSBkYXNoYm9hcmQuXHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZCA9IHRhYmxlYXUuZXh0ZW5zaW9ucy5kYXNoYm9hcmRDb250ZW50LmRhc2hib2FyZDtcclxuICAgICAgLy8gVGhlbiBsb29wIHRocm91Z2ggZWFjaCB3b3Jrc2hlZXQgYW5kIGdldCBpdHMgZGF0YVNvdXJjZXMsIHNhdmUgcHJvbWlzZSBmb3IgbGF0ZXIuXHJcbiAgICAgIGRhc2hib2FyZC53b3Jrc2hlZXRzLmZvckVhY2god29ya3NoZWV0ID0+IGRhdGFTb3VyY2VGZXRjaFByb21pc2VzLnB1c2god29ya3NoZWV0LmdldERhdGFTb3VyY2VzQXN5bmMoKSkpO1xyXG4gICAgICBjb25zdCBmZXRjaFJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChkYXRhU291cmNlRmV0Y2hQcm9taXNlcyk7XHJcblxyXG4gICAgICAvLyBNYXBzIGRhdGFTb3VyY2UgaWQgdG8gZGF0YVNvdXJjZSBzbyB3ZSBjYW4ga2VlcCB0cmFjayBvZiB1bmlxdWUgZGF0YVNvdXJjZXMuXHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VzQ2hlY2sgPSB7fTtcclxuICAgICAgY29uc3QgZGFzaGJvYXJkRGF0YVNvdXJjZXM6IERhdGFTb3VyY2VbXSA9IFtdO1xyXG5cclxuICAgICAgZmV0Y2hSZXN1bHRzLmZvckVhY2goZHNzID0+IHtcclxuICAgICAgICBkc3MuZm9yRWFjaChkcyA9PiB7XHJcbiAgICAgICAgICBpZiAoIWRhdGFTb3VyY2VzQ2hlY2tbZHMuaWRdKSB7XHJcbiAgICAgICAgICAgIC8vIFdlJ3ZlIGFscmVhZHkgc2VlbiBpdCwgc2tpcCBpdC5cclxuICAgICAgICAgICAgZGF0YVNvdXJjZXNDaGVja1tkcy5pZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXNoYm9hcmREYXRhU291cmNlcy5wdXNoKGRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmJ1aWxkRGF0YVNvdXJjZXNUYWJsZShkYXNoYm9hcmREYXRhU291cmNlcyk7XHJcblxyXG4gICAgICAvLyBUaGlzIGp1c3QgbW9kaWZpZXMgdGhlIFVJIGJ5IHJlbW92aW5nIHRoZSBsb2FkaW5nIGJhbm5lciBhbmQgc2hvd2luZyB0aGUgZGF0YVNvdXJjZXMgdGFibGUuXHJcbiAgICAgIHRoaXMuXyQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICB0aGlzLl8kKCcjZGF0YVNvdXJjZXNUYWJsZScpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxyXG4gICAgICAgIC5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheXMgYSBtb2RhbCBkaWFsb2cgd2l0aCBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGdpdmVuIGRhdGFTb3VyY2UuXHJcbiAgICAgKiBAcGFyYW0gZGF0YVNvdXJjZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHNob3dNb2RhbChkYXRhU291cmNlOiBEYXRhU291cmNlKSB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy5fJCgnI2luZm9Nb2RhbCcpO1xyXG5cclxuICAgICAgdGhpcy5fJCgnI25hbWVEZXRhaWwnKS50ZXh0KGRhdGFTb3VyY2UubmFtZSk7XHJcbiAgICAgIHRoaXMuXyQoJyNpZERldGFpbCcpLnRleHQoZGF0YVNvdXJjZS5pZCk7XHJcbiAgICAgIHRoaXMuXyQoJyN0eXBlRGV0YWlsJykudGV4dCgoZGF0YVNvdXJjZS5pc0V4dHJhY3QpID8gJ0V4dHJhY3QnIDogJ0xpdmUnKTtcclxuXHJcbiAgICAgIC8vIExvb3AgdGhyb3VnaCBldmVyeSBmaWVsZCBpbiB0aGUgZGF0YVNvdXJjZSBhbmQgY29uY2F0IGl0IHRvIGEgc3RyaW5nLlxyXG4gICAgICBsZXQgZmllbGROYW1lc1N0ciA9ICcnO1xyXG4gICAgICBkYXRhU291cmNlLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICAgICAgZmllbGROYW1lc1N0ciArPSBmaWVsZC5uYW1lICsgJywgJztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFNsaWNlIG9mZiB0aGUgbGFzdCBcIiwgXCIgZm9yIGZvcm1hdHRpbmcuXHJcbiAgICAgIHRoaXMuXyQoJyNmaWVsZHNEZXRhaWwnKS50ZXh0KGZpZWxkTmFtZXNTdHIuc2xpY2UoMCwgLTIpKTtcclxuXHJcbiAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIGNvbm5lY3Rpb24gc3VtbWFyeSBhbmQgbGlzdCB0aGUgY29ubmVjdGlvbidzXHJcbiAgICAgIC8vIG5hbWUgYW5kIHR5cGUgaW4gdGhlIGluZm8gZmllbGRcclxuICAgICAgY29uc3QgY29ubmVjdGlvblN1bW1hcmllcyA9IGF3YWl0IGRhdGFTb3VyY2UuZ2V0Q29ubmVjdGlvblN1bW1hcmllc0FzeW5jKCk7XHJcbiAgICAgIGxldCBjb25uZWN0aW9uc1N0ciA9ICcnO1xyXG4gICAgICBjb25uZWN0aW9uU3VtbWFyaWVzLmZvckVhY2goZnVuY3Rpb24oc3VtbWFyeSkge1xyXG4gICAgICAgIGNvbm5lY3Rpb25zU3RyICs9IHN1bW1hcnkubmFtZSArICc6ICcgKyBzdW1tYXJ5LnR5cGUgKyAnLCAnO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gU2xpY2Ugb2YgdGhlIGxhc3QgXCIsIFwiIGZvciBmb3JtYXR0aW5nLlxyXG4gICAgICB0aGlzLl8kKCcjY29ubmVjdGlvbnNEZXRhaWwnKS50ZXh0KGNvbm5lY3Rpb25zU3RyLnNsaWNlKDAsIC0yKSk7XHJcblxyXG4gICAgICAvLyBMb29wIHRocm91Z2ggZWFjaCB0YWJsZSB0aGF0IHdhcyB1c2VkIGluIGNyZWF0aW5nIHRoaXMgZGF0YXNvdXJjZVxyXG4gICAgICBjb25zdCBhY3RpdmVUYWJsZXMgPSBhd2FpdCBkYXRhU291cmNlLmdldEFjdGl2ZVRhYmxlc0FzeW5jKCk7XHJcbiAgICAgIGxldCB0YWJsZVN0ciA9ICcnO1xyXG4gICAgICBhY3RpdmVUYWJsZXMuZm9yRWFjaChmdW5jdGlvbih0YWJsZSkge1xyXG4gICAgICAgIHRhYmxlU3RyICs9IHRhYmxlLm5hbWUgKyAnLCAnO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gU2xpY2Ugb2YgdGhlIGxhc3QgXCIsIFwiIGZvciBmb3JtYXR0aW5nLlxyXG4gICAgICB0aGlzLl8kKCcjYWN0aXZlVGFibGVzRGV0YWlsJykudGV4dCh0YWJsZVN0ci5zbGljZSgwLCAtMikpO1xyXG5cclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0cyBVSSB0aGF0IGRpc3BsYXlzIGFsbCB0aGUgZGF0YVNvdXJjZXMgaW4gdGhpcyBkYXNoYm9hcmRcclxuICAgICAqIGdpdmVuIGEgbWFwcGluZyBmcm9tIGRhdGFTb3VyY2VJZCB0byBkYXRhU291cmNlIG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gZGF0YVNvdXJjZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBidWlsZERhdGFTb3VyY2VzVGFibGUoZGF0YVNvdXJjZXM6IERhdGFTb3VyY2VbXSkge1xyXG4gICAgICAvLyBDbGVhciB0aGUgdGFibGUgZmlyc3QuXHJcbiAgICAgIHRoaXMuXyQoJyNkYXRhU291cmNlc1RhYmxlID4gdGJvZHkgdHInKS5yZW1vdmUoKTtcclxuICAgICAgY29uc3QgZGF0YVNvdXJjZXNUYWJsZSA9IHRoaXMuXyQoJyNkYXRhU291cmNlc1RhYmxlID4gdGJvZHknKVswXTtcclxuXHJcbiAgICAgIC8vIEFkZCBhbiBlbnRyeSB0byB0aGUgZGF0YVNvdXJjZXMgdGFibGUgZm9yIGVhY2ggZGF0YVNvdXJjZS5cclxuICAgICAgZm9yIChjb25zdCBkYXRhU291cmNlIG9mIGRhdGFTb3VyY2VzKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG5ld1JvdyA9IGRhdGFTb3VyY2VzVGFibGUuaW5zZXJ0Um93KGRhdGFTb3VyY2VzVGFibGUucm93cy5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVDZWxsID0gbmV3Um93Lmluc2VydENlbGwoMCk7XHJcbiAgICAgICAgY29uc3QgcmVmcmVzaENlbGwgPSBuZXdSb3cuaW5zZXJ0Q2VsbCgxKTtcclxuICAgICAgICBjb25zdCBpbmZvQ2VsbCA9IG5ld1Jvdy5pbnNlcnRDZWxsKDIpO1xyXG5cclxuICAgICAgICBjb25zdCByZWZyZXNoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgcmVmcmVzaEJ1dHRvbi5pbm5lckhUTUwgPSAnUmVmcmVzaCBOb3cnO1xyXG4gICAgICAgIHJlZnJlc2hCdXR0b24udHlwZSA9ICdidXR0b24nO1xyXG4gICAgICAgIHJlZnJlc2hCdXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tcHJpbWFyeSc7XHJcbiAgICAgICAgcmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IERhdGFTb3VyY2VzLnJlZnJlc2hEYXRhU291cmNlKGRhdGFTb3VyY2UpKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5mb1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgaW5mb1NwYW4uY2xhc3NOYW1lID0gJ2dseXBoaWNvbiBnbHlwaGljb24taW5mby1zaWduJztcclxuICAgICAgICBpbmZvU3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2hvd01vZGFsKGRhdGFTb3VyY2UpKTtcclxuXHJcbiAgICAgICAgbmFtZUNlbGwuaW5uZXJIVE1MID0gZGF0YVNvdXJjZS5uYW1lO1xyXG4gICAgICAgIHJlZnJlc2hDZWxsLmFwcGVuZENoaWxkKHJlZnJlc2hCdXR0b24pO1xyXG4gICAgICAgIGluZm9DZWxsLmFwcGVuZENoaWxkKGluZm9TcGFuKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBEYXRhU291cmNlcyBleHRlbnNpb24uJyk7XHJcbiAgYXdhaXQgbmV3IERhdGFTb3VyY2VzKCQpLmluaXRpYWxpemUoKTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9