sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/json/JSONModel'
    ],
    function (PageController, JSONModel) {
        'use strict';

        return PageController.extend('cashflowcontractinitial.ext.view.CompareCalcFlow', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf cashflowcontractinitial.ext.view.CompareCalcFlow
             */
            onInit: function () {
                debugger
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                this.getAppComponent().getRouter().attachRouteMatched(this._onObjectMatched, this)
            },
            _onObjectMatched: function (oEvent) {
                debugger
                let odata = sap.ui.getCore().getModel("test1");
                let otestdata = odata.getData().rows;
                this.setModel(new JSONModel({ rows: otestdata }), "test");

                //old dates
                var oldDates = sap.ui.getCore().getModel("OldStartEnd");
                this.setModel(oldDates, "OldfixedDates");


                //nee dates
                var newDates = sap.ui.getCore().getModel("NewStartEnd");
                this.setModel(newDates, "NewfixedDates");

            }

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf cashflowcontractinitial.ext.view.CompareCalcFlow
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf cashflowcontractinitial.ext.view.CompareCalcFlow
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf cashflowcontractinitial.ext.view.CompareCalcFlow
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
