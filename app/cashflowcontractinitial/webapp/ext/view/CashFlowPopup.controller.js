sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function (PageController) {
        'use strict';

        return PageController.extend('cashflowcontractinitial.ext.view.CashFlowPopup', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf cashflowcontractinitial.ext.view.CashFlowPopup
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                var oRouter = this.getAppComponent().getRouter();
                oRouter.getRoute("AmortizationScheduleCashFlowPopupPage").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                debugger
                var key = oEvent.mParameters.arguments.key;
                function parseKeyString(key) {
                    const obj = {};
                    // Matches key=value or key='value'
                    const regex = /(\w+)=('.*?'|[^,]+)/g;
                    let match;

                    while ((match = regex.exec(key)) !== null) {
                        let k = match[1];
                        let v = match[2];

                        // remove quotes if present
                        if (v.startsWith("'") && v.endsWith("'")) {
                            v = v.slice(1, -1);
                        }

                        // decode double-encoded values safely
                        try {
                            v = decodeURIComponent(decodeURIComponent(v));
                        } catch (e) {
                            try {
                                v = decodeURIComponent(v); // fallback single decode
                            } catch { }
                        }

                        obj[k] = v;
                    }

                    return obj;
                }

                var key = oEvent.getParameter("arguments").key;
                var keyData = parseKeyString(key);
                var contractId = keyData.ID;

                var oModel = new sap.ui.model.json.JSONModel(keyData);
                this.getView().setModel(oModel, "keyData");

                let oTable = this.getView().byId("ConditionTablepopscreen");
                // oTable.refreshRows()
                var oBinding = oTable.getBinding("rows");
                // console.log(this.getView().getModel().getProperty("/AmortizationSchedule2"));


                if (oBinding) {
                    // Create a sorter on the "index" field (ascending)

                    var oFilter = new sap.ui.model.Filter("contractId", sap.ui.model.FilterOperator.EQ, contractId);
                    var oSorter = new sap.ui.model.Sorter("index", false);
                    oBinding.sort(oSorter);
                     oBinding.filter([oFilter]);
                    oBinding.refresh();
                   
                }
                oTable.getModel().refresh(true);

            },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf cashflowcontractinitial.ext.view.CashFlowPopup
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf cashflowcontractinitial.ext.view.CashFlowPopup
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf cashflowcontractinitial.ext.view.CashFlowPopup
             */
            //  onExit: function() {
            //
            //  }
        });
    }
);
