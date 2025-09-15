sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('loancreation.ext.controller.Objectpagecont', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf loancreation.ext.controller.Objectpagecont
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: function () {
				// Get the Object Page
				var oObjectPage = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage");

				// Attach the event
				if (oObjectPage) {
					oObjectPage.attachSectionChange(function (oEvent) {
						var oSection = oEvent.getParameter("section");
						// setWidth();
						// 👉 your logic here
					});
				}
			},
			routing: {
				onBeforeBinding1: function () {
					debugger
					try {
						// sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").firePress();
						// sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").setPressed(true);
						sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::Form::Conditions1::Content").mAggregations.formContainers[0].getTitle().destroy()

					} catch (error) {
						console.log(error);
					}
					// sap.ui.getCore().byId("CreateDialog::Contract")?.setTitle("false");
				},
				onAfterBinding: function () {
					debugger

					// setWidth();
					const oDatePicker = sap.ui.getCore().byId(
						"loancreation::contractNewObjectPage--fe::FormContainer::Fixed::FormElement::DataField::fixedFrom::Field-edit"
					);
					const oDisplayField = sap.ui.getCore().byId(
						"loancreation::contractNewObjectPage--fe::FormContainer::Fixed::FormElement::DataField::fixedFrom::Field-display"
					);

					const oDatePicker1 = sap.ui.getCore().byId(
						"loancreation::contractNewObjectPage--fe::FormContainer::Fixed::FormElement::DataField::fixedUntil::Field-edit"
					);
					const oDisplayField1 = sap.ui.getCore().byId(
						"loancreation::contractNewObjectPage--fe::FormContainer::Fixed::FormElement::DataField::fixedUntil::Field-display"
					);

					// ---- fixedFrom ----
					if (oDatePicker) {
						oDatePicker.unbindProperty("value"); // remove wrong binding
						oDatePicker.bindProperty("dateValue", { path: "fixedFrom" });
						oDatePicker.setDisplayFormat("MM/dd/yyyy");
						oDatePicker.setValueFormat("yyyy/MM/dd");
					}
					if (oDisplayField) {
						setTimeout(() => {
							const sRawValue = oDisplayField.getText();
							if (sRawValue) {
								const oDate = new Date(sRawValue);
								if (!isNaN(oDate.getTime())) {
									const dd = String(oDate.getDate()).padStart(2, "0");
									const mm = String(oDate.getMonth() + 1).padStart(2, "0");
									const yyyy = oDate.getFullYear();
									oDisplayField.setText(`${dd}/${mm}/${yyyy}`);
								}
							}
						}, 1000);
					}

					// ---- fixedUntil ----
					if (oDatePicker1) {
						oDatePicker1.unbindProperty("value"); // remove wrong binding
						oDatePicker1.bindProperty("dateValue", { path: "fixedUntil" });
						oDatePicker1.setDisplayFormat("MM/dd/yyyy");
						oDatePicker1.setValueFormat("yyyy/MM/dd");
					}
					if (oDisplayField1) {
						setTimeout(() => {
							const sRawValue = oDisplayField1.getText();
							if (sRawValue) {
								const oDate = new Date(sRawValue);
								if (!isNaN(oDate.getTime())) {
									const dd = String(oDate.getDate()).padStart(2, "0");
									const mm = String(oDate.getMonth() + 1).padStart(2, "0");
									const yyyy = oDate.getFullYear();
									oDisplayField1.setText(`${mm}/${dd}/${yyyy}`);
								}
							}
						}, 1000);
					}

					// if (oDatePicker1) {
					// 	debugger
					// 	// Keep binding on 'value', but adjust format
					// 	oDatePicker.unbindProperty("value"); // remove wrong binding
					// 	oDatePicker.bindProperty("dateValue", {
					// 		path: "fixedUntil"
					// 	});
					// 	oDatePicker.setDisplayFormat("dd/MM/yyyy");
					// }

					// // Display field (read-only mode) - format without rebinding
					// if (oDisplayField1) {
					// 	const sRawValue = oDisplayField.getText();
					// 	if (sRawValue) {
					// 		const oDate = new Date(sRawValue);
					// 		const dd = String(oDate.getDate()).padStart(2, "0");
					// 		const mm = String(oDate.getMonth() + 1).padStart(2, "0");
					// 		const yyyy = oDate.getFullYear();
					// 		const sFormatted = `${dd}/${mm}/${yyyy}`;
					// 		oDisplayField.setText(sFormatted); // directly set formatted text
					// 	}
					// }

					// var uiTable = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::table::contractToCondition::LineItem::ConditionItems4-innerTable")
					// uiTable.attachRowsUpdated(() => {
					// 	debugger
					// });
					function getIsActiveEntityFromUrl() {
						const sHash = window.location.hash; // get everything after #
						const sMatch = sHash.match(/\((.*)\)/); // match the content inside parentheses
						if (sMatch && sMatch[1]) {
							const sParams = sMatch[1]; // e.g., "ID=...,loanNumber='888',...,IsActiveEntity=true"
							const aPairs = sParams.split(","); // split by comma
							for (let i = 0; i < aPairs.length; i++) {
								const [key, value] = aPairs[i].split("=");
								if (key.trim() === "IsActiveEntity") {
									return value === "true"; // convert string to boolean
								}
							}
						}
						return null; // not found
					}

					const bIsActiveEntity = getIsActiveEntityFromUrl();
					function formatDateColumn() {
						const oFacet = sap.ui.getCore().byId(
							"loancreation::contractNewObjectPage--fe::FacetSubSection::ConditionItems"
						);

						if (!oFacet) return;

						let oInnerTable;
						try {
							oInnerTable =
								oFacet.mAggregations._grid.mAggregations.content[0].mAggregations.content
									.mAggregations.content.mAggregations._content; // MDC inner table
						} catch (e) { }

						if (!oInnerTable) {
							// retry until inner table exists
							setTimeout(formatDateColumn, 1000);
							return;
						}

						// Attach the rowsUpdated event once
						if (!oInnerTable._dateFormattingAttached) {
							oInnerTable.attachRowsUpdated(() => {
								updateRows(oInnerTable);
							});
							oInnerTable._dateFormattingAttached = true; // prevent multiple attachments
						}

						// Initial formatting if rows are already present
						updateRows(oInnerTable);
					}

					function updateRows(oInnerTable) {
						if (!oInnerTable.mAggregations.rows || oInnerTable.mAggregations.rows.length === 0) return;

						const aRows = oInnerTable.mAggregations.rows;
						// setWidth();

						aRows.forEach(row => {
							// Format for column 2 (effectiveFrom)
							formatDateCell(row.getCells()[1], "effectiveFrom");

							// Format for column 6 (calculationFrom)
							formatDateCell(row.getCells()[6], "dueDate");

							// Format for column 7 (calculationDate)
							formatDateCell(row.getCells()[7], "calculationDate");
						});
					}

					function formatDateCell(oCell, sPath) {
						if (!oCell) return;

						// --- Edit mode (DatePicker) ---
						const oDatePicker = oCell?.mAggregations?.content?.mAggregations?.contentEdit?.[0];
						if (oDatePicker && oDatePicker.setDisplayFormat) {
							oDatePicker.unbindProperty("value");
							oDatePicker.bindProperty("dateValue", { path: sPath });
							oDatePicker.setDisplayFormat("MM/dd/yyyy");
							oDatePicker.setValueFormat("yyyy/MM/dd");
						}

						// --- Display mode (Text) ---
						const oTextDisplay = oCell?.mAggregations?.content?.mAggregations?.contentDisplay;
						if (oTextDisplay && oTextDisplay.setText) {
							const sDate = oTextDisplay.getText();
							if (sDate) {
								const oDate = new Date(sDate);
								if (!isNaN(oDate.getTime())) {
									const dd = String(oDate.getDate()).padStart(2, "0");
									const mm = String(oDate.getMonth() + 1).padStart(2, "0");
									const yyyy = oDate.getFullYear();
									oTextDisplay.setText(`${mm}/${dd}/${yyyy}`);
								} else {
									oTextDisplay.setText(""); // clear if invalid
								}
							} else {
								oTextDisplay.setText(""); // clear if no date
							}
						}
					}

					// Start formatting
					formatDateColumn();



				}
			}
		}
	});
});
