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
        onCalCashFlow: async function (oEvent) {
            debugger
            try {
                let effectiveDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().effectiveFrom;
                let percentage = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().percentage;
                let dueDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().dueDate;
                let calculationDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().calculationDate;
                let conditionAmt = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[2].getBindingContext().getObject().conditionAmt;
                let efffectiveDatefinalRepayment = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[3].getBindingContext().getObject().effectiveFrom;
                let data = this._view.getContent()[0].getBindingContext().getObject();


                if (
                    !data.commitCapital ||
                    !data.fixedFrom ||
                    !data.fixedUntil ||
                    !effectiveDate ||
                    !data.ID ||
                    !data.intCalMt ||
                    !efffectiveDatefinalRepayment
                ) {
                    sap.m.MessageBox.error(
                        "All mandatory fields must be filled before calculating cash flow."
                    );
                    return; // 🔥 Stop execution
                }

                let oFunction = this._view.getModel().bindContext("/loadAmortizationFunc(...)");

                oFunction.setParameter("principal", String(data.commitCapital));
                oFunction.setParameter("annualRate", '0.04');
                oFunction.setParameter("startDate", String(data.fixedFrom));
                oFunction.setParameter("endDate", String(data.fixedUntil));
                oFunction.setParameter("interestFixedDate", effectiveDate);
                oFunction.setParameter("inclusiveIndicator", String(data.include));
                oFunction.setParameter("contractId", String(data.ID));
                oFunction.setParameter("intCalMt", String(data.intCalMt))
                oFunction.setParameter("dueDate", dueDate);
                oFunction.setParameter("percentage", percentage);
                oFunction.setParameter("calculationDate", calculationDate);
                oFunction.setParameter("conditionAmt", conditionAmt);
                oFunction.setParameter("efffectiveDatefinalRepayment", efffectiveDatefinalRepayment);

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
