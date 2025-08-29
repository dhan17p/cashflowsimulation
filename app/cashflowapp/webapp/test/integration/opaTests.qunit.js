sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cashflowapp/test/integration/FirstJourney',
		'cashflowapp/test/integration/pages/CashFlowList',
		'cashflowapp/test/integration/pages/CashFlowObjectPage'
    ],
    function(JourneyRunner, opaJourney, CashFlowList, CashFlowObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cashflowapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCashFlowList: CashFlowList,
					onTheCashFlowObjectPage: CashFlowObjectPage
                }
            },
            opaJourney.run
        );
    }
);