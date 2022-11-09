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
    class Parameters {
        // Avoid globals
        constructor(_$) {
            this._$ = _$;
        }
        // This is the entry point into the extension.  It initializes the Tableau Extensions Api, and then
        // grabs all of the parameters in the workbook, processing each one individually.
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            const table = this._$('#parameterTable');
            const tableBody = table.children('tbody');
            const parameters = await tableau.extensions.dashboardContent.dashboard.getParametersAsync();
            parameters.forEach(function (p) {
                p.addEventListener(tableau.TableauEventType.ParameterChanged, (event) => this.onParameterChange(event));
                this.parameterRow(p).appendTo(tableBody);
            }, this);
            // This is used to manipulate what part of the UI is visible.  If there are no parameters
            // found, we want to give you a message to tell you that you need to add one, otherwise, we
            // show the table we created.
            this._$('#loading').addClass('hidden');
            if (parameters.length === 0) {
                this._$('#addParameterWarning').removeClass('hidden').addClass('show');
            }
            else {
                this._$('#parameterTable').removeClass('hidden').addClass('show');
            }
        }
        // When the parameter is changed, we recreate the row with the updated values.  This keeps the code
        // clean, and emulates the approach that something like React does where it "rerenders" the UI with
        // the updated data.
        //
        // To avoid multiple layout processing in the browser, we build the new row unattached to the DOM,
        // and then attach it at the very end.  This helps avoid jank.
        onParameterChange(parameterChangeEvent) {
            parameterChangeEvent.getParameterAsync().then(function (param) {
                const newRow = this.parameterRow(param);
                // tslint:disable-next-line:quotemark
                const oldRow = this._$("tr[data-fieldname='" + param.id + "'");
                oldRow.replaceWith(newRow);
            });
        }
        //
        // DOM creation methods
        //
        // A cell in the table
        cell(value) {
            const row = this._$('<td>');
            row.append(value);
            return row;
        }
        // A simple cell that contains a text value
        textCell(value) {
            const cellElement = this._$('<td>');
            cellElement.text(value);
            return cellElement;
        }
        // The allowable values column has a complex structure, so to make things easier/cleaner,
        // this function creates the subtree for the value of the allowable values column.
        allowableValues(value) {
            function termKey(key) {
                return $('<dt>').attr('id', key).text(key);
            }
            function termValue(termVal, termDefault) {
                return $('<dd>').text(termVal || termDefault);
            }
            const allowable = this._$('<dl class="dl-horizontal">');
            switch (value.type) {
                case tableau.ParameterValueType.All:
                    allowable.append(termKey('Restrictions'));
                    allowable.append(termValue('None', ''));
                    break;
                case tableau.ParameterValueType.List:
                    value.allowableValues.forEach(function (allowableValue) {
                        allowable.append(termKey('List Value'));
                        allowable.append(termValue(allowableValue.formattedValue, ''));
                    });
                    break;
                case tableau.ParameterValueType.Range:
                    allowable.append(termKey('Min Value'));
                    allowable.append(termValue(value.minValue.formattedValue, 'No Min'));
                    allowable.append(termKey('Max Value'));
                    allowable.append(termValue(value.maxValue.formattedValue, 'No Max'));
                    allowable.append(termKey('Step Size'));
                    allowable.append(termValue(value.stepSize, 'default'));
                    break;
                default:
                    console.error('Unknown Parameter value type: ' + value.type);
            }
            return allowable;
        }
        // This function creates a subtree of a row for a specific parameter.
        parameterRow(p) {
            const row = this._$('<tr>').attr('data-fieldname', p.id);
            row.append(this.textCell(p.name));
            row.append(this.textCell(p.dataType));
            row.append(this.textCell(p.currentValue.formattedValue));
            row.append(this.cell(this.allowableValues(p.allowableValues)));
            return row;
        }
    }
    console.log('Initializing Parameters extension.');
    await new Parameters($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN6RCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9ELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUNKO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDekMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbnMtYXBpLXNkay8uL1NhbXBsZXMtVHlwZXNjcmlwdC9QYXJhbWV0ZXJzL3BhcmFtZXRlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERhdGFUeXBlLFxyXG4gICAgUGFyYW1ldGVyLFxyXG4gICAgUGFyYW1ldGVyQ2hhbmdlZEV2ZW50LFxyXG4gICAgUGFyYW1ldGVyRG9tYWluUmVzdHJpY3Rpb25cclxufSBmcm9tICdAdGFibGVhdS9leHRlbnNpb25zLWFwaS10eXBlcyc7XHJcblxyXG4vLyBXcmFwIGV2ZXJ5dGhpbmcgaW4gYW4gYW5vbnltb3VzIGZ1bmN0aW9uIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgZ2xvYmFsIG5hbWVzcGFjZVxyXG4oYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgIGNsYXNzIFBhcmFtZXRlcnMge1xyXG4gICAgICAgIC8vIEF2b2lkIGdsb2JhbHNcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF8kOiBKUXVlcnlTdGF0aWMpIHsgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBpbnRvIHRoZSBleHRlbnNpb24uICBJdCBpbml0aWFsaXplcyB0aGUgVGFibGVhdSBFeHRlbnNpb25zIEFwaSwgYW5kIHRoZW5cclxuICAgICAgICAvLyBncmFicyBhbGwgb2YgdGhlIHBhcmFtZXRlcnMgaW4gdGhlIHdvcmtib29rLCBwcm9jZXNzaW5nIGVhY2ggb25lIGluZGl2aWR1YWxseS5cclxuICAgICAgICBwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhaXRpbmcgZm9yIERPTSByZWFkeScpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl8kLnJlYWR5O1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBleHRlbnNpb24gQVBJJyk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRhYmxlYXUuZXh0ZW5zaW9ucy5pbml0aWFsaXplQXN5bmMoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy5fJCgnI3BhcmFtZXRlclRhYmxlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IHRhYmxlLmNoaWxkcmVuKCd0Ym9keScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IGF3YWl0IHRhYmxlYXUuZXh0ZW5zaW9ucy5kYXNoYm9hcmRDb250ZW50LmRhc2hib2FyZC5nZXRQYXJhbWV0ZXJzQXN5bmMoKTtcclxuICAgICAgICAgICAgcGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcclxuICAgICAgICAgICAgICAgIHAuYWRkRXZlbnRMaXN0ZW5lcih0YWJsZWF1LlRhYmxlYXVFdmVudFR5cGUuUGFyYW1ldGVyQ2hhbmdlZCwgKGV2ZW50KSA9PiB0aGlzLm9uUGFyYW1ldGVyQ2hhbmdlKGV2ZW50KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlclJvdyhwKS5hcHBlbmRUbyh0YWJsZUJvZHkpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBtYW5pcHVsYXRlIHdoYXQgcGFydCBvZiB0aGUgVUkgaXMgdmlzaWJsZS4gIElmIHRoZXJlIGFyZSBubyBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIC8vIGZvdW5kLCB3ZSB3YW50IHRvIGdpdmUgeW91IGEgbWVzc2FnZSB0byB0ZWxsIHlvdSB0aGF0IHlvdSBuZWVkIHRvIGFkZCBvbmUsIG90aGVyd2lzZSwgd2VcclxuICAgICAgICAgICAgLy8gc2hvdyB0aGUgdGFibGUgd2UgY3JlYXRlZC5cclxuICAgICAgICAgICAgdGhpcy5fJCgnI2xvYWRpbmcnKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fJCgnI2FkZFBhcmFtZXRlcldhcm5pbmcnKS5yZW1vdmVDbGFzcygnaGlkZGVuJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuXyQoJyNwYXJhbWV0ZXJUYWJsZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKS5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgcGFyYW1ldGVyIGlzIGNoYW5nZWQsIHdlIHJlY3JlYXRlIHRoZSByb3cgd2l0aCB0aGUgdXBkYXRlZCB2YWx1ZXMuICBUaGlzIGtlZXBzIHRoZSBjb2RlXHJcbiAgICAgICAgLy8gY2xlYW4sIGFuZCBlbXVsYXRlcyB0aGUgYXBwcm9hY2ggdGhhdCBzb21ldGhpbmcgbGlrZSBSZWFjdCBkb2VzIHdoZXJlIGl0IFwicmVyZW5kZXJzXCIgdGhlIFVJIHdpdGhcclxuICAgICAgICAvLyB0aGUgdXBkYXRlZCBkYXRhLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gVG8gYXZvaWQgbXVsdGlwbGUgbGF5b3V0IHByb2Nlc3NpbmcgaW4gdGhlIGJyb3dzZXIsIHdlIGJ1aWxkIHRoZSBuZXcgcm93IHVuYXR0YWNoZWQgdG8gdGhlIERPTSxcclxuICAgICAgICAvLyBhbmQgdGhlbiBhdHRhY2ggaXQgYXQgdGhlIHZlcnkgZW5kLiAgVGhpcyBoZWxwcyBhdm9pZCBqYW5rLlxyXG4gICAgICAgIHByaXZhdGUgb25QYXJhbWV0ZXJDaGFuZ2UocGFyYW1ldGVyQ2hhbmdlRXZlbnQ6IFBhcmFtZXRlckNoYW5nZWRFdmVudCkge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJDaGFuZ2VFdmVudC5nZXRQYXJhbWV0ZXJBc3luYygpLnRoZW4oZnVuY3Rpb24ocGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHRoaXMucGFyYW1ldGVyUm93KHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpxdW90ZW1hcmtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFJvdyA9IHRoaXMuXyQoXCJ0cltkYXRhLWZpZWxkbmFtZT0nXCIgKyBwYXJhbS5pZCArIFwiJ1wiKTtcclxuICAgICAgICAgICAgICAgIG9sZFJvdy5yZXBsYWNlV2l0aChuZXdSb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gRE9NIGNyZWF0aW9uIG1ldGhvZHNcclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICAvLyBBIGNlbGwgaW4gdGhlIHRhYmxlXHJcbiAgICAgICAgcHJpdmF0ZSBjZWxsKHZhbHVlOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuXyQoJzx0ZD4nKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBIHNpbXBsZSBjZWxsIHRoYXQgY29udGFpbnMgYSB0ZXh0IHZhbHVlXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXh0Q2VsbCh2YWx1ZTogc3RyaW5nIHwgRGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB0aGlzLl8kKCc8dGQ+Jyk7XHJcbiAgICAgICAgICAgIGNlbGxFbGVtZW50LnRleHQodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2VsbEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgYWxsb3dhYmxlIHZhbHVlcyBjb2x1bW4gaGFzIGEgY29tcGxleCBzdHJ1Y3R1cmUsIHNvIHRvIG1ha2UgdGhpbmdzIGVhc2llci9jbGVhbmVyLFxyXG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gY3JlYXRlcyB0aGUgc3VidHJlZSBmb3IgdGhlIHZhbHVlIG9mIHRoZSBhbGxvd2FibGUgdmFsdWVzIGNvbHVtbi5cclxuICAgICAgICBwcml2YXRlIGFsbG93YWJsZVZhbHVlcyh2YWx1ZTogUGFyYW1ldGVyRG9tYWluUmVzdHJpY3Rpb24pIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gdGVybUtleShrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJzxkdD4nKS5hdHRyKCdpZCcsIGtleSkudGV4dChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXJtVmFsdWUodGVybVZhbDogc3RyaW5nIHwgbnVtYmVyLCB0ZXJtRGVmYXVsdDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnPGRkPicpLnRleHQodGVybVZhbCB8fCB0ZXJtRGVmYXVsdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbG93YWJsZSA9IHRoaXMuXyQoJzxkbCBjbGFzcz1cImRsLWhvcml6b250YWxcIj4nKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YWJsZWF1LlBhcmFtZXRlclZhbHVlVHlwZS5BbGw6XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dhYmxlLmFwcGVuZCh0ZXJtS2V5KCdSZXN0cmljdGlvbnMnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dhYmxlLmFwcGVuZCh0ZXJtVmFsdWUoJ05vbmUnLCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YWJsZWF1LlBhcmFtZXRlclZhbHVlVHlwZS5MaXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmFsbG93YWJsZVZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKGFsbG93YWJsZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybUtleSgnTGlzdCBWYWx1ZScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dhYmxlLmFwcGVuZCh0ZXJtVmFsdWUoYWxsb3dhYmxlVmFsdWUuZm9ybWF0dGVkVmFsdWUsICcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRhYmxlYXUuUGFyYW1ldGVyVmFsdWVUeXBlLlJhbmdlOlxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybUtleSgnTWluIFZhbHVlJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybVZhbHVlKHZhbHVlLm1pblZhbHVlLmZvcm1hdHRlZFZhbHVlLCAnTm8gTWluJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybUtleSgnTWF4IFZhbHVlJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybVZhbHVlKHZhbHVlLm1heFZhbHVlLmZvcm1hdHRlZFZhbHVlLCAnTm8gTWF4JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybUtleSgnU3RlcCBTaXplJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93YWJsZS5hcHBlbmQodGVybVZhbHVlKHZhbHVlLnN0ZXBTaXplLCAnZGVmYXVsdCcpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBQYXJhbWV0ZXIgdmFsdWUgdHlwZTogJyArIHZhbHVlLnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWxsb3dhYmxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEgc3VidHJlZSBvZiBhIHJvdyBmb3IgYSBzcGVjaWZpYyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbWV0ZXJSb3cocDogUGFyYW1ldGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuXyQoJzx0cj4nKS5hdHRyKCdkYXRhLWZpZWxkbmFtZScsIHAuaWQpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kKHRoaXMudGV4dENlbGwocC5uYW1lKSk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmQodGhpcy50ZXh0Q2VsbChwLmRhdGFUeXBlKSk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmQodGhpcy50ZXh0Q2VsbChwLmN1cnJlbnRWYWx1ZS5mb3JtYXR0ZWRWYWx1ZSkpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kKHRoaXMuY2VsbCh0aGlzLmFsbG93YWJsZVZhbHVlcyhwLmFsbG93YWJsZVZhbHVlcykpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgUGFyYW1ldGVycyBleHRlbnNpb24uJyk7XHJcbiAgICBhd2FpdCBuZXcgUGFyYW1ldGVycygkKS5pbml0aWFsaXplKCk7XHJcbn0pKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==