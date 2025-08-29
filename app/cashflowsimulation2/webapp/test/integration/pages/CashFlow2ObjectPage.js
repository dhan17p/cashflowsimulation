sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'cashflowsimulation2',
            componentId: 'CashFlow2ObjectPage',
            contextPath: '/CashFlow2'
        },
        CustomPageDefinitions
    );
});