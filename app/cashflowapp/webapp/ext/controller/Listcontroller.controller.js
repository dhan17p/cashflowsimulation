sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('cashflowapp.ext.controller.Listcontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf cashflowapp.ext.controller.Listcontroller
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onBeforeBinding: function () {
					debugger

					sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::PageVariantManagement-vm").setVisible(false);
					sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::FilterBar::CashFlow-btnSearch").setText("Simulate");
					sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::FilterBar::CashFlow::BasicSearchField").setVisible(false)
					// sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::FilterBar::CashFlow::FilterField::loanAmount-inner-vhi").setVisible(false)
					sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::FilterBar::CashFlow::FilterField::loanAmount").mAggregations._content[0].mAggregations._endIcon[1].setVisible(false);
					sap.ui.getCore().byId("cashflowapp::CashFlowList--fe::FilterBar::CashFlow::FilterField::loanAmount-inner-vhi").setVisible(false);
				}
			}
		}
	});
});
