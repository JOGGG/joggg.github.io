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
    class Filtering {
        // Avoid globals
        constructor(_$) {
            this._$ = _$;
            this.unregisterHandlerFunctions = [];
        }
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            // Fetch Filters
            this.fetchFilters();
            // Add button handlers for clearing filters.
            this._$('#clear').click(() => this.clearAllFilters());
        }
        async fetchFilters() {
            // While performing async task, show loading message to user.
            this._$('#loading').addClass('show');
            // Since filter info is attached to the worksheet, we will perform
            // one async call per worksheet to get every filter used in this
            // dashboard.  This demonstrates the use of Promise.all to combine
            // promises together and wait for each of them to resolve.
            const filterFetchPromises = [];
            // List of all filters in a dashboard.
            const dashboardfilters = [];
            // To get filter info, first get the dashboard.
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            // Whenever we restore the filters table, remove all save handling functions,
            // since we add them back later in fetchFilters()
            this.unregisterHandlerFunctions.forEach(function (unregisterHandlerFunction) {
                unregisterHandlerFunction();
            });
            this.unregisterHandlerFunctions = [];
            // Then loop through each worksheet and get its filters, save promise for later.
            dashboard.worksheets.forEach(function (worksheet) {
                filterFetchPromises.push(worksheet.getFiltersAsync());
                // Add filter event to each worksheet.  AddEventListener returns a function that will
                // remove the event listener when called.
                const unregisterHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.FilterChanged, (event) => this.filterChangedHandler(event));
                this.unregisterHandlerFunctions.push(unregisterHandlerFunction);
            }, this);
            // Now, we call every filter fetch promise, and wait for all the results
            // to finish before displaying the results to the user.
            const fetchResults = await Promise.all(filterFetchPromises);
            fetchResults.forEach(function (filtersForWorksheet) {
                filtersForWorksheet.forEach(function (filter) {
                    dashboardfilters.push(filter);
                });
            });
            this.buildFiltersTable(dashboardfilters);
        }
        // This is a handling function that is called anytime a filter is changed in Tableau.
        filterChangedHandler(filterEvent) {
            // Just reconstruct the filters table whenever a filter changes.
            // This could be optimized to add/remove only the different filters.
            this.fetchFilters();
        }
        // Constructs UI that displays all the dataSources in this dashboard
        // given a mapping from dataSourceId to dataSource objects.
        buildFiltersTable(filters) {
            // Clear the table first.
            this._$('#filtersTable > tbody tr').remove();
            const filtersTable = this._$('#filtersTable > tbody')[0];
            filters.forEach(function (filter) {
                // @ts-ignore
                const newRow = filtersTable.insertRow(filtersTable.rows.length);
                const nameCell = newRow.insertCell(0);
                const worksheetCell = newRow.insertCell(1);
                const typeCell = newRow.insertCell(2);
                const valuesCell = newRow.insertCell(3);
                const valueStr = this.getFilterValues(filter);
                nameCell.innerHTML = filter.fieldName;
                worksheetCell.innerHTML = filter.worksheetName;
                typeCell.innerHTML = filter.filterType;
                valuesCell.innerHTML = valueStr;
            }, this);
            this.updateUIState(Object.keys(filters).length > 0);
        }
        // This returns a string representation of the values a filter is set to.
        // Depending on the type of filter, this string will take a different form.
        getFilterValues(filter) {
            let filterValues = '';
            switch (filter.filterType) {
                case tableau.FilterType.Categorical:
                    const categoricalFilter = filter;
                    categoricalFilter.appliedValues.forEach(function (value) {
                        filterValues += value.formattedValue + ', ';
                    });
                    break;
                case tableau.FilterType.Range:
                    // A range filter can have a min and/or a max.
                    const rangeFilter = filter;
                    if (rangeFilter.minValue) {
                        filterValues += 'min: ' + rangeFilter.minValue.formattedValue + ', ';
                    }
                    if (rangeFilter.maxValue) {
                        filterValues += 'min: ' + rangeFilter.maxValue.formattedValue + ', ';
                    }
                    break;
                case tableau.FilterType.RelativeDate:
                    const relDateFilter = filter;
                    filterValues += 'Period: ' + relDateFilter.periodType + ', ';
                    filterValues += 'RangeN: ' + relDateFilter.rangeN + ', ';
                    filterValues += 'Range Type: ' + relDateFilter.rangeType + ', ';
                    break;
                default:
            }
            // Cut off the trailing ", "
            return filterValues.slice(0, -2);
        }
        // This function removes all filters from a dashboard.
        clearAllFilters() {
            // While performing async task, show loading message to user.
            this._$('#loading').removeClass('hidden').addClass('show');
            this._$('#filtersTable').removeClass('show').addClass('hidden');
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            dashboard.worksheets.forEach(function (worksheet) {
                worksheet.getFiltersAsync().then(async (filtersForWorksheet) => {
                    const filterClearPromises = [];
                    filtersForWorksheet.forEach(function (filter) {
                        filterClearPromises.push(worksheet.clearFilterAsync(filter.fieldName));
                    });
                    // Same pattern as in fetchFilters, wait until all promises have finished
                    // before updating the UI state.
                    await Promise.allSettled(filterClearPromises);
                    this.updateUIState(false);
                });
            }, this);
        }
        // This helper updates the UI depending on whether or not there are filters
        // that exist in the dashboard.  Accepts a boolean.
        updateUIState(filtersExist) {
            this._$('#loading').addClass('hidden');
            if (filtersExist) {
                this._$('#filtersTable').removeClass('hidden').addClass('show');
                this._$('#noFiltersWarning').removeClass('show').addClass('hidden');
            }
            else {
                this._$('#noFiltersWarning').removeClass('hidden').addClass('show');
                this._$('#filtersTable').removeClass('show').addClass('hidden');
            }
        }
    }
    console.log('Initializing Filtering extension.');
    await new Filtering($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2RTtpQkFBTTtnQkFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25FO1FBQ0wsQ0FBQztLQUVKO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDeEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbnMtYXBpLXNkay8uL1NhbXBsZXMtVHlwZXNjcmlwdC9GaWx0ZXJpbmcvZmlsdGVyaW5nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDYXRlZ29yaWNhbEZpbHRlcixcclxuICAgIEZpbHRlcixcclxuICAgIFJhbmdlRmlsdGVyLFxyXG4gICAgUmVsYXRpdmVEYXRlRmlsdGVyLFxyXG4gICAgVGFibGVhdUV2ZW50XHJcbn0gZnJvbSAnQHRhYmxlYXUvZXh0ZW5zaW9ucy1hcGktdHlwZXMnO1xyXG5cclxuLy8gV3JhcCBldmVyeXRoaW5nIGluIGFuIGFub255bW91cyBmdW5jdGlvbiB0byBhdm9pZCBwb2xsdXRpbmcgdGhlIGdsb2JhbCBuYW1lc3BhY2VcclxuKGFzeW5jICgpID0+IHtcclxuICAgIGNsYXNzIEZpbHRlcmluZyB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdW5yZWdpc3RlckhhbmRsZXJGdW5jdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gQXZvaWQgZ2xvYmFsc1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgXyQ6IEpRdWVyeVN0YXRpYykgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV2FpdGluZyBmb3IgRE9NIHJlYWR5Jyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuXyQucmVhZHk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIGV4dGVuc2lvbiBBUEknKTtcclxuICAgICAgICAgICAgYXdhaXQgdGFibGVhdS5leHRlbnNpb25zLmluaXRpYWxpemVBc3luYygpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmV0Y2ggRmlsdGVyc1xyXG4gICAgICAgICAgICB0aGlzLmZldGNoRmlsdGVycygpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBoYW5kbGVycyBmb3IgY2xlYXJpbmcgZmlsdGVycy5cclxuICAgICAgICAgICAgdGhpcy5fJCgnI2NsZWFyJykuY2xpY2soKCkgPT4gdGhpcy5jbGVhckFsbEZpbHRlcnMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGFzeW5jIGZldGNoRmlsdGVycygpIHtcclxuICAgICAgICAgICAgLy8gV2hpbGUgcGVyZm9ybWluZyBhc3luYyB0YXNrLCBzaG93IGxvYWRpbmcgbWVzc2FnZSB0byB1c2VyLlxyXG4gICAgICAgICAgICB0aGlzLl8kKCcjbG9hZGluZycpLmFkZENsYXNzKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaW5jZSBmaWx0ZXIgaW5mbyBpcyBhdHRhY2hlZCB0byB0aGUgd29ya3NoZWV0LCB3ZSB3aWxsIHBlcmZvcm1cclxuICAgICAgICAgICAgLy8gb25lIGFzeW5jIGNhbGwgcGVyIHdvcmtzaGVldCB0byBnZXQgZXZlcnkgZmlsdGVyIHVzZWQgaW4gdGhpc1xyXG4gICAgICAgICAgICAvLyBkYXNoYm9hcmQuICBUaGlzIGRlbW9uc3RyYXRlcyB0aGUgdXNlIG9mIFByb21pc2UuYWxsIHRvIGNvbWJpbmVcclxuICAgICAgICAgICAgLy8gcHJvbWlzZXMgdG9nZXRoZXIgYW5kIHdhaXQgZm9yIGVhY2ggb2YgdGhlbSB0byByZXNvbHZlLlxyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJGZXRjaFByb21pc2VzOiBBcnJheTxQcm9taXNlPEZpbHRlcltdPj4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIExpc3Qgb2YgYWxsIGZpbHRlcnMgaW4gYSBkYXNoYm9hcmQuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhc2hib2FyZGZpbHRlcnM6IEZpbHRlcltdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBUbyBnZXQgZmlsdGVyIGluZm8sIGZpcnN0IGdldCB0aGUgZGFzaGJvYXJkLlxyXG4gICAgICAgICAgICBjb25zdCBkYXNoYm9hcmQgPSB0YWJsZWF1LmV4dGVuc2lvbnMuZGFzaGJvYXJkQ29udGVudC5kYXNoYm9hcmQ7XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuZXZlciB3ZSByZXN0b3JlIHRoZSBmaWx0ZXJzIHRhYmxlLCByZW1vdmUgYWxsIHNhdmUgaGFuZGxpbmcgZnVuY3Rpb25zLFxyXG4gICAgICAgICAgICAvLyBzaW5jZSB3ZSBhZGQgdGhlbSBiYWNrIGxhdGVyIGluIGZldGNoRmlsdGVycygpXHJcbiAgICAgICAgICAgIHRoaXMudW5yZWdpc3RlckhhbmRsZXJGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbih1bnJlZ2lzdGVySGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB1bnJlZ2lzdGVySGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVySGFuZGxlckZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAvLyBUaGVuIGxvb3AgdGhyb3VnaCBlYWNoIHdvcmtzaGVldCBhbmQgZ2V0IGl0cyBmaWx0ZXJzLCBzYXZlIHByb21pc2UgZm9yIGxhdGVyLlxyXG4gICAgICAgICAgICBkYXNoYm9hcmQud29ya3NoZWV0cy5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtzaGVldCkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRmV0Y2hQcm9taXNlcy5wdXNoKHdvcmtzaGVldC5nZXRGaWx0ZXJzQXN5bmMoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGZpbHRlciBldmVudCB0byBlYWNoIHdvcmtzaGVldC4gIEFkZEV2ZW50TGlzdGVuZXIgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbFxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciB3aGVuIGNhbGxlZC5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVucmVnaXN0ZXJIYW5kbGVyRnVuY3Rpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtzaGVldC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZWF1LlRhYmxlYXVFdmVudFR5cGUuRmlsdGVyQ2hhbmdlZCwgKGV2ZW50KSA9PiB0aGlzLmZpbHRlckNoYW5nZWRIYW5kbGVyKGV2ZW50KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXJIYW5kbGVyRnVuY3Rpb25zLnB1c2godW5yZWdpc3RlckhhbmRsZXJGdW5jdGlvbik7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTm93LCB3ZSBjYWxsIGV2ZXJ5IGZpbHRlciBmZXRjaCBwcm9taXNlLCBhbmQgd2FpdCBmb3IgYWxsIHRoZSByZXN1bHRzXHJcbiAgICAgICAgICAgIC8vIHRvIGZpbmlzaCBiZWZvcmUgZGlzcGxheWluZyB0aGUgcmVzdWx0cyB0byB0aGUgdXNlci5cclxuICAgICAgICAgICAgY29uc3QgZmV0Y2hSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsdGVyRmV0Y2hQcm9taXNlcyk7XHJcbiAgICAgICAgICAgIGZldGNoUmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGZpbHRlcnNGb3JXb3Jrc2hlZXQpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNGb3JXb3Jrc2hlZXQuZm9yRWFjaChmdW5jdGlvbihmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXNoYm9hcmRmaWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRGaWx0ZXJzVGFibGUoZGFzaGJvYXJkZmlsdGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGlzIGEgaGFuZGxpbmcgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYW55dGltZSBhIGZpbHRlciBpcyBjaGFuZ2VkIGluIFRhYmxlYXUuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJDaGFuZ2VkSGFuZGxlcihmaWx0ZXJFdmVudDogVGFibGVhdUV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIEp1c3QgcmVjb25zdHJ1Y3QgdGhlIGZpbHRlcnMgdGFibGUgd2hlbmV2ZXIgYSBmaWx0ZXIgY2hhbmdlcy5cclxuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgdG8gYWRkL3JlbW92ZSBvbmx5IHRoZSBkaWZmZXJlbnQgZmlsdGVycy5cclxuICAgICAgICAgICAgdGhpcy5mZXRjaEZpbHRlcnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbnN0cnVjdHMgVUkgdGhhdCBkaXNwbGF5cyBhbGwgdGhlIGRhdGFTb3VyY2VzIGluIHRoaXMgZGFzaGJvYXJkXHJcbiAgICAgICAgLy8gZ2l2ZW4gYSBtYXBwaW5nIGZyb20gZGF0YVNvdXJjZUlkIHRvIGRhdGFTb3VyY2Ugb2JqZWN0cy5cclxuICAgICAgICBwcml2YXRlIGJ1aWxkRmlsdGVyc1RhYmxlKGZpbHRlcnM6IEZpbHRlcltdKSB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSB0YWJsZSBmaXJzdC5cclxuICAgICAgICAgICAgdGhpcy5fJCgnI2ZpbHRlcnNUYWJsZSA+IHRib2R5IHRyJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcnNUYWJsZSA9IHRoaXMuXyQoJyNmaWx0ZXJzVGFibGUgPiB0Ym9keScpWzBdO1xyXG5cclxuICAgICAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZ1bmN0aW9uKGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gZmlsdGVyc1RhYmxlLmluc2VydFJvdyhmaWx0ZXJzVGFibGUucm93cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUNlbGwgPSBuZXdSb3cuaW5zZXJ0Q2VsbCgwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtzaGVldENlbGwgPSBuZXdSb3cuaW5zZXJ0Q2VsbCgxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVDZWxsID0gbmV3Um93Lmluc2VydENlbGwoMik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXNDZWxsID0gbmV3Um93Lmluc2VydENlbGwoMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVTdHIgPSB0aGlzLmdldEZpbHRlclZhbHVlcyhmaWx0ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5hbWVDZWxsLmlubmVySFRNTCA9IGZpbHRlci5maWVsZE5hbWU7XHJcbiAgICAgICAgICAgICAgICB3b3Jrc2hlZXRDZWxsLmlubmVySFRNTCA9IGZpbHRlci53b3Jrc2hlZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgdHlwZUNlbGwuaW5uZXJIVE1MID0gZmlsdGVyLmZpbHRlclR5cGU7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXNDZWxsLmlubmVySFRNTCA9IHZhbHVlU3RyO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUlTdGF0ZShPYmplY3Qua2V5cyhmaWx0ZXJzKS5sZW5ndGggPiAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgcmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWVzIGEgZmlsdGVyIGlzIHNldCB0by5cclxuICAgICAgICAvLyBEZXBlbmRpbmcgb24gdGhlIHR5cGUgb2YgZmlsdGVyLCB0aGlzIHN0cmluZyB3aWxsIHRha2UgYSBkaWZmZXJlbnQgZm9ybS5cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlclZhbHVlcyhmaWx0ZXI6IEZpbHRlcikge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWVzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKGZpbHRlci5maWx0ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRhYmxlYXUuRmlsdGVyVHlwZS5DYXRlZ29yaWNhbDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yaWNhbEZpbHRlciA9IGZpbHRlciBhcyBDYXRlZ29yaWNhbEZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbEZpbHRlci5hcHBsaWVkVmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzICs9IHZhbHVlLmZvcm1hdHRlZFZhbHVlICsgJywgJztcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGFibGVhdS5GaWx0ZXJUeXBlLlJhbmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEEgcmFuZ2UgZmlsdGVyIGNhbiBoYXZlIGEgbWluIGFuZC9vciBhIG1heC5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZUZpbHRlciA9IGZpbHRlciBhcyBSYW5nZUZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2VGaWx0ZXIubWluVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzICs9ICdtaW46ICcgKyByYW5nZUZpbHRlci5taW5WYWx1ZS5mb3JtYXR0ZWRWYWx1ZSArICcsICc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2VGaWx0ZXIubWF4VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzICs9ICdtaW46ICcgKyByYW5nZUZpbHRlci5tYXhWYWx1ZS5mb3JtYXR0ZWRWYWx1ZSArICcsICc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YWJsZWF1LkZpbHRlclR5cGUuUmVsYXRpdmVEYXRlOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbERhdGVGaWx0ZXIgPSBmaWx0ZXIgYXMgUmVsYXRpdmVEYXRlRmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlcyArPSAnUGVyaW9kOiAnICsgcmVsRGF0ZUZpbHRlci5wZXJpb2RUeXBlICsgJywgJztcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXMgKz0gJ1JhbmdlTjogJyArIHJlbERhdGVGaWx0ZXIucmFuZ2VOICsgJywgJztcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXMgKz0gJ1JhbmdlIFR5cGU6ICcgKyByZWxEYXRlRmlsdGVyLnJhbmdlVHlwZSArICcsICc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDdXQgb2ZmIHRoZSB0cmFpbGluZyBcIiwgXCJcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclZhbHVlcy5zbGljZSgwLCAtMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgYWxsIGZpbHRlcnMgZnJvbSBhIGRhc2hib2FyZC5cclxuICAgICAgICBwcml2YXRlIGNsZWFyQWxsRmlsdGVycygpIHtcclxuICAgICAgICAgICAgLy8gV2hpbGUgcGVyZm9ybWluZyBhc3luYyB0YXNrLCBzaG93IGxvYWRpbmcgbWVzc2FnZSB0byB1c2VyLlxyXG4gICAgICAgICAgICB0aGlzLl8kKCcjbG9hZGluZycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKS5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICB0aGlzLl8kKCcjZmlsdGVyc1RhYmxlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkYXNoYm9hcmQgPSB0YWJsZWF1LmV4dGVuc2lvbnMuZGFzaGJvYXJkQ29udGVudC5kYXNoYm9hcmQ7XHJcblxyXG4gICAgICAgICAgICBkYXNoYm9hcmQud29ya3NoZWV0cy5mb3JFYWNoKGZ1bmN0aW9uKHdvcmtzaGVldCkge1xyXG4gICAgICAgICAgICAgICAgd29ya3NoZWV0LmdldEZpbHRlcnNBc3luYygpLnRoZW4oYXN5bmMgKGZpbHRlcnNGb3JXb3Jrc2hlZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDbGVhclByb21pc2VzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnNGb3JXb3Jrc2hlZXQuZm9yRWFjaChmdW5jdGlvbihmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ2xlYXJQcm9taXNlcy5wdXNoKHdvcmtzaGVldC5jbGVhckZpbHRlckFzeW5jKGZpbHRlci5maWVsZE5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FtZSBwYXR0ZXJuIGFzIGluIGZldGNoRmlsdGVycywgd2FpdCB1bnRpbCBhbGwgcHJvbWlzZXMgaGF2ZSBmaW5pc2hlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlZm9yZSB1cGRhdGluZyB0aGUgVUkgc3RhdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKGZpbHRlckNsZWFyUHJvbWlzZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUlTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGhlbHBlciB1cGRhdGVzIHRoZSBVSSBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3QgdGhlcmUgYXJlIGZpbHRlcnNcclxuICAgICAgICAvLyB0aGF0IGV4aXN0IGluIHRoZSBkYXNoYm9hcmQuICBBY2NlcHRzIGEgYm9vbGVhbi5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVVJU3RhdGUoZmlsdGVyc0V4aXN0OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuXyQoJyNsb2FkaW5nJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyc0V4aXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl8kKCcjZmlsdGVyc1RhYmxlJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl8kKCcjbm9GaWx0ZXJzV2FybmluZycpLnJlbW92ZUNsYXNzKCdzaG93JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fJCgnI25vRmlsdGVyc1dhcm5pbmcnKS5yZW1vdmVDbGFzcygnaGlkZGVuJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuXyQoJyNmaWx0ZXJzVGFibGUnKS5yZW1vdmVDbGFzcygnc2hvdycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBGaWx0ZXJpbmcgZXh0ZW5zaW9uLicpO1xyXG4gICAgYXdhaXQgbmV3IEZpbHRlcmluZygkKS5pbml0aWFsaXplKCk7XHJcbn0pKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==