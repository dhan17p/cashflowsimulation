sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        calculatecashflow: function (oEvent) {
            debugger
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
