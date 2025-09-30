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
            _onObjectMatched1: async function (oEvent) {
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

                // let odata = sap.ui.getCore().getModel("test1");
                // let otestdata = odata.getData().rows;
                // this.setModel(new JSONModel({ rows: otestdata }), "test");


                var odata = sap.ui.getCore().getModel("NewTable");
                var newotestdata = odata.getData().rows;
                ///new table

                var odata = sap.ui.getCore().getModel("OldTable");
                var oldotestdata = odata.getData().rows;



                //Screens
                //allign function
                function alignTables(oldData, newData) {
                    // 1. Ensure arrays and filter out SAP metadata ($count, $created, etc.)
                    oldData = Array.isArray(oldData) ? oldData.filter(x => x.flowType) : [];
                    newData = Array.isArray(newData) ? newData.filter(x => x.flowType) : [];

                    // 2. Collect all unique keys (MM/YYYY + flowType)
                    const makeKey = (item) => {
                        const [MM, , YYYY] = item.dueDate.split("/");
                        return `${MM}/${YYYY}_${item.flowType}`;
                    };

                    const allKeys = new Set([
                        ...oldData.map(makeKey),
                        ...newData.map(makeKey)
                    ]);

                    // 3. Create lookup maps
                    const oldMap = new Map(oldData.map(item => [makeKey(item), item]));
                    const newMap = new Map(newData.map(item => [makeKey(item), item]));

                    // 4. Build aligned tables with missing entries filled as amount = 0
                    const fillMissing = (map, otherMap) => {
                        const result = [];
                        allKeys.forEach(key => {
                            if (map.has(key)) {
                                result.push(map.get(key));
                            } else {
                                const [datePart, flowType] = key.split("_");
                                const [MM, YYYY] = datePart.split("/");
                                result.push({
                                    dueDate: `${MM}/01/${YYYY}`, // use 1st of month
                                    flowType,
                                    name: otherMap.get(key)?.name || "",
                                    amount: 0
                                });
                            }
                        });
                        return result;
                    };

                    const alignedOld = fillMissing(oldMap, newMap);
                    const alignedNew = fillMissing(newMap, oldMap);

                    // 5. Sort by Year, Month, then flowType
                    const sortFn = (a, b) => {
                        const [aM, , aY] = a.dueDate.split("/").map(Number);
                        const [bM, , bY] = b.dueDate.split("/").map(Number);
                        if (aY !== bY) return aY - bY;
                        if (aM !== bM) return aM - bM;
                        return a.flowType.localeCompare(b.flowType);
                    };

                    alignedOld.sort(sortFn);
                    alignedNew.sort(sortFn);

                    console.log("✅ Aligned lengths", alignedOld.length, alignedNew.length);
                    return { oldData: alignedOld, newData: alignedNew };
                }

                // Example usage
                const { oldData: alignedOld, newData: alignedNew } = alignTables(oldotestdata, newotestdata);
                console.log("Old Table", alignedOld);
                console.log("New Table", alignedNew);
                this.setModel(new JSONModel({ rows: alignedOld }), "OldTableAdjustScreen");
                this.setModel(new JSONModel({ rows: alignedNew }), "NewTableAdjustScreen");



                //SCreen Model


                // Group by name and sum amounts for Old Table
                const oldTableTotals = oldotestdata.reduce((acc, item) => {
                    const name = item.name;
                    const amount = parseFloat(item.amount) || 0;

                    if (!acc[name]) {
                        acc[name] = 0;
                    }
                    acc[name] += amount;

                    return acc;
                }, {});

                // Fix to 2 decimal places
                Object.keys(oldTableTotals).forEach(key => {
                    oldTableTotals[key] = parseFloat(oldTableTotals[key].toFixed(2));
                });

                console.log(oldTableTotals);
                this.setModel(new JSONModel(oldTableTotals), "OldTableTotals");

                // New Table





                // Group by name and sum amounts for New Table
                const newTableTotals = newotestdata.reduce((acc, item) => {
                    const name = item.name;
                    const amount = parseFloat(item.amount) || 0;

                    if (!acc[name]) {
                        acc[name] = 0;
                    }
                    acc[name] += amount;

                    return acc;
                }, {});

                // Fix to 2 decimal places
                Object.keys(newTableTotals).forEach(key => {
                    newTableTotals[key] = parseFloat(newTableTotals[key].toFixed(2));
                });

                console.log(newTableTotals);
                this.setModel(new JSONModel(newTableTotals), "NewTableTotals");
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
