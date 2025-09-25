sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/json/JSONModel'
    ],
    function (PageController, JSONModel) {
        'use strict';

        return PageController.extend('adjustmentflowloan.ext.view.AdjustmentCashFlow', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf adjustmentflowloan.ext.view.AdjustmentCashFlow
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                this.getAppComponent().getRouter().attachRouteMatched(this._onObjectMatched, this)
            },
            _onObjectMatched: async function (oEvent) {
                debugger
                const url = window.location.href;

                // Regex to capture the UUID after "ID="
                const match = url.match(/ID=([0-9a-fA-F-]+)/);

                let contractId = null;
                if (match) {
                    contractId = match[1]; // "550e8400-e29b-41d4-a716-446655440000"
                }

                console.log("Contract ID:", contractId);
                let oFunction = this.getModel().bindContext("/getcontractDetailsLoan(...)");

                oFunction.setParameter("contractId", contractId);


                var result = await oFunction.execute();
                var contractDetails = oFunction.getBoundContext().getValue();
                var startFrom = contractDetails.fixedFrom
                var end = contractDetails.fixedUntil;



                function formatDate(isoDateStr) {
                    if (!isoDateStr) return ""; // handle null/empty
                    const parts = isoDateStr.split("-"); // ["2025","09","16"]
                    return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
                }
                var startFromOld = formatDate(startFrom);
                var EndFromOld = formatDate(end);
                // Create a JSON model with these values
                var oModel = new sap.ui.model.json.JSONModel({
                    startFromOld: startFromOld,
                    EndFromOld: EndFromOld
                });
                debugger

                // Set the model to the view (so you can use in XML/JS)
                this.setModel(oModel, "OldfixedDates");





                //nee dates
                var newDates = sap.ui.getCore().getModel("NewStartEnd");
                this.setModel(newDates, "NewfixedDates");



                // function formatDate(isoDateStr) {
                //     if (!isoDateStr) return ""; // handle null/empty
                //     const parts = isoDateStr.split("-"); // ["2025","09","16"]
                //     return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
                // }
                // var startFromNew = formatDate(fixedFrom);
                // var EndFromOldNew = formatDate(fixedUntil);
                // // Create a JSON model with these values
                // var oModel = new sap.ui.model.json.JSONModel({
                //     startFromNew: startFromNew,
                //     EndFromOldNew: EndFromOldNew
                // });
                // // Set the model to the view (so you can use in XML/JS)
                // sap.ui.getCore().setModel(oModel, "NewStartEnd");

                let odata = sap.ui.getCore().getModel("test1");
                let otestdata = odata.getData().rows;
                this.setModel(new JSONModel({ rows: otestdata }), "test");



            }
            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf adjustmentflowloan.ext.view.AdjustmentCashFlow
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf adjustmentflowloan.ext.view.AdjustmentCashFlow
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf adjustmentflowloan.ext.view.AdjustmentCashFlow
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
