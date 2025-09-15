sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"loancreation/test/integration/pages/contractNewList",
	"loancreation/test/integration/pages/contractNewObjectPage"
], function (JourneyRunner, contractNewList, contractNewObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('loancreation') + '/index.html',
        pages: {
			onThecontractNewList: contractNewList,
			onThecontractNewObjectPage: contractNewObjectPage
        },
        async: true
    });

    return runner;
});

