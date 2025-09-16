sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        onRatePress: async function (oEvent) {
            debugger
            let data = this._view.getContent()[0].getBindingContext().getObject();
            console.log(data);

            let oFunction = this._view.getModel().bindContext("/onRatePressB(...)");
            oFunction.setParameter("contractId", String(data.ID));
            oFunction.setParameter("isActiveEntity", String(data.IsActiveEntity));
            await oFunction.execute();

            const oFacet = sap.ui.getCore().byId(
                "loancreation::contractNewObjectPage--fe::FacetSubSection::ConditionItems"
            );
            let oTable = oFacet.mAggregations._grid.mAggregations.content[0].mAggregations.content
                .mAggregations.content.mAggregations._content; // MDC inner table
            // oTable.refreshRows()
            var oBinding = oTable.getBinding("rows");
            // console.log(this.getView().getModel().getProperty("/AmortizationSchedule2"));
            oBinding.refresh();

            oTable.getModel().refresh();
        }
    };
});
