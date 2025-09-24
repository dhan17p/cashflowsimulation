sap.ui.define([
    "sap/m/MessageToast",
    "sap/ushell/Container"
], function (MessageToast, Container) {
    'use strict';

    return {
        adjustmentPayment1: async function (oEvent) {
            debugger
            var data;
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


                function buildContractData(oView) {
                    // Get all rows from your deep aggregation chain
                    const aRows =
                        oView.getContent()[0]
                            .getSections()[2]
                            .getSubSections()[3]
                            .mAggregations._grid
                            .mAggregations.content[0]
                            .mAggregations.content
                            .mAggregations.content
                            .mAggregations._content
                            .getRows();

                    const result = {
                        interestPeriods: [],
                        repaymentChanges: [],
                        finalRepaymentDate: null
                    };

                    aRows.forEach(row => {
                        if (row.getBindingContext()) {
                            const oData = row.getBindingContext().getObject();

                            switch (oData.conditionTypeText) {
                                case "Nominal Interest Fixed":
                                    result.interestPeriods.push({
                                        start: formatDate(oData.effectiveFrom),
                                        rate: parseFloat(oData.percentage) || 0
                                    });
                                    break;

                                case "Annuity repayment":
                                    result.repaymentChanges.push({
                                        start: formatDate(oData.effectiveFrom),
                                        amount: parseFloat(oData.conditionAmt) || 0
                                    });
                                    break;

                                case "Final Repayment":
                                    // only one expected
                                    result.finalRepaymentDate = formatDate(oData.effectiveFrom);
                                    break;
                            }
                        }
                    });

                    return result;
                }

                let aResult = buildContractData(this._view);
                console.log(aResult);

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

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFunc(...)");

                oFunction.setParameter("principal", String(data.commitCapital));
                oFunction.setParameter("annualRate", '0.04');
                oFunction.setParameter("startDate", String(data.fixedFrom));
                oFunction.setParameter("endDate", String(data.fixedUntil));
                // oFunction.setParameter("interestFixedDate", effectiveDate);
                oFunction.setParameter("inclusiveIndicator", String(data.include));
                oFunction.setParameter("contractId", String(data.ID));
                oFunction.setParameter("intCalMt", String(data.intCalMt)),
                    oFunction.setParameter("isActiveEntity", isActiveEntity),
                    // oFunction.setParameter("loanData", JSON.stringify(aResult));

                    // oFunction.setParameter("dueDate", dueDate);
                    // oFunction.setParameter("percentage", percentage);
                    // oFunction.setParameter("calculationDate", calculationDate);
                    // oFunction.setParameter("conditionAmt", conditionAmt);
                    // oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

                    await oFunction.execute();
            }
            await backendcall.call(this);

            function formatDate(isoDateStr) {
                if (!isoDateStr) return ""; // handle null/empty
                const parts = isoDateStr.split("-"); // ["2025","09","16"]
                return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
            }
            var startFromOld = formatDate(data.fixedFrom);
            var EndFromOld = formatDate(data.fixedUntil);
            // Create a JSON model with these values
            var oModel = new sap.ui.model.json.JSONModel({
                startFromOld: startFromOld,
                EndFromOld: EndFromOld
            });

            // Set the model to the view (so you can use in XML/JS)
            sap.ui.getCore().setModel(oModel, "OldStartEnd");


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

            let keyParams = getKeyWithExtras();


            if (keyParams) {
                this.getRouting().navigateToRoute("ConditionItemsAdjustmentflowPage", {
                    key: keyParams
                });
            }
        },
        adjustmentPayment: async function (oEvent) {
            debugger



            var data;
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


                function buildContractData(oView) {
                    // Get all rows from your deep aggregation chain
                    const aRows =
                        oView.getContent()[0]
                            .getSections()[2]
                            .getSubSections()[3]
                            .mAggregations._grid
                            .mAggregations.content[0]
                            .mAggregations.content
                            .mAggregations.content
                            .mAggregations._content
                            .getRows();

                    const result = {
                        interestPeriods: [],
                        repaymentChanges: [],
                        finalRepaymentDate: null
                    };

                    aRows.forEach(row => {
                        if (row.getBindingContext()) {
                            const oData = row.getBindingContext().getObject();

                            switch (oData.conditionTypeText) {
                                case "Nominal Interest Fixed":
                                    result.interestPeriods.push({
                                        start: formatDate(oData.effectiveFrom),
                                        rate: parseFloat(oData.percentage) || 0
                                    });
                                    break;

                                case "Annuity repayment":
                                    result.repaymentChanges.push({
                                        start: formatDate(oData.effectiveFrom),
                                        amount: parseFloat(oData.conditionAmt) || 0
                                    });
                                    break;

                                case "Final Repayment":
                                    // only one expected
                                    result.finalRepaymentDate = formatDate(oData.effectiveFrom);
                                    break;
                            }
                        }
                    });

                    return result;
                }

                let aResult = buildContractData(this._view);
                console.log(aResult);

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

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFunc(...)");

                oFunction.setParameter("principal", String(data.commitCapital));
                oFunction.setParameter("annualRate", '0.04');
                oFunction.setParameter("startDate", String(data.fixedFrom));
                oFunction.setParameter("endDate", String(data.fixedUntil));
                // oFunction.setParameter("interestFixedDate", effectiveDate);
                oFunction.setParameter("inclusiveIndicator", String(data.include));
                oFunction.setParameter("contractId", String(data.ID));
                oFunction.setParameter("intCalMt", String(data.intCalMt)),
                    oFunction.setParameter("isActiveEntity", isActiveEntity),
                    // oFunction.setParameter("loanData", JSON.stringify(aResult));

                    // oFunction.setParameter("dueDate", dueDate);
                    // oFunction.setParameter("percentage", percentage);
                    // oFunction.setParameter("calculationDate", calculationDate);
                    // oFunction.setParameter("conditionAmt", conditionAmt);
                    // oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

                    await oFunction.execute();
            }
            await backendcall.call(this);

            function formatDate(isoDateStr) {
                if (!isoDateStr) return ""; // handle null/empty
                const parts = isoDateStr.split("-"); // ["2025","09","16"]
                return parts[1] + "/" + parts[2] + "/" + parts[0]; // mm/dd/yyyy
            }
            var startFromOld = formatDate(data.fixedFrom);
            var EndFromOld = formatDate(data.fixedUntil);
            // Create a JSON model with these values
            var oModel = new sap.ui.model.json.JSONModel({
                startFromOld: startFromOld,
                EndFromOld: EndFromOld
            });

            // Set the model to the view (so you can use in XML/JS)
            sap.ui.getCore().setModel(oModel, "OldStartEnd");


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

            let keyParams = getKeyWithExtras();
            function getContractParamsFromUrl() {
                const url = window.location.href;

                const match = url.match(/Contract\(([^)]+)\)/);
                if (!match) return {};

                const paramsString = match[1];
                const paramsArray = paramsString.split(",");

                const params = {};
                paramsArray.forEach(pair => {
                    let [key, value] = pair.split("=");

                    key = key.trim();
                    value = value.replace(/^'|'$/g, ""); // remove quotes if present

                    // decode twice so %2520 → %20 → " "
                    value = decodeURIComponent(decodeURIComponent(value));

                    if (value === "true") value = true;
                    if (value === "false") value = false;

                    params[key] = value;
                });

                return params;
            }


            debugger
            const Navigation = await Container.getServiceAsync("Navigation");

            // Get params from current URL
            const contractParams = getContractParamsFromUrl();

            console.log("Extracted Params:", contractParams);

            await Navigation.navigate({
                target: {
                    semanticObject: "adjustmentsem",
                    action: "display"
                },
                params: contractParams
            });

            // var xnavservice = sap.ushell && sap.ushell.Container &&
            //     sap.ushell.Container.getService &&
            //     sap.ushell.Container.getService("CrossApplicationNavigation");
            // var href = (xnavservice && xnavservice.hrefForExternal({ target: { semanticObject: "adjustmentsem", action: "display" }, params: { "ProductID": "102343333" } })) || "";
            // //  var finalUrl = window.location.href.split("#")[0] + href; 
            // //  sap.m.URLHelper.redirect(finalUrl, true)


        }
    };
});
