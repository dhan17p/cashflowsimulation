sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('adjustmentflowloan.ext.controller.ListReportPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf adjustmentflowloan.ext.controller.ListReportPage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: function () {
				debugger
				try {
					function getEntityKeyFromUrl() {
						let url = window.location.href;

						// Match anything inside parentheses
						let match = url.match(/\(([^)]+)\)/);
						if (!match || !match[1]) {
							return "";
						}

						let keyPart = match[1];
						let params = {};

						// Split by commas but ignore commas inside quotes
						keyPart.split(/,(?![^']*')/).forEach(pair => {
							let [k, v] = pair.split("=");
							if (!k || !v) return;

							k = k.trim();
							v = v.trim();

							// Keep quotes if present
							if (v.startsWith("'") && v.endsWith("'")) {
								v = v.slice(1, -1); // remove quotes
							}

							// ⚠️ Don't decode — keep %2520 as is
							params[k] = v;
						});

						// Rebuild back into string
						return Object.entries(params)
							.map(([key, value]) => {
								if (typeof value === "string" && value !== "true" && value !== "false") {
									return `${key}='${value}'`;
								}
								return `${key}=${value}`;
							})
							.join(",");
					}

					// --- Usage Example ---
					let sKey = getEntityKeyFromUrl();
					console.log("Entity Key:", sKey);

					if (sKey) {
						let oRouter = this.base.getAppComponent().getRouter();
						oRouter.navTo("contractAdjustLoanObjectPage", { key: sKey });
					}
				} catch (error) {
					console.log("error", error)
				}

			}
		}
	});
});
