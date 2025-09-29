sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (MessageToast, JSONModel) {
    'use strict';

    return {
        calculatecashflow: async function (oEvent) {
            debugger
            var result;
            var data;
            async function backendcall() {
                function getIsActiveEntity() {
                    const url = window.location.href;
                    const match = url.match(/contractAdjust\(([^)]+)\)/);
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

                // var tablerows = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.getRows();

                // var nominaleffectivefrom1 = tablerows[0].getBindingContext().getObject().effectiveFrom;
                // var nominaleffectivefrom2 = tablerows[1].getBindingContext().getObject().effectiveFrom;

                // var nominalpercentage1 = tablerows[0].getBindingContext().getObject().percentage;
                // var nominalpercentage2 = tablerows[1].getBindingContext().getObject().percentage;


                // var annuityamount1 = tablerows[2].getBindingContext().getObject().conditionAmt;
                // var annuityamount2 = tablerows[3].getBindingContext().getObject().conditionAmt;

                // var finalRepaymentDate = tablerows[4].getBindingContext().getObject().effectiveFrom;
                // let rowObjects = tablerows.map(row => row.getBindingContext().getObject());
                // let loanData = {
                //     nominaleffectivefrom1: rowObjects[0].effectiveFrom,
                //     nominaleffectivefrom2: rowObjects[1].effectiveFrom,
                //     nominalpercentage1: rowObjects[0].percentage,
                //     nominalpercentage2: rowObjects[1].percentage,

                //     anuityeffectivefrom1: rowObjects[2].effectiveFrom,
                //     anuityeffectivefrom2: rowObjects[3].effectiveFrom,
                //     annuityamount1: rowObjects[2].conditionAmt,
                //     annuityamount2: rowObjects[3].conditionAmt,
                //     finalRepaymentDate: rowObjects[4].effectiveFrom
                // };


                // function buildContractData(oView) {
                //     // Get all rows from your deep aggregation chain
                //     const aRows =
                //         oView.getContent()[0]
                //             .getSections()[2]
                //             .getSubSections()[3]
                //             .mAggregations._grid
                //             .mAggregations.content[0]
                //             .mAggregations.content
                //             .mAggregations.content
                //             .mAggregations._content
                //             .getRows();

                //     const result = {
                //         interestPeriods: [],
                //         repaymentChanges: [],
                //         finalRepaymentDate: null
                //     };

                //     aRows.forEach(row => {
                //         if (row.getBindingContext()) {
                //             const oData = row.getBindingContext().getObject();

                //             switch (oData.conditionTypeText) {
                //                 case "Nominal Interest Fixed":
                //                     result.interestPeriods.push({
                //                         start: formatDate(oData.effectiveFrom),
                //                         rate: parseFloat(oData.percentage) || 0
                //                     });
                //                     break;

                //                 case "Annuity repayment":
                //                     result.repaymentChanges.push({
                //                         start: formatDate(oData.effectiveFrom),
                //                         amount: parseFloat(oData.conditionAmt) || 0
                //                     });
                //                     break;

                //                 case "Final Repayment":
                //                     // only one expected
                //                     result.finalRepaymentDate = formatDate(oData.effectiveFrom);
                //                     break;
                //             }
                //         }
                //     });

                //     return result;
                // }

                // let aResult = buildContractData(this._view);
                // console.log(aResult);

                // Helper: convert SAP date (yyyy-MM-dd) → dd/MM/yyyy
                function formatDate(sDate) {
                    if (!sDate) return null;
                    const oDate = new Date(sDate);
                    if (isNaN(oDate.getTime())) return null;
                    const dd = String(oDate.getDate()).padStart(2, "0");
                    const mm = String(oDate.getMonth() + 1).padStart(2, "0");
                    const yyyy = oDate.getFullYear();
                    return `${dd}/${mm}/${yyyy}`;
                }
                // let effectiveDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().effectiveFrom;
                // let percentage = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().percentage;
                // let dueDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().dueDate;
                // let calculationDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().calculationDate;
                // let conditionAmt = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[2].getBindingContext().getObject().conditionAmt;
                // let efffectiveDatefinalRepayment = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[3].getBindingContext().getObject().effectiveFrom;
                data = this._view.getContent()[0].getBindingContext().getObject();


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

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFuncAdjust(...)");

                oFunction.setParameter("principal", String(data.commitCapital));
                oFunction.setParameter("annualRate", '0.04');
                oFunction.setParameter("startDate", String(data.fixedFrom));
                oFunction.setParameter("endDate", String(data.fixedUntil));
                // oFunction.setParameter("interestFixedDate", effectiveDate);
                oFunction.setParameter("inclusiveIndicator", "true");
                oFunction.setParameter("contractId", String(data.ID));
                oFunction.setParameter("intCalMt", String(data.intCalMt));
                oFunction.setParameter("isActiveEntity", String(isActiveEntity));
                // oFunction.setParameter("loanData", JSON.stringify(aResult));

                // oFunction.setParameter("dueDate", dueDate);
                // oFunction.setParameter("percentage", percentage);
                // oFunction.setParameter("calculationDate", calculationDate);
                // oFunction.setParameter("conditionAmt", conditionAmt);
                // oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

                let result11 = await oFunction.execute();
                result = oFunction;
            }
            await backendcall.call(this);
            console.log(result);

            let aFinalData = result.getBoundContext().getValue();
            let aAdjustTypeOld = aFinalData.aAdjustTypeOld
            let aAdjustTypeNew = aFinalData.aAdjustTypeNew
            var oData = {
                rows: aAdjustTypeOld
            };

            sap.ui.getCore().setModel(new JSONModel(oData), "OldTable");
            var oData = {
                rows: aAdjustTypeNew
            };

            sap.ui.getCore().setModel(new JSONModel(oData), "NewTable");



            function formatDate(isoDateStr) {
                if (!isoDateStr) return ""; // handle null/empty
                const parts = isoDateStr.split("-"); // ["2025","09","16"]
                return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
            }
            debugger
            var startFromNew = formatDate(data.fixedFrom);
            var EndFromOldNew = formatDate(data.fixedUntil);
            // Create a JSON model with these values
            var oModel = new sap.ui.model.json.JSONModel({
                startFromNew: startFromNew,
                EndFromOldNew: EndFromOldNew
            });

            // Set the model to the view (so you can use in XML/JS)
            sap.ui.getCore().setModel(oModel, "NewStartEnd");






            // MessageToast.show("Custom handler invoked.");
            debugger

            function getKeyWithExtras() {
                const url = window.location.href;
                const match = url.match(/contractAdjust\((.*)\)/);


                if (match) {
                    let key = match[1]; // extract inside of Contract(...)


                    return key;
                }
                return null;
            }

            let keyParams = getKeyWithExtras();

            if (keyParams) {
                this.getRouting().navigateToRoute("ConditionItemsAdjustAdjustmentCashFlowPage", {
                    key: keyParams
                });
            }
        }
    };
});
