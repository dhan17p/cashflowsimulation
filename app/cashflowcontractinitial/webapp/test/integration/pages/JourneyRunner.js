sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"cashflowcontractinitial/test/integration/pages/ContractList",
	"cashflowcontractinitial/test/integration/pages/ContractObjectPage"
], function (JourneyRunner, ContractList, ContractObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('cashflowcontractinitial') + '/index.html',
        pages: {
			onTheContractList: ContractList,
			onTheContractObjectPage: ContractObjectPage
        },
        async: true
    });

    return runner;
});

