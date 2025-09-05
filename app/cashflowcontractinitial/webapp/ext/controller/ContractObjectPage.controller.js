sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('cashflowcontractinitial.ext.controller.ContractObjectPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf cashflowcontractinitial.ext.controller.ContractObjectPage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onBeforeBinding: function () {
					debugger
					try {
						// sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").firePress();
						// sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").setPressed(true);
						sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::Form::Conditions1::Content").mAggregations.formContainers[0].getTitle().destroy()

					} catch (error) {
						console.log(error);
					}
					// sap.ui.getCore().byId("CreateDialog::Contract")?.setTitle("false");
				}
			}
		}
	});
});
