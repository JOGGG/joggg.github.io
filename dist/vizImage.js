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
    class VizImage {
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
            await this.addVizImage(tableau.MarkType.Bar, 'tableau20_10_0');
            const markSelector = this._$('#mark-select');
            const colorSelector = this._$('#color-select');
            markSelector.prop('disabled', false);
            colorSelector.prop('disabled', false);
            // updating viz images with new values upon a selector change
            markSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
            colorSelector.change(() => {
                this.addVizImage(markSelector.val(), colorSelector.val());
            });
        }
        /**
         * Builds the input specifications and displays the created viz image
         * @param markType
         * @param colorPalette
         */
        async addVizImage(markType, palette) {
            // Building the input specification object that is used to create the viz image
            // Data values used in the viz image are prefilled
            const vizInputSpec = {
                data: {
                    values: [
                        { Product: 'Paper', Sales: 28, Region: 'Central' },
                        { Product: 'Pens', Sales: 45, Region: 'East' },
                        { Product: 'Rulers', Sales: 35, Region: 'East' },
                        { Product: 'Rulers', Sales: 43, Region: 'South' },
                        { Product: 'Paper', Sales: 50, Region: 'West' },
                        { Product: 'Pens', Sales: 56, Region: 'West' }
                    ]
                },
                description: 'A sample viz',
                encoding: {
                    color: { field: 'Product', type: tableau.VizImageEncodingType.Discrete, palette },
                    columns: { field: 'Region', type: tableau.VizImageEncodingType.Discrete },
                    rows: { field: 'Sales', type: tableau.VizImageEncodingType.Continuous }
                },
                mark: markType,
                markcolor: '#FFED5F',
                size: { width: 400, height: 300 }
            };
            // defaulting values if null
            if (markType === null) {
                vizInputSpec.mark = tableau.MarkType.Bar;
            }
            if (palette === null) {
                vizInputSpec.encoding.color.palette = 'tableau20_10_0';
            }
            const svg = await tableau.extensions.createVizImageAsync(vizInputSpec);
            // making call to create viz image from the input specifications
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const image = document.createElement('img');
            image.src = url;
            image.style.maxWidth = '100%';
            image.style.maxHeight = '100%';
            image.className = 'center-block';
            const vizApiElement = document.getElementById('viz-container');
            // clearing UI and adding in new viz
            vizApiElement.innerHTML = '';
            vizApiElement.appendChild(image);
            image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        }
    }
    console.log('Initializing VizImage extension.');
    await new VizImage($).initialize();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzdCLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakYsQ0FBQztLQUNGO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbnMtYXBpLXNkay8uL1NhbXBsZXMtVHlwZXNjcmlwdC9WaXpJbWFnZS92aXpJbWFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXJrVHlwZSB9IGZyb20gJ0B0YWJsZWF1L2V4dGVuc2lvbnMtYXBpLXR5cGVzJztcclxuXHJcbi8vIFdyYXAgZXZlcnl0aGluZyBpbiBhbiBhbm9ueW1vdXMgZnVuY3Rpb24gdG8gYXZvaWQgcG9sbHV0aW5nIHRoZSBnbG9iYWwgbmFtZXNwYWNlXHJcbihhc3luYyAoKSA9PiB7XHJcbiAgY2xhc3MgVml6SW1hZ2Uge1xyXG4gICAgLy8gQXZvaWQgZ2xvYmFscy5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgXyQ6IEpRdWVyeVN0YXRpYykgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZXh0ZW5zaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnV2FpdGluZyBmb3IgRE9NIHJlYWR5Jyk7XHJcbiAgICAgIGF3YWl0IHRoaXMuXyQucmVhZHk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgZXh0ZW5zaW9uIEFQSScpO1xyXG4gICAgICBhd2FpdCB0YWJsZWF1LmV4dGVuc2lvbnMuaW5pdGlhbGl6ZUFzeW5jKCk7XHJcblxyXG4gICAgICBhd2FpdCB0aGlzLmFkZFZpekltYWdlKHRhYmxlYXUuTWFya1R5cGUuQmFyLCAndGFibGVhdTIwXzEwXzAnKTtcclxuXHJcbiAgICAgIGNvbnN0IG1hcmtTZWxlY3RvciA9IHRoaXMuXyQoJyNtYXJrLXNlbGVjdCcpO1xyXG4gICAgICBjb25zdCBjb2xvclNlbGVjdG9yID0gdGhpcy5fJCgnI2NvbG9yLXNlbGVjdCcpO1xyXG5cclxuICAgICAgbWFya1NlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICBjb2xvclNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cclxuICAgICAgLy8gdXBkYXRpbmcgdml6IGltYWdlcyB3aXRoIG5ldyB2YWx1ZXMgdXBvbiBhIHNlbGVjdG9yIGNoYW5nZVxyXG4gICAgICBtYXJrU2VsZWN0b3IuY2hhbmdlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFkZFZpekltYWdlKG1hcmtTZWxlY3Rvci52YWwoKSBhcyBNYXJrVHlwZSwgY29sb3JTZWxlY3Rvci52YWwoKSBhcyBzdHJpbmcpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29sb3JTZWxlY3Rvci5jaGFuZ2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWRkVml6SW1hZ2UobWFya1NlbGVjdG9yLnZhbCgpIGFzIE1hcmtUeXBlLCBjb2xvclNlbGVjdG9yLnZhbCgpIGFzIHN0cmluZyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIHRoZSBpbnB1dCBzcGVjaWZpY2F0aW9ucyBhbmQgZGlzcGxheXMgdGhlIGNyZWF0ZWQgdml6IGltYWdlXHJcbiAgICAgKiBAcGFyYW0gbWFya1R5cGVcclxuICAgICAqIEBwYXJhbSBjb2xvclBhbGV0dGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRWaXpJbWFnZShtYXJrVHlwZTogTWFya1R5cGUsIHBhbGV0dGU6IHN0cmluZykge1xyXG4gICAgICAvLyBCdWlsZGluZyB0aGUgaW5wdXQgc3BlY2lmaWNhdGlvbiBvYmplY3QgdGhhdCBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgdml6IGltYWdlXHJcbiAgICAgIC8vIERhdGEgdmFsdWVzIHVzZWQgaW4gdGhlIHZpeiBpbWFnZSBhcmUgcHJlZmlsbGVkXHJcbiAgICAgIGNvbnN0IHZpeklucHV0U3BlYyA9IHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB2YWx1ZXM6IFtcclxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdQYXBlcicsIFNhbGVzOiAyOCwgUmVnaW9uOiAnQ2VudHJhbCd9LFxyXG4gICAgICAgICAgICB7UHJvZHVjdDogJ1BlbnMnLCBTYWxlczogNDUsIFJlZ2lvbjogJ0Vhc3QnfSxcclxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdSdWxlcnMnLCBTYWxlczogMzUsIFJlZ2lvbjogJ0Vhc3QnfSxcclxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdSdWxlcnMnLCBTYWxlczogNDMsIFJlZ2lvbjogJ1NvdXRoJ30sXHJcbiAgICAgICAgICAgIHtQcm9kdWN0OiAnUGFwZXInLCBTYWxlczogNTAsIFJlZ2lvbjogJ1dlc3QnfSxcclxuICAgICAgICAgICAge1Byb2R1Y3Q6ICdQZW5zJywgU2FsZXM6IDU2LCBSZWdpb246ICdXZXN0J31cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSBzYW1wbGUgdml6JywgLy8gb3B0aW9uYWwgcGFyYW1ldGVyXHJcbiAgICAgICAgZW5jb2Rpbmc6IHtcclxuICAgICAgICAgIGNvbG9yOiB7ZmllbGQ6ICdQcm9kdWN0JywgdHlwZTogdGFibGVhdS5WaXpJbWFnZUVuY29kaW5nVHlwZS5EaXNjcmV0ZSwgcGFsZXR0ZX0sXHJcbiAgICAgICAgICBjb2x1bW5zOiB7ZmllbGQ6ICdSZWdpb24nLCB0eXBlOiB0YWJsZWF1LlZpekltYWdlRW5jb2RpbmdUeXBlLkRpc2NyZXRlfSxcclxuICAgICAgICAgIHJvd3M6IHtmaWVsZDogJ1NhbGVzJywgdHlwZTogdGFibGVhdS5WaXpJbWFnZUVuY29kaW5nVHlwZS5Db250aW51b3VzfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFyazogbWFya1R5cGUsXHJcbiAgICAgICAgbWFya2NvbG9yOiAnI0ZGRUQ1RicsIC8vIG1heSBub3QgZ2V0IHVzZWQgaW4gdml6IGlmIGNvbG9yIGlzIGVuY29kZWQgaW4gdml6XHJcbiAgICAgICAgc2l6ZToge3dpZHRoOiA0MDAsIGhlaWdodDogMzAwfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gZGVmYXVsdGluZyB2YWx1ZXMgaWYgbnVsbFxyXG4gICAgICBpZiAobWFya1R5cGUgPT09IG51bGwpIHtcclxuICAgICAgICB2aXpJbnB1dFNwZWMubWFyayA9IHRhYmxlYXUuTWFya1R5cGUuQmFyO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwYWxldHRlID09PSBudWxsKSB7XHJcbiAgICAgICAgdml6SW5wdXRTcGVjLmVuY29kaW5nLmNvbG9yLnBhbGV0dGUgPSAndGFibGVhdTIwXzEwXzAnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzdmcgPSBhd2FpdCB0YWJsZWF1LmV4dGVuc2lvbnMuY3JlYXRlVml6SW1hZ2VBc3luYyh2aXpJbnB1dFNwZWMpO1xyXG4gICAgICAvLyBtYWtpbmcgY2FsbCB0byBjcmVhdGUgdml6IGltYWdlIGZyb20gdGhlIGlucHV0IHNwZWNpZmljYXRpb25zXHJcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnXSwgeyB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcgfSk7XHJcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltYWdlLnNyYyA9IHVybDtcclxuICAgICAgaW1hZ2Uuc3R5bGUubWF4V2lkdGggPSAnMTAwJSc7XHJcbiAgICAgIGltYWdlLnN0eWxlLm1heEhlaWdodCA9ICcxMDAlJztcclxuICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gJ2NlbnRlci1ibG9jayc7XHJcbiAgICAgIGNvbnN0IHZpekFwaUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndml6LWNvbnRhaW5lcicpO1xyXG4gICAgICAvLyBjbGVhcmluZyBVSSBhbmQgYWRkaW5nIGluIG5ldyB2aXpcclxuICAgICAgdml6QXBpRWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgdml6QXBpRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCksIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKCdJbml0aWFsaXppbmcgVml6SW1hZ2UgZXh0ZW5zaW9uLicpO1xyXG4gIGF3YWl0IG5ldyBWaXpJbWFnZSgkKS5pbml0aWFsaXplKCk7XHJcbn0pKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==