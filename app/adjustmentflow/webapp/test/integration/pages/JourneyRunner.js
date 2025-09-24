sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"adjustmentflow/test/integration/pages/contractAdjustList",
	"adjustmentflow/test/integration/pages/contractAdjustObjectPage",
	"adjustmentflow/test/integration/pages/ConditionItemsAdjustObjectPage"
], function (JourneyRunner, contractAdjustList, contractAdjustObjectPage, ConditionItemsAdjustObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('adjustmentflow') + '/test/flpSandbox.html#adjustmentflow-tile',
        pages: {
			onThecontractAdjustList: contractAdjustList,
			onThecontractAdjustObjectPage: contractAdjustObjectPage,
			onTheConditionItemsAdjustObjectPage: ConditionItemsAdjustObjectPage
        },
        async: true
    });

    return runner;
});

