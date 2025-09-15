sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('loancreation.ext.controller.ListReport', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf loancreation.ext.controller.ListReport
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}, routing: {
				
				onBeforeBinding: function () {
					debugger
					sap.ui.getCore().byId("loancreation::contractNewList--fe::FilterBar::contractNew::BasicSearchField").setVisible(false);
					sap.ui.getCore().byId("loancreation::contractNewList--fe::FilterBar::contractNew-btnSearch").setText("Search");

					// sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPageDynamicHeaderTitle").setVisible(false);
				}
			}
		}
	});
});
