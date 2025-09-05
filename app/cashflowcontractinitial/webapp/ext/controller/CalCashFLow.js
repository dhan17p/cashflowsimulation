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
            let effectiveDate = this._view.getContent()[0].getSections()[2].getSubSections()[3].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mAggregations.rows[0].getBindingContext().getObject().effectiveFrom;
            let data = this._view.getContent()[0].getBindingContext().getObject();

            let oFunction = this._view.getModel().bindContext("/loadAmortizationFunc(...)");

            oFunction.setParameter("principal", String(data.commitCapital));
            oFunction.setParameter("annualRate", '0.04');
            oFunction.setParameter("startDate", String(data.fixedFrom));
            oFunction.setParameter("endDate", String(data.fixedUntil));
            oFunction.setParameter("interestFixedDate", effectiveDate);
            oFunction.setParameter("inclusiveIndicator", String(data.include));
            oFunction.setParameter("contractId", String(data.ID));
            oFunction.setParameter("intCalMt", String(data.intCalMt))
            await oFunction.execute();
            if (!this.oDialog) {
                this.oDialog = this.loadFragment({
                    name: "cashflowcontractinitial.ext.fragment.Dialog"
                })
            }

            this.oDialog.then((oDialog) => {
                debugger
                oDialog.open();
            })
j

            // MessageToast.show("Custom handler invoked.");
        },
        onDialogAfterOpen: function (oEvent) {
            debugger;

            var oTable = oEvent.getSource().getContent()[0].getItems()[1].getContent()[0];
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                // Access the JSONModel data path used for this table
                var oModel = oBinding.getModel();
                var sPath = oBinding.getPath(); // e.g., "/LoanAmortization"
                var aData = oModel.getProperty(sPath) || [];

                // Sort array manually by dd-MM-yyyy
                aData.sort(function (a, b) {
                    function parseDate(sDate) {
                        if (!sDate) return new Date(0);
                        var parts = sDate.split("-");
                        if (parts.length !== 3) return new Date(0);

                        var day = parseInt(parts[0], 10);   // dd
                        var month = parseInt(parts[1], 10) - 1; // MM
                        var year = parseInt(parts[2], 10);  // yyyy

                        return new Date(year, month, day);
                    }

                    var dA = parseDate(a.periodStart);
                    var dB = parseDate(b.periodStart);

                    return dA - dB; // ascending
                });

                // Push the sorted array back to model
                oModel.setProperty(sPath, aData);
            }
        },

        onClosePress: function (oEvent) {
            debugger
            let oDialog = oEvent.getSource().getParent();

            oDialog.close();
        }


    }
});
