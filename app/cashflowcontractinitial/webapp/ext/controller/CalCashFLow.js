sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        onCalCashFlowOrg: function (oEvent) {
            debugger
            // -------------------
            // 1. Create SimpleForm with dummy data
            // -------------------
            var oForm = new sap.ui.layout.form.SimpleForm({
                editable: false,
                layout: "ResponsiveGridLayout",
                content: [
                    new sap.m.Label({ text: "Name" }), new sap.m.Text({ text: "John Doe" }),
                    new sap.m.Label({ text: "Email" }), new sap.m.Text({ text: "john.doe@example.com" }),
                    new sap.m.Label({ text: "Phone" }), new sap.m.Text({ text: "+1 123 456 7890" }),
                    new sap.m.Label({ text: "Department" }), new sap.m.Text({ text: "IT" })
                ]
            });

            // -------------------
            // 2. Create Table with hardcoded rows
            // -------------------
            var oTable = new sap.m.Table({
                // height: "100%",
                headerText: "Products",
                columns: [
                    new sap.m.Column({ header: new sap.m.Label({ text: "Product ID" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "Supplier" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "Category" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "Price" }) })
                ],
                items: [
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "P001" }),
                            new sap.m.Text({ text: "Supplier A" }),
                            new sap.m.Text({ text: "Cat 1" }),
                            new sap.m.Text({ text: "100" })
                        ]
                    }),
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "P002" }),
                            new sap.m.Text({ text: "Supplier B" }),
                            new sap.m.Text({ text: "Cat 2" }),
                            new sap.m.Text({ text: "200" })
                        ]
                    }),
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "P003" }),
                            new sap.m.Text({ text: "Supplier C" }),
                            new sap.m.Text({ text: "Cat 3" }),
                            new sap.m.Text({ text: "300" })
                        ]
                    })
                ]
            });

            // -------------------
            // 3. Create ObjectPageLayout with Form + Table
            // -------------------
            var oObjectPage = new sap.uxap.ObjectPageLayout({
                // showTitleInHeaderContent: true,
                // headerTitle: new sap.uxap.ObjectPageDynamicHeaderTitle({
                //     expandedHeading: new sap.m.Text({ text: "ObjectPage Dialog" }),
                //     snappedHeading: new sap.m.Text({ text: "Form + Table" })
                // }),
                height: "100%",
                sections: [
                    new sap.uxap.ObjectPageSection({
                        title: "Form Section",
                        subSections: [
                            new sap.uxap.ObjectPageSubSection({ blocks: [oForm] })
                        ]
                    }),
                    new sap.uxap.ObjectPageSection({
                        title: "Table Section",
                        subSections: [
                            new sap.uxap.ObjectPageSubSection({ blocks: [oTable] })
                        ]
                    })
                ]
            });

            var oScroll = new sap.m.ScrollContainer({
                height: "40vh",
                vertical: true,
                horizontal: false,
                content: [oObjectPage]
            });

            // 


            // -------------------
            // 4. Create Dialog
            // -------------------
            var oDialog = new sap.m.Dialog({
                title: "ObjectPage in Dialog",
                // contentWidth: "80%",
                contentHeight: "600px",
                content: [oObjectPage],
                beginButton: new sap.m.Button({
                    text: "Close",
                    press: function () { oDialog.close(); }
                }),
                afterClose: function () { oDialog.destroy(); }
            });

            // -------------------
            // 5. Open Dialog
            // -------------------
            oDialog.open();
        },
        onCalCashFlowor: async function (oEvent) {
            debugger
            try {

                var tablerows = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.getRows();

                var nominaleffectivefrom1 = tablerows[0].getBindingContext().getObject().effectiveFrom;
                var nominaleffectivefrom2 = tablerows[1].getBindingContext().getObject().effectiveFrom;

                var nominalpercentage1 = tablerows[0].getBindingContext().getObject().percentage;
                var nominalpercentage2 = tablerows[1].getBindingContext().getObject().percentage;


                var annuityamount1 = tablerows[2].getBindingContext().getObject().conditionAmt;
                var annuityamount2 = tablerows[3].getBindingContext().getObject().conditionAmt;

                var finalRepaymentDate = tablerows[4].getBindingContext().getObject().effectiveFrom;
                let rowObjects = tablerows.map(row => row.getBindingContext().getObject());
                let loanData = {
                    nominaleffectivefrom1: rowObjects[0].effectiveFrom,
                    nominaleffectivefrom2: rowObjects[1].effectiveFrom,
                    nominalpercentage1: rowObjects[0].percentage,
                    nominalpercentage2: rowObjects[1].percentage,

                    anuityeffectivefrom1: rowObjects[2].effectiveFrom,
                    anuityeffectivefrom2: rowObjects[3].effectiveFrom,
                    annuityamount1: rowObjects[2].conditionAmt,
                    annuityamount2: rowObjects[3].conditionAmt,
                    finalRepaymentDate: rowObjects[4].effectiveFrom
                };














                // let effectiveDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().effectiveFrom;
                // let percentage = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().percentage;
                // let dueDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().dueDate;
                // let calculationDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().calculationDate;
                // let conditionAmt = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[2].getBindingContext().getObject().conditionAmt;
                // let efffectiveDatefinalRepayment = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[3].getBindingContext().getObject().effectiveFrom;
                let data = this._view.getContent()[0].getBindingContext().getObject();


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

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFunc(...)");

                oFunction.setParameter("principal", String(data.commitCapital));
                oFunction.setParameter("annualRate", '0.04');
                oFunction.setParameter("startDate", String(data.fixedFrom));
                oFunction.setParameter("endDate", String(data.fixedUntil));
                // oFunction.setParameter("interestFixedDate", effectiveDate);
                oFunction.setParameter("inclusiveIndicator", String(data.include));
                oFunction.setParameter("contractId", String(data.ID));
                oFunction.setParameter("intCalMt", String(data.intCalMt))
                oFunction.setParameter("loanData", JSON.stringify(loanData));

                // oFunction.setParameter("dueDate", dueDate);
                // oFunction.setParameter("percentage", percentage);
                // oFunction.setParameter("calculationDate", calculationDate);
                // oFunction.setParameter("conditionAmt", conditionAmt);
                // oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

                await oFunction.execute();
                // --- 🔥 Destroy the old dialog if it exists
                if (this.oDialog) {
                    this.oDialog.destroy();
                    this.oDialog = null;
                }

                // --- 🔄 Always create a fresh dialog
                this.oDialog = await this.loadFragment({
                    name: "cashflowcontractinitial.ext.fragment.DialogOb"
                });

                this.oDialog.open();

            }
            catch (err) {
                console.log(err)
            }
            // MessageToast.show("Custom handler invoked.");
        },
        onCalCashFlow: async function (oEvent) {
            debugger



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
                let data = this._view.getContent()[0].getBindingContext().getObject();


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
                this.getRouting().navigateToRoute("AmortizationScheduleCashFlowPopupPage", {
                    key: keyParams
                });
            }
            // this.getRouting().navigateToRoute("AmortizationScheduleCashFlowPopupPage", {
            //     key: "ID=550e8400-e29b-41d4-a716-446655440000,loanNumber='LN1001',status='sadsadsadsad',productType='Housing',loanType='Fixed',loanPartner='PartnerA',IsActiveEntity=true"
            // })
        },
        onDialogAfterOpen: function (oEvent) {
            debugger;

            var oTable = oEvent.getSource().getContent()[0].getSections()[1].getSubSections()[0].getBlocks()[0];
            var oBinding = oTable.getBinding("rows");

            if (oBinding) {
                // Create a sorter on the "index" field (ascending)
                var oSorter = new sap.ui.model.Sorter("index", false);
                oBinding.sort(oSorter);
            }
            oTable.getModel().refresh(true);
        },

        onClosePress: function (oEvent) {
            debugger
            let oDialog = oEvent.getSource().getParent();

            oDialog.close();
        }


    }
});
