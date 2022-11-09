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
    class DashboardLayout {
        // Avoid globals.
        constructor(_$) {
            this._$ = _$;
        }
        /**
         * Initializes the extension
         */
        async initialize() {
            console.log('Waiting for DOM ready');
            await this._$.ready;
            console.log('Initializing extension API');
            await tableau.extensions.initializeAsync();
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            this.dashboardObjects = dashboard.objects;
            console.log(this.dashboardObjects);
            // enabling dashboard event button
            this._$('#dashboard-event-btn').prop('disabled', false);
            this._$('#dashboard-event-btn').click(this.onEventButtonClick.bind(this));
        }
        // When changes are made to the dashboard we get all the details for each of the
        // dashboard objects that were changed and compare it with their previous values.
        // The dashboardLayoutChangeDetails property is a map of dashboard obj3ct ids to
        // an array of dashboard layout changes.
        // Dashboard layout change events are invoked when dashboard objects are resized,
        // repositioned, added, and more. See DashboardLayoutChange in the API documentation
        // for all possible actions.
        // Extension reloads when worksheets are added / removed.
        onDashboardLayoutChange(event) {
            console.log(event);
            const dashboardEvent = event;
            const dashboardEventDetails = dashboardEvent.dashboardLayoutChangeDetails;
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            // updating dashboard objects and storing the previous dashboard objects for referrence.
            const oldDashboardObjects = this.dashboardObjects;
            this.dashboardObjects = dashboard.objects;
            // An empty dashboard layout change event may be invoked when loading an extension from the manifest.
            // In this case we ignore it and return.
            if (dashboardEventDetails === undefined || dashboardEventDetails.size === 0) {
                return;
            }
            // Emptying previous content from the UI's change list.
            this._$('#dashboard-layout-change-list').empty();
            // Updating UI's change list to display information on the current dashboard event.
            dashboardEventDetails.forEach((changesMade, dashboardObjectId) => {
                // getting dashboard object from its id
                const dashboardObject = dashboard.getDashboardObjectById(dashboardObjectId);
                // building a div for the changes made to this dashboard object.
                const changesDiv = this._$('<div>');
                // checking if this dashboard object was added as part of the event.
                if (changesMade.includes(tableau.DashboardLayoutChange.Added)) {
                    const toAppend = this._$('<h6/>');
                    toAppend.text(`Dashboard Object ${dashboardObjectId} added: "${dashboardObject.name}"`);
                    changesDiv.append(toAppend);
                    this._$('#dashboard-layout-change-list').append(changesDiv);
                    return;
                }
                // getting old dashboard object before event to compare it with the current one.
                const oldDashboardObject = oldDashboardObjects.find(o => o.id === dashboardObjectId);
                // checking if this dashboard object was removed as part of the event.
                if (changesMade.includes(tableau.DashboardLayoutChange.Removed)) {
                    const toAppend = this._$('<h6/>');
                    toAppend.text(`Dashboard Object ${dashboardObjectId} removed: "${oldDashboardObject.name}"`);
                    changesDiv.append(toAppend);
                    this._$('#dashboard-layout-change-list').append(changesDiv);
                    return;
                }
                // the following dashboard changes are not mutually exclusive, so we list them together.
                const h6 = this._$('<h6/>');
                h6.text(`Dashboard Object ${dashboardObjectId}: "${dashboardObject.name}"`);
                changesDiv.append(h6);
                const ul = this._$('<ul/>');
                // checking if the dashboard object had changes to its floating state.
                if (changesMade.includes(tableau.DashboardLayoutChange.IsFloatingChanged)) {
                    const li = this._$('<li/>');
                    li.text(`Floating is now ${dashboardObject.isFloating}, was ${oldDashboardObject.isFloating}`);
                    ul.append(li);
                }
                // checking if the dashbaord object had changes to its visibility.
                if (changesMade.includes(tableau.DashboardLayoutChange.IsVisibleChanged)) {
                    const li = this._$('<li/>');
                    li.text(`Visibility is now ${dashboardObject.isVisible}, was ${oldDashboardObject.isVisible}`);
                    ul.append(li);
                }
                // checking if the dashboard object was repositioned.
                if (changesMade.includes(tableau.DashboardLayoutChange.PositionChanged)) {
                    const li = this._$('<li/>');
                    const newPos = dashboardObject.position;
                    const oldPos = oldDashboardObject.position;
                    li.text(`Position is now (${newPos.x},${newPos.y}), was (${oldPos.x},${oldPos.y})`);
                    ul.append(li);
                }
                // checking if the dashboard object was resized.
                if (changesMade.includes(tableau.DashboardLayoutChange.SizeChanged)) {
                    const li = this._$('<li/>');
                    const newSize = dashboardObject.size;
                    const oldSize = oldDashboardObject.size;
                    li.text(`Size is now ${newSize.width}x${newSize.height}, was ${oldSize.width}x${oldSize.height}`);
                    ul.append(li);
                }
                // checking if the dashboard object was renamed.
                if (changesMade.includes(tableau.DashboardLayoutChange.NameChanged)) {
                    const li = this._$('<li/>');
                    li.text(`Name is now "${dashboardObject.name}", was "${oldDashboardObject.name}"`);
                    ul.append(li);
                }
                changesDiv.append(ul);
                this._$('#dashboard-layout-change-list').append(changesDiv);
            });
        }
        // This function adds a dashboard event if there is not one already, and removes it if there is.
        onEventButtonClick() {
            const dashboard = tableau.extensions.dashboardContent.dashboard;
            if ($('#dashboard-event-btn').text() === 'Add Dashboard Event') {
                dashboard.addEventListener(tableau.TableauEventType.DashboardLayoutChanged, (event) => this.onDashboardLayoutChange(event));
                $('#dashboard-event-btn').text('Remove Dashboard Event');
            }
            else {
                dashboard.removeEventListener(tableau.TableauEventType.DashboardLayoutChanged, (event) => this.onDashboardLayoutChange(event));
                $('#dashboard-layout-change-list').empty();
                $('#dashboard-event-btn').text('Add Dashboard Event');
            }
        }
    }
    console.log('Initializing DashboardLayout extension.');
    await new DashboardLayout($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxFQUFFLEtBQUsscUJBQXFCLEVBQUU7Z0JBQzlELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLEVBQ3hFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0wsU0FBUyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFDM0UsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDdkQ7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDdkQsTUFBTSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9ucy1hcGktc2RrLy4vU2FtcGxlcy1UeXBlc2NyaXB0L0Rhc2hib2FyZExheW91dC9kYXNoYm9hcmRMYXlvdXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGFzaGJvYXJkTGF5b3V0Q2hhbmdlLCBEYXNoYm9hcmRMYXlvdXRDaGFuZ2VkRXZlbnQsIERhc2hib2FyZE9iamVjdCwgVGFibGVhdUV2ZW50IH0gZnJvbSAnQHRhYmxlYXUvZXh0ZW5zaW9ucy1hcGktdHlwZXMnO1xyXG5cclxuLy8gV3JhcCBldmVyeXRoaW5nIGluIGFuIGFub255bW91cyBmdW5jdGlvbiB0byBhdm9pZCBwb2xsdXRpbmcgdGhlIGdsb2JhbCBuYW1lc3BhY2VcclxuKGFzeW5jICgpID0+IHtcclxuICBjbGFzcyBEYXNoYm9hcmRMYXlvdXQge1xyXG4gICAgcHVibGljIGRhc2hib2FyZE9iamVjdHM6IERhc2hib2FyZE9iamVjdFtdO1xyXG4gICAgcHJpdmF0ZSBzZWxmOiBEYXNoYm9hcmRMYXlvdXQ7XHJcblxyXG4gICAgLy8gQXZvaWQgZ2xvYmFscy5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgXyQ6IEpRdWVyeVN0YXRpYykge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBleHRlbnNpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGluaXRpYWxpemUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdXYWl0aW5nIGZvciBET00gcmVhZHknKTtcclxuICAgICAgYXdhaXQgdGhpcy5fJC5yZWFkeTtcclxuICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemluZyBleHRlbnNpb24gQVBJJyk7XHJcbiAgICAgIGF3YWl0IHRhYmxlYXUuZXh0ZW5zaW9ucy5pbml0aWFsaXplQXN5bmMoKTtcclxuXHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZCA9IHRhYmxlYXUuZXh0ZW5zaW9ucy5kYXNoYm9hcmRDb250ZW50LmRhc2hib2FyZDtcclxuICAgICAgdGhpcy5kYXNoYm9hcmRPYmplY3RzID0gZGFzaGJvYXJkLm9iamVjdHM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGFzaGJvYXJkT2JqZWN0cyk7XHJcblxyXG4gICAgICAvLyBlbmFibGluZyBkYXNoYm9hcmQgZXZlbnQgYnV0dG9uXHJcbiAgICAgIHRoaXMuXyQoJyNkYXNoYm9hcmQtZXZlbnQtYnRuJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuXyQoJyNkYXNoYm9hcmQtZXZlbnQtYnRuJykuY2xpY2sodGhpcy5vbkV2ZW50QnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2hlbiBjaGFuZ2VzIGFyZSBtYWRlIHRvIHRoZSBkYXNoYm9hcmQgd2UgZ2V0IGFsbCB0aGUgZGV0YWlscyBmb3IgZWFjaCBvZiB0aGVcclxuICAgIC8vIGRhc2hib2FyZCBvYmplY3RzIHRoYXQgd2VyZSBjaGFuZ2VkIGFuZCBjb21wYXJlIGl0IHdpdGggdGhlaXIgcHJldmlvdXMgdmFsdWVzLlxyXG4gICAgLy8gVGhlIGRhc2hib2FyZExheW91dENoYW5nZURldGFpbHMgcHJvcGVydHkgaXMgYSBtYXAgb2YgZGFzaGJvYXJkIG9iajNjdCBpZHMgdG9cclxuICAgIC8vIGFuIGFycmF5IG9mIGRhc2hib2FyZCBsYXlvdXQgY2hhbmdlcy5cclxuICAgIC8vIERhc2hib2FyZCBsYXlvdXQgY2hhbmdlIGV2ZW50cyBhcmUgaW52b2tlZCB3aGVuIGRhc2hib2FyZCBvYmplY3RzIGFyZSByZXNpemVkLFxyXG4gICAgLy8gcmVwb3NpdGlvbmVkLCBhZGRlZCwgYW5kIG1vcmUuIFNlZSBEYXNoYm9hcmRMYXlvdXRDaGFuZ2UgaW4gdGhlIEFQSSBkb2N1bWVudGF0aW9uXHJcbiAgICAvLyBmb3IgYWxsIHBvc3NpYmxlIGFjdGlvbnMuXHJcbiAgICAvLyBFeHRlbnNpb24gcmVsb2FkcyB3aGVuIHdvcmtzaGVldHMgYXJlIGFkZGVkIC8gcmVtb3ZlZC5cclxuICAgIHByaXZhdGUgb25EYXNoYm9hcmRMYXlvdXRDaGFuZ2UoZXZlbnQ6IFRhYmxlYXVFdmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZEV2ZW50ID0gZXZlbnQgYXMgRGFzaGJvYXJkTGF5b3V0Q2hhbmdlZEV2ZW50O1xyXG4gICAgICBjb25zdCBkYXNoYm9hcmRFdmVudERldGFpbHMgPSBkYXNoYm9hcmRFdmVudC5kYXNoYm9hcmRMYXlvdXRDaGFuZ2VEZXRhaWxzO1xyXG4gICAgICBjb25zdCBkYXNoYm9hcmQgPSB0YWJsZWF1LmV4dGVuc2lvbnMuZGFzaGJvYXJkQ29udGVudC5kYXNoYm9hcmQ7XHJcblxyXG4gICAgICAvLyB1cGRhdGluZyBkYXNoYm9hcmQgb2JqZWN0cyBhbmQgc3RvcmluZyB0aGUgcHJldmlvdXMgZGFzaGJvYXJkIG9iamVjdHMgZm9yIHJlZmVycmVuY2UuXHJcbiAgICAgIGNvbnN0IG9sZERhc2hib2FyZE9iamVjdHMgPSB0aGlzLmRhc2hib2FyZE9iamVjdHM7XHJcbiAgICAgIHRoaXMuZGFzaGJvYXJkT2JqZWN0cyA9IGRhc2hib2FyZC5vYmplY3RzO1xyXG5cclxuICAgICAgLy8gQW4gZW1wdHkgZGFzaGJvYXJkIGxheW91dCBjaGFuZ2UgZXZlbnQgbWF5IGJlIGludm9rZWQgd2hlbiBsb2FkaW5nIGFuIGV4dGVuc2lvbiBmcm9tIHRoZSBtYW5pZmVzdC5cclxuICAgICAgLy8gSW4gdGhpcyBjYXNlIHdlIGlnbm9yZSBpdCBhbmQgcmV0dXJuLlxyXG4gICAgICBpZiAoZGFzaGJvYXJkRXZlbnREZXRhaWxzID09PSB1bmRlZmluZWQgfHwgZGFzaGJvYXJkRXZlbnREZXRhaWxzLnNpemUgPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVtcHR5aW5nIHByZXZpb3VzIGNvbnRlbnQgZnJvbSB0aGUgVUkncyBjaGFuZ2UgbGlzdC5cclxuICAgICAgdGhpcy5fJCgnI2Rhc2hib2FyZC1sYXlvdXQtY2hhbmdlLWxpc3QnKS5lbXB0eSgpO1xyXG5cclxuICAgICAgLy8gVXBkYXRpbmcgVUkncyBjaGFuZ2UgbGlzdCB0byBkaXNwbGF5IGluZm9ybWF0aW9uIG9uIHRoZSBjdXJyZW50IGRhc2hib2FyZCBldmVudC5cclxuICAgICAgZGFzaGJvYXJkRXZlbnREZXRhaWxzLmZvckVhY2goKGNoYW5nZXNNYWRlOiBEYXNoYm9hcmRMYXlvdXRDaGFuZ2VbXSwgZGFzaGJvYXJkT2JqZWN0SWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIC8vIGdldHRpbmcgZGFzaGJvYXJkIG9iamVjdCBmcm9tIGl0cyBpZFxyXG4gICAgICAgIGNvbnN0IGRhc2hib2FyZE9iamVjdCA9IGRhc2hib2FyZC5nZXREYXNoYm9hcmRPYmplY3RCeUlkKGRhc2hib2FyZE9iamVjdElkKTtcclxuXHJcbiAgICAgICAgLy8gYnVpbGRpbmcgYSBkaXYgZm9yIHRoZSBjaGFuZ2VzIG1hZGUgdG8gdGhpcyBkYXNoYm9hcmQgb2JqZWN0LlxyXG4gICAgICAgIGNvbnN0IGNoYW5nZXNEaXYgPSB0aGlzLl8kKCc8ZGl2PicpO1xyXG5cclxuICAgICAgICAvLyBjaGVja2luZyBpZiB0aGlzIGRhc2hib2FyZCBvYmplY3Qgd2FzIGFkZGVkIGFzIHBhcnQgb2YgdGhlIGV2ZW50LlxyXG4gICAgICAgIGlmIChjaGFuZ2VzTWFkZS5pbmNsdWRlcyh0YWJsZWF1LkRhc2hib2FyZExheW91dENoYW5nZS5BZGRlZCkpIHtcclxuICAgICAgICAgIGNvbnN0IHRvQXBwZW5kID0gdGhpcy5fJCgnPGg2Lz4nKTtcclxuICAgICAgICAgIHRvQXBwZW5kLnRleHQoYERhc2hib2FyZCBPYmplY3QgJHtkYXNoYm9hcmRPYmplY3RJZH0gYWRkZWQ6IFwiJHtkYXNoYm9hcmRPYmplY3QubmFtZX1cImApO1xyXG4gICAgICAgICAgY2hhbmdlc0Rpdi5hcHBlbmQodG9BcHBlbmQpO1xyXG4gICAgICAgICAgdGhpcy5fJCgnI2Rhc2hib2FyZC1sYXlvdXQtY2hhbmdlLWxpc3QnKS5hcHBlbmQoY2hhbmdlc0Rpdik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXR0aW5nIG9sZCBkYXNoYm9hcmQgb2JqZWN0IGJlZm9yZSBldmVudCB0byBjb21wYXJlIGl0IHdpdGggdGhlIGN1cnJlbnQgb25lLlxyXG4gICAgICAgIGNvbnN0IG9sZERhc2hib2FyZE9iamVjdCA9IG9sZERhc2hib2FyZE9iamVjdHMuZmluZChvID0+IG8uaWQgPT09IGRhc2hib2FyZE9iamVjdElkKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2tpbmcgaWYgdGhpcyBkYXNoYm9hcmQgb2JqZWN0IHdhcyByZW1vdmVkIGFzIHBhcnQgb2YgdGhlIGV2ZW50LlxyXG4gICAgICAgIGlmIChjaGFuZ2VzTWFkZS5pbmNsdWRlcyh0YWJsZWF1LkRhc2hib2FyZExheW91dENoYW5nZS5SZW1vdmVkKSkge1xyXG4gICAgICAgICAgY29uc3QgdG9BcHBlbmQgPSB0aGlzLl8kKCc8aDYvPicpO1xyXG4gICAgICAgICAgdG9BcHBlbmQudGV4dChgRGFzaGJvYXJkIE9iamVjdCAke2Rhc2hib2FyZE9iamVjdElkfSByZW1vdmVkOiBcIiR7b2xkRGFzaGJvYXJkT2JqZWN0Lm5hbWV9XCJgKTtcclxuICAgICAgICAgIGNoYW5nZXNEaXYuYXBwZW5kKHRvQXBwZW5kKTtcclxuICAgICAgICAgIHRoaXMuXyQoJyNkYXNoYm9hcmQtbGF5b3V0LWNoYW5nZS1saXN0JykuYXBwZW5kKGNoYW5nZXNEaXYpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBkYXNoYm9hcmQgY2hhbmdlcyBhcmUgbm90IG11dHVhbGx5IGV4Y2x1c2l2ZSwgc28gd2UgbGlzdCB0aGVtIHRvZ2V0aGVyLlxyXG4gICAgICAgIGNvbnN0IGg2ID0gdGhpcy5fJCgnPGg2Lz4nKTtcclxuICAgICAgICBoNi50ZXh0KGBEYXNoYm9hcmQgT2JqZWN0ICR7ZGFzaGJvYXJkT2JqZWN0SWR9OiBcIiR7ZGFzaGJvYXJkT2JqZWN0Lm5hbWV9XCJgKTtcclxuICAgICAgICBjaGFuZ2VzRGl2LmFwcGVuZChoNik7XHJcbiAgICAgICAgY29uc3QgdWwgPSB0aGlzLl8kKCc8dWwvPicpO1xyXG5cclxuICAgICAgICAvLyBjaGVja2luZyBpZiB0aGUgZGFzaGJvYXJkIG9iamVjdCBoYWQgY2hhbmdlcyB0byBpdHMgZmxvYXRpbmcgc3RhdGUuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNNYWRlLmluY2x1ZGVzKHRhYmxlYXUuRGFzaGJvYXJkTGF5b3V0Q2hhbmdlLklzRmxvYXRpbmdDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgY29uc3QgbGkgPSB0aGlzLl8kKCc8bGkvPicpO1xyXG4gICAgICAgICAgbGkudGV4dChgRmxvYXRpbmcgaXMgbm93ICR7ZGFzaGJvYXJkT2JqZWN0LmlzRmxvYXRpbmd9LCB3YXMgJHtvbGREYXNoYm9hcmRPYmplY3QuaXNGbG9hdGluZ31gKTtcclxuICAgICAgICAgIHVsLmFwcGVuZChsaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVja2luZyBpZiB0aGUgZGFzaGJhb3JkIG9iamVjdCBoYWQgY2hhbmdlcyB0byBpdHMgdmlzaWJpbGl0eS5cclxuICAgICAgICBpZiAoY2hhbmdlc01hZGUuaW5jbHVkZXModGFibGVhdS5EYXNoYm9hcmRMYXlvdXRDaGFuZ2UuSXNWaXNpYmxlQ2hhbmdlZCkpIHtcclxuICAgICAgICAgIGNvbnN0IGxpID0gdGhpcy5fJCgnPGxpLz4nKTtcclxuICAgICAgICAgIGxpLnRleHQoYFZpc2liaWxpdHkgaXMgbm93ICR7ZGFzaGJvYXJkT2JqZWN0LmlzVmlzaWJsZX0sIHdhcyAke29sZERhc2hib2FyZE9iamVjdC5pc1Zpc2libGV9YCk7XHJcbiAgICAgICAgICB1bC5hcHBlbmQobGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2tpbmcgaWYgdGhlIGRhc2hib2FyZCBvYmplY3Qgd2FzIHJlcG9zaXRpb25lZC5cclxuICAgICAgICBpZiAoY2hhbmdlc01hZGUuaW5jbHVkZXModGFibGVhdS5EYXNoYm9hcmRMYXlvdXRDaGFuZ2UuUG9zaXRpb25DaGFuZ2VkKSkge1xyXG4gICAgICAgICAgY29uc3QgbGkgPSB0aGlzLl8kKCc8bGkvPicpO1xyXG4gICAgICAgICAgY29uc3QgbmV3UG9zID0gZGFzaGJvYXJkT2JqZWN0LnBvc2l0aW9uO1xyXG4gICAgICAgICAgY29uc3Qgb2xkUG9zID0gb2xkRGFzaGJvYXJkT2JqZWN0LnBvc2l0aW9uO1xyXG4gICAgICAgICAgbGkudGV4dChgUG9zaXRpb24gaXMgbm93ICgke25ld1Bvcy54fSwke25ld1Bvcy55fSksIHdhcyAoJHtvbGRQb3MueH0sJHtvbGRQb3MueX0pYCk7XHJcbiAgICAgICAgICB1bC5hcHBlbmQobGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2hlY2tpbmcgaWYgdGhlIGRhc2hib2FyZCBvYmplY3Qgd2FzIHJlc2l6ZWQuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNNYWRlLmluY2x1ZGVzKHRhYmxlYXUuRGFzaGJvYXJkTGF5b3V0Q2hhbmdlLlNpemVDaGFuZ2VkKSkge1xyXG4gICAgICAgICAgY29uc3QgbGkgPSB0aGlzLl8kKCc8bGkvPicpO1xyXG4gICAgICAgICAgY29uc3QgbmV3U2l6ZSA9IGRhc2hib2FyZE9iamVjdC5zaXplO1xyXG4gICAgICAgICAgY29uc3Qgb2xkU2l6ZSA9IG9sZERhc2hib2FyZE9iamVjdC5zaXplO1xyXG4gICAgICAgICAgbGkudGV4dChgU2l6ZSBpcyBub3cgJHtuZXdTaXplLndpZHRofXgke25ld1NpemUuaGVpZ2h0fSwgd2FzICR7b2xkU2l6ZS53aWR0aH14JHtvbGRTaXplLmhlaWdodH1gKTtcclxuICAgICAgICAgIHVsLmFwcGVuZChsaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVja2luZyBpZiB0aGUgZGFzaGJvYXJkIG9iamVjdCB3YXMgcmVuYW1lZC5cclxuICAgICAgICBpZiAoY2hhbmdlc01hZGUuaW5jbHVkZXModGFibGVhdS5EYXNoYm9hcmRMYXlvdXRDaGFuZ2UuTmFtZUNoYW5nZWQpKSB7XHJcbiAgICAgICAgICBjb25zdCBsaSA9IHRoaXMuXyQoJzxsaS8+Jyk7XHJcbiAgICAgICAgICBsaS50ZXh0KGBOYW1lIGlzIG5vdyBcIiR7ZGFzaGJvYXJkT2JqZWN0Lm5hbWV9XCIsIHdhcyBcIiR7b2xkRGFzaGJvYXJkT2JqZWN0Lm5hbWV9XCJgKTtcclxuICAgICAgICAgIHVsLmFwcGVuZChsaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFuZ2VzRGl2LmFwcGVuZCh1bCk7XHJcbiAgICAgICAgdGhpcy5fJCgnI2Rhc2hib2FyZC1sYXlvdXQtY2hhbmdlLWxpc3QnKS5hcHBlbmQoY2hhbmdlc0Rpdik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWRkcyBhIGRhc2hib2FyZCBldmVudCBpZiB0aGVyZSBpcyBub3Qgb25lIGFscmVhZHksIGFuZCByZW1vdmVzIGl0IGlmIHRoZXJlIGlzLlxyXG4gICAgcHJpdmF0ZSBvbkV2ZW50QnV0dG9uQ2xpY2soKSB7XHJcbiAgICAgIGNvbnN0IGRhc2hib2FyZCA9IHRhYmxlYXUuZXh0ZW5zaW9ucy5kYXNoYm9hcmRDb250ZW50LmRhc2hib2FyZDtcclxuICAgICAgaWYgKCQoJyNkYXNoYm9hcmQtZXZlbnQtYnRuJykudGV4dCgpID09PSAnQWRkIERhc2hib2FyZCBFdmVudCcpIHtcclxuICAgICAgICBkYXNoYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcih0YWJsZWF1LlRhYmxlYXVFdmVudFR5cGUuRGFzaGJvYXJkTGF5b3V0Q2hhbmdlZCxcclxuICAgICAgICAgIChldmVudCkgPT4gdGhpcy5vbkRhc2hib2FyZExheW91dENoYW5nZShldmVudCkpO1xyXG4gICAgICAgICQoJyNkYXNoYm9hcmQtZXZlbnQtYnRuJykudGV4dCgnUmVtb3ZlIERhc2hib2FyZCBFdmVudCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhc2hib2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKHRhYmxlYXUuVGFibGVhdUV2ZW50VHlwZS5EYXNoYm9hcmRMYXlvdXRDaGFuZ2VkLFxyXG4gICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLm9uRGFzaGJvYXJkTGF5b3V0Q2hhbmdlKGV2ZW50KSk7XHJcbiAgICAgICAgJCgnI2Rhc2hib2FyZC1sYXlvdXQtY2hhbmdlLWxpc3QnKS5lbXB0eSgpO1xyXG4gICAgICAgICQoJyNkYXNoYm9hcmQtZXZlbnQtYnRuJykudGV4dCgnQWRkIERhc2hib2FyZCBFdmVudCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nIERhc2hib2FyZExheW91dCBleHRlbnNpb24uJyk7XHJcbiAgYXdhaXQgbmV3IERhc2hib2FyZExheW91dCgkKS5pbml0aWFsaXplKCk7XHJcbn0pKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==