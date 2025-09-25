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
                    const match = url.match(/contractAdjustLoan\(([^)]+)\)/);
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

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFuncAdjustLoan(...)");

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

            let aFinalData = result.getBoundContext().getValue().value;
            var oData = {
                rows: aFinalData
            };

            sap.ui.getCore().setModel(new JSONModel(oData), "test1");



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




            //Navigation to Custom Page

            function getKeyWithExtras() {
                const url = window.location.href;
                const match = url.match(/contractAdjustLoan\((.*)\)/);


                if (match) {
                    let key = match[1]; // extract inside of Contract(...)


                    return key;
                }
                return null;
            }

            let keyParams = getKeyWithExtras();

            if (keyParams) {
                this.getRouting().navigateToRoute("ConditionItemsAdjustLoanAdjustmentCashFlowPage", {
                    key: keyParams
                });
            }
        }
    };
});
