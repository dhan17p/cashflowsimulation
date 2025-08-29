sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'cashflowsimulation2',
            componentId: 'cashFlowLineItemObjectPage',
            contextPath: '/CashFlow2/cashflow2toItem'
        },
        CustomPageDefinitions
    );
});