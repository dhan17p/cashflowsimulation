sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'cashflowsimulation2/test/integration/FirstJourney',
		'cashflowsimulation2/test/integration/pages/CashFlow2List',
		'cashflowsimulation2/test/integration/pages/CashFlow2ObjectPage',
		'cashflowsimulation2/test/integration/pages/cashFlowLineItemObjectPage'
    ],
    function(JourneyRunner, opaJourney, CashFlow2List, CashFlow2ObjectPage, cashFlowLineItemObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('cashflowsimulation2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCashFlow2List: CashFlow2List,
					onTheCashFlow2ObjectPage: CashFlow2ObjectPage,
					onThecashFlowLineItemObjectPage: cashFlowLineItemObjectPage
                }
            },
            opaJourney.run
        );
    }
);