sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"cashflowcontract/test/integration/pages/ContractList",
	"cashflowcontract/test/integration/pages/ContractObjectPage"
], function (JourneyRunner, ContractList, ContractObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('cashflowcontract') + '/index.html',
        pages: {
			onTheContractList: ContractList,
			onTheContractObjectPage: ContractObjectPage
        },
        async: true
    });

    return runner;
});

