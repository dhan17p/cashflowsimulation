sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/ui/model/json/JSONModel'
    ],
    function (PageController, JSONModel) {
        'use strict';

        return PageController.extend('cashflowcontractinitial.ext.view.Adjustmentflow', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf cashflowcontractinitial.ext.view.Adjustmentflow
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller

                this.getAppComponent().getRouter().attachRouteMatched(this._onObjectMatched, this)
            },
            _onObjectMatched: function (oEvent) {
                debugger
                debugger
                try {
                    let oTable = this.getView().byId("conditionItemsTable");
                    // oTable.refreshRows()
                    var oBinding = oTable.getBinding("items");
                    // console.log(this.getView().getModel().getProperty("/AmortizationSchedule2"));


                    if (oBinding) {
                        // Create a sorter on the "index" field (ascending)
                        var oSorter = new sap.ui.model.Sorter("sequence", false);
                        oBinding.sort(oSorter);
                        oBinding.refresh();
                    }
                    // oTable.getModel().refresh(true);
                } catch (error) {
                    console.log("Erroor ", error)
                }

            },
            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf cashflowcontractinitial.ext.view.Adjustmentflow
             */
            // onBeforeRendering: function () {


            // },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf cashflowcontractinitial.ext.view.Adjustmentflow
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf cashflowcontractinitial.ext.view.Adjustmentflow
             */
            //  onExit: function() {
            //
            //  }
            onComparePress: async function (oEvent) {
                debugger
                var commitCap = this.byId("commitCap").getValue();
                var fixedFrom = this.byId("fixedFrom").getValue();
                var fixedUntil = this.byId("fixedUntil").getValue();
                var intCalMt = this.byId("intCalMt").getSelectedItem().getText();

                console.log("Commit Capital:", commitCap);
                console.log("Fixed From:", fixedFrom);
                console.log("Fixed Until:", fixedUntil);
                console.log("Interest Calc Method:", intCalMt);

                var result;
                function formatDate(isoDateStr) {
                    if (!isoDateStr) return ""; // handle null/empty
                    const parts = isoDateStr.split("-"); // ["2025","09","16"]
                    return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
                }
                var startFromNew = formatDate(fixedFrom);
                var EndFromOldNew = formatDate(fixedUntil);
                // Create a JSON model with these values
                var oModel = new sap.ui.model.json.JSONModel({
                    startFromNew: startFromNew,
                    EndFromOldNew: EndFromOldNew
                });

                // Set the model to the view (so you can use in XML/JS)
                sap.ui.getCore().setModel(oModel, "NewStartEnd");





                async function backendcall() {
                    function getIsActiveEntity() {
                        const url = window.location.href;
                        const match = url.match(/Contract\(([^)]+)\)/);
                        if (!match) return false;

                        const keyString = match[1];
                        const regex = /(\w+)=('[^']*'|[^,]+)/g;
                        let result = {};
                        let m;

                        while ((m = regex.exec(keyString)) !== null) {
                            const k = m[1];
                            const v = m[2];
                            result[k] = v.startsWith("'") && v.endsWith("'")
                                ? v.slice(1, -1)
                                : v;
                        }

                        return result.IsActiveEntity === "true";
                    }

















                    // let effectiveDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().effectiveFrom;
                    // let percentage = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().percentage;
                    // let dueDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().dueDate;
                    // let calculationDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().calculationDate;
                    // let conditionAmt = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[2].getBindingContext().getObject().conditionAmt;
                    // let efffectiveDatefinalRepayment = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[3].getBindingContext().getObject().effectiveFrom;
                    // let data = this._view.getContent()[0].getBindingContext().getObject();


                    // if (
                    //     !data.commitCapital ||
                    //     !data.fixedFrom ||
                    //     !data.fixedUntil ||
                    //     !effectiveDate ||
                    //     !data.ID ||
                    //     !data.intCalMt ||
                    //     !efffectiveDatefinalRepayment
                    // ) {
                    //     sap.m.MessageBox.error(
                    //         "All mandatory fields must be filled before calculating cash flow."
                    //     );
                    //     return; // 🔥 Stop execution
                    // }
                    var isActiveEntity = getIsActiveEntity();
                    const url = window.location.href;
                    const match = url.match(/ID=([0-9a-fA-F\-]+)/);
                    const id = match ? match[1] : null;
                    console.log(id);

                    let oFunction = this.getModel().bindContext("/loadAmortizationFuncAdjust(...)");

                    oFunction.setParameter("principal", String(commitCap));
                    oFunction.setParameter("annualRate", '0.04');
                    oFunction.setParameter("startDate", String(fixedFrom));
                    oFunction.setParameter("endDate", String(fixedUntil));
                    // oFunction.setParameter("interestFixedDate", effectiveDate);
                    oFunction.setParameter("inclusiveIndicator", String('true'));
                    oFunction.setParameter("contractId", String(id));
                    oFunction.setParameter("intCalMt", String(intCalMt)),
                        oFunction.setParameter("isActiveEntity", isActiveEntity),
                        // oFunction.setParameter("loanData", JSON.stringify(aResult));

                        // oFunction.setParameter("dueDate", dueDate);
                        // oFunction.setParameter("percentage", percentage);
                        // oFunction.setParameter("calculationDate", calculationDate);
                        // oFunction.setParameter("conditionAmt", conditionAmt);
                        // oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

                        result = await oFunction.execute();
                    result = oFunction;
                }
                await backendcall.call(this);





                function getKeyWithExtras() {
                    const url = window.location.href;
                    const match = url.match(/Contract\((.*)\)/);

                    var status = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent").mAggregations.content[0].mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].mAggregations.formContainers[0].mAggregations.formElements[2].getFields()[0].getText()
                    var disbursementstatus = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent").mAggregations.content[0].mAggregations.items[0].mAggregations.items[0].mAggregations.items[1].mAggregations.formContainers[0].mAggregations.formElements[3].getFields()[0].getText()
                    if (match) {
                        let key = match[1]; // extract inside of Contract(...)

                        // append new fields
                        key += `,status='${status}',disbursementStatus='${disbursementstatus}'`;

                        return key;
                    }
                    return null;
                }

                // let keyParams = getKeyWithExtras();
                let aFinalData = result.getBoundContext().getValue().value;
                var oData = {
                    rows: aFinalData
                };

                sap.ui.getCore().setModel(new JSONModel(oData), "test1");


                // if (keyParams) {
                console.log(aFinalData);
                this.getAppComponent().getRouter().navTo("LoanAmortizationCompareCalcFlowPage", {
                    key: "tttt"
                });
                // }

            },
            onPaymentFromChange1: function (oEvent) {
                debugger
                var oComboBox = oEvent.getSource();
                var sSelectedText = oComboBox.getSelectedItem().getText(); // e.g. "LM(Monthly end of mo due next day)"

                // Get the row context
                var oContext = oComboBox.getBindingContext();
                if (!oContext) return;

                var oModel = oContext.getModel();
                var oRowData = oContext.getObject();

                const freqMap = {
                    "LM(Monthly end of mo due next day)": { code: "LM", months: 1 },
                    "MN(Monthly at end of period)": { code: "MN", months: 1 },
                    "LQ(Quartly end of pd due nxt day)": { code: "LQ", months: 3 },
                    "LS(Semiannual end of pd du nxtday)": { code: "LS", months: 6 },
                    "VV(Quarterly at start of period)": { code: "VV", months: 3 }
                };

                // Helper functions
                function isWorkingDay(date) {
                    const day = date.getDay();
                    return day !== 0 && day !== 6; // Sunday(0), Saturday(6)
                }

                function getNextWorkingDay(date) {
                    let d = new Date(date);
                    while (!isWorkingDay(d)) {
                        d.setDate(d.getDate() + 1);
                    }
                    return d;
                }

                function getLastDayOfMonth(year, month) {
                    return new Date(year, month + 1, 0);
                }

                function formatDateOnly(date) {
                    return date.toISOString().split("T")[0]; // YYYY-MM-DD
                }

                // --- Calculate schedule ---
                const effectiveFrom = new Date(oRowData.effectiveFrom);
                const freq = freqMap[sSelectedText];

                if (freq) {
                    // Example schedule logic (replicate your getSchedule)
                    let calculationDate = new Date(effectiveFrom);
                    let dueDate = new Date(effectiveFrom);

                    // Monthly/Quarterly/Semiannual frequency
                    dueDate.setMonth(dueDate.getMonth() + freq.months);
                    calculationDate = getNextWorkingDay(dueDate);


                    // Update the model fields
                    oModel.setProperty(oContext.getPath() + "/frequencyInMonths", freq.months);
                    oModel.setProperty(oContext.getPath() + "/dueDate", formatDateOnly(dueDate));
                    oModel.setProperty(oContext.getPath() + "/calculationDate", formatDateOnly(calculationDate));
                }
            }
            });
    }
);
