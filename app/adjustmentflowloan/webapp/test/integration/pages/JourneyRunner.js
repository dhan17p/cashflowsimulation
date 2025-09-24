sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"adjustmentflowloan/test/integration/pages/contractAdjustLoanList",
	"adjustmentflowloan/test/integration/pages/contractAdjustLoanObjectPage",
	"adjustmentflowloan/test/integration/pages/ConditionItemsAdjustLoanObjectPage"
], function (JourneyRunner, contractAdjustLoanList, contractAdjustLoanObjectPage, ConditionItemsAdjustLoanObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('adjustmentflowloan') + '/test/flpSandbox.html#adjustmentflowloan-tile',
        pages: {
			onThecontractAdjustLoanList: contractAdjustLoanList,
			onThecontractAdjustLoanObjectPage: contractAdjustLoanObjectPage,
			onTheConditionItemsAdjustLoanObjectPage: ConditionItemsAdjustLoanObjectPage
        },
        async: true
    });

    return runner;
});

