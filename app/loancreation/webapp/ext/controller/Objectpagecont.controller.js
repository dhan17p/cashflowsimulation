sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	// function setWidth() {
	// 	debugger
	// 	// var conditionItems = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::table::contractToCondition::LineItem::ConditionItems4");
	// 	// var table_ui = sap.ui.getCore().byId("cashflowcontractinitial::ContractObjectPage--fe::table::contractToCondition::LineItem::ConditionItems4")
	// 	var conditionItemsColumns = sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::table::contractToCondition::LineItem::ConditionItems4").mAggregations._content.getColumns()
	// 	// conditionItems.getColumns()[0].setWidth("400px");
	// 	var columnWidths = [
	// 		"12.5rem",   // col 0
	// 		"8.2rem", // col 1
	// 		"5.5rem",  // col 2
	// 		"7rem",    // col 3
	// 		"19rem",   // col 4
	// 		"9.5rem",  // col 5
	// 		"8.2rem", // col 6
	// 		"8.2rem"     // col 7
	// 	];
	// 	// let oInnerTable = conditionItems;
	// 	// oInnerTable.addEventDelegate({
	// 	// 	onAfterRendering: function () {
	// 	// 		debugger
	// 	// 		var oTe = new sap.ui.table.TablePointerExtension(oInnerTable);
	// 	// 		oInnerTable.getColumns().forEach(function (oColumn, i) {
	// 	// 			oTe.doAutoResizeColumn(i);
	// 	// 		});
	// 	// 	}
	// 	// });

	// 	// Apply widths
	// 	conditionItemsColumns.forEach(function (oCol, index) {
	// 		if (columnWidths[index]) {
	// 			debugger
	// 			// oCol.setAutoResizable(false);
	// 			oCol.setWidth(columnWidths[index]);
	// 			// oCol.addStyleClass("widthcss")

	// 			// oCol.data("p13nMode", []);
	// 			// oCol.setMinWidth(2);
	// 		}
	// 	});
	// 	// conditionItemsColumns[1].setWidth("8.3rem");
	// 	// console.log(conditionItemsColumns[1].getWidth());
	// 	// debugger


	// }
	function debounce(func, delay) {
		let timeout;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), delay);
		};
	}

	// Your existing setWidth function
	function setWidth() {
		var oSmartTable = sap.ui.getCore().byId(
			"loancreation::contractNewObjectPage--fe::table::contractToCondition::LineItem::ConditionItems4"
		);

		if (!oSmartTable) {
			console.warn("SmartTable not found");
			return;
		}

		if (!oSmartTable.mAggregations || !oSmartTable.mAggregations._content) {
			console.warn("No _content yet, skipping setWidth");
			return;
		}

		var oInnerTable = oSmartTable.mAggregations._content;
		if (!oInnerTable || !oInnerTable.getColumns) {
			console.warn("Inner table not ready yet");
			return;
		}

		var conditionItemsColumns = oInnerTable.getColumns();
		var columnWidths;

		// Check for large screens
		var isLargeScreen = window.matchMedia("(min-width: 1400px)").matches;
		if (isLargeScreen) {
			// Use percentages for large monitors
			columnWidths = [
				"12%", // col 0
				"8%",  // col 1
				"5%",  // col 2
				"7%",  // col 3
				"20%", // col 4
				"10%", // col 5
				"8%",  // col 6
				"8%"   // col 7
			];
		} else {
			// Use 'rem' for small and medium monitors
			columnWidths = [
				"12.5rem", // col 0
				"8.2rem",  // col 1
				"5.5rem",  // col 2
				"7rem",    // col 3
				"19rem",   // col 4
				"9.5rem",  // col 5
				"8.2rem",  // col 6
				"8.2rem"   // col 7
			];
		}

		conditionItemsColumns.forEach(function (oCol, index) {
			if (columnWidths[index]) {
				oCol.setWidth(columnWidths[index]);
			}
		});
	}


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
				debugger
				var debouncedSetWidth = debounce(setWidth, 250); // Debounce with a 250ms delay
				window.addEventListener("resize", debouncedSetWidth);
				setWidth();
			},
			routing: {
				onBeforeBinding1: function () {
					debugger
					try {
						// sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").firePress();
						// sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::ObjectPage-OPHeaderContent-pinBtn").setPressed(true);
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
									oDisplayField.setText(`${mm}/${dd}/${yyyy}`);
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

					let oButtonAdjust = sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::CustomAction::adjustmentpaymentloan")

					if (bIsActiveEntity == true) {
						oButtonAdjust.setVisible(true)

					}
					else {
						oButtonAdjust.setVisible(false)
					}

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
								setWidth();
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
			},
			editFlow: {
				onAfterCreate: function () {
					debugger;
					return Promise.resolve(); // always returns a promise
				},

				onBeforeCreate: function () {
					debugger;
					sap.ui.core.Element.getElementById("loancreation::contractNewObjectPage--fe::CustomAction::calcualtecashflow").setEnabled(false)
					return Promise.resolve();
				},
				onAfterDiscard: function () {
					debugger;
					sap.ui.core.Element.getElementById("loancreation::contractNewObjectPage--fe::CustomAction::calcualtecashflow").setEnabled(true);
				},
				onBeforeEdit: function () {
					debugger
					sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::CustomAction::adjustmentpaymentloan").setVisible(false)

				},
				onAfterSave: function () {
					debugger;
					sap.ui.core.Element.getElementById("loancreation::contractNewObjectPage--fe::CustomAction::calcualtecashflow").setEnabled(true)
					sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::CustomAction::adjustmentpaymentloan").setVisible(true)

				},
				// This function is called after the save action is completed.
				// It hides the custom action button for adjustment payment in the UI.
				onBeforeDiscard: function () {
					sap.ui.getCore().byId("loancreation::contractNewObjectPage--fe::CustomAction::adjustmentpaymentloan").setVisible(true);
				}
			}
		}
	});
});
