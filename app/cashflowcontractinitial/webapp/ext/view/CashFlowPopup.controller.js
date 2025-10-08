sap.ui.define(
    [
        'sap/fe/core/PageController',
        	"sap/ui/export/Spreadsheet",
    ],
    function (PageController,Spreadsheet) {
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
            onExportToExcel: async function () {
                debugger
                const oTable = this.byId("ConditionTablepopscreen");
                const oBinding = oTable.getBinding("rows");

                if (!oBinding) {
                    sap.m.MessageToast.show("Table binding not found.");
                    return;
                }

                try {
                    // 🔹 Request all contexts from the binding
                    const aContexts = await oBinding.requestContexts(0, Infinity);
                    if (!aContexts.length) {
                        sap.m.MessageToast.show("No data available to export.");
                        return;
                    }

                    // 🔹 Extract raw data objects
                    const aTableData = aContexts.map(oContext => oContext.getObject());

                    // 🔹 Define columns
                    const aColumns = [
                        { label: "Due Date", property: "dueDate" },
                        { label: "Flow Type", property: "flowType" },
                        { label: "Name", property: "name" },
                        { label: "Plan/Actual Rec", property: "planActualRec" },
                        { label: "Settlement Amount", property: "settlementAmount" },
                        { label: "Base Amount", property: "baseAmount" },
                        { label: "Percentage Rate", property: "percentageRate" },
                        { label: "Calculation From", property: "calculationFrom" },
                        { label: "Calculation Date", property: "calculationDate" },
                        { label: "Number of Days", property: "numberOfDays" }
                    ];

                    // 🔹 Spreadsheet settings
                    const oSettings = {
                        workbook: { columns: aColumns },
                        dataSource: aTableData,
                        fileName: "CashFlow_Export.xlsx"
                    };

                    // 🔹 Create and export Excel
                    const oSpreadsheet =new  Spreadsheet(oSettings);
                    await oSpreadsheet.build();
                    sap.m.MessageToast.show("Export completed successfully.");
                    oSpreadsheet.destroy();

                } catch (err) {
                    console.error("Export error:", err);
                    sap.m.MessageToast.show("Error while exporting data.");
                }
            }

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
