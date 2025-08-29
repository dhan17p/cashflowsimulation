sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'cashflowsimulation2',
            componentId: 'CashFlow2List',
            contextPath: '/CashFlow2'
        },
        CustomPageDefinitions
    );
});