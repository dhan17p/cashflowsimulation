const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
    let { Contract, ConditionItems, LoanAmortization, AmortizationSchedule, AmortizationSchedule2, AmortizationSchedule2New, contractNew, ConditionItemsNew } = this.entities;
    var DraftAdministrativeData_DraftUUID;


    this.after('CREATE', Contract.drafts, async (req) => {

        var data = [
            { sequence: 1, contractId: req.ID, conditionTypeText: "Nominal Interest Fixed", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },

            { sequence: 2, contractId: req.ID, conditionTypeText: "Annuity repayment", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },

            { sequence: 3, contractId: req.ID, conditionTypeText: "Final Repayment", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID }
        ]
        for (let i = 0; i < data.length; i++) {
            await INSERT.into(ConditionItems.drafts).entries(data[i])
        }
        // await INSERT.into(ConditionItems.drafts).entries(data);


    })

    this.after('CREATE', contractNew.drafts, async (req) => {

        var data = [
            { sequence: 1, contractId: req.ID, conditionTypeText: "Nominal Interest Fixed", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },

            { sequence: 2, contractId: req.ID, conditionTypeText: "Payment Amount", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },

            { sequence: 3, contractId: req.ID, conditionTypeText: "Final Repayment", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID }
        ]
        for (let i = 0; i < data.length; i++) {
            await INSERT.into(ConditionItemsNew.drafts).entries(data[i])
        }
        // await INSERT.into(ConditionItems.drafts).entries(data);


    })


    const moment = require("moment");

    function calculateLoanScheduleFlexible({
        commitCapital,
        startDate,
        endDate,
        interestPeriods,
        repaymentChanges,
        finalRepaymentDate,
        paymentFrequencyMonths = 1,
        interestCalcMethod = "360/360", // Accepts "360/360" or "act/360"
        inclusive
    }) {
        // Sort dynamic inputs by start date
        interestPeriods.sort((a, b) =>
            moment(a.start, 'DD/MM/YYYY') - moment(b.start, 'DD/MM/YYYY')
        );
        repaymentChanges.sort((a, b) =>
            moment(a.start, 'DD/MM/YYYY') - moment(b.start, 'DD/MM/YYYY')
        );

        // Days calculation
        const getDays = (start, end) => {
            if (interestCalcMethod === "360/360") {
                let d1 = start.date(), d2 = end.date();
                let m1 = start.month() + 1, m2 = end.month() + 1;
                let y1 = start.year(), y2 = end.year();

                if (d1 === 31) d1 = 30;
                if (d2 === 31 && d1 === 30) d2 = 30;

                return 360 * (y2 - y1) + 30 * (m2 - m1) + (d2 - d1);
            } else if (interestCalcMethod === "act/360") {
                return end.diff(start, "days");
            }
            return 0;
        };

        // Get current interest plan based on freqinmonths
        const getCurrentInterestPlan = (date) => {
            let plan = { rate: 0, freqinmonths: paymentFrequencyMonths, start: startDate };
            for (const ip of interestPeriods) {
                if (date.isSameOrAfter(moment(ip.start, 'DD/MM/YYYY'))) {
                    plan = {
                        rate: ip.rate,
                        freqinmonths: ip.freqinmonths || paymentFrequencyMonths,
                        start: ip.start
                    };
                }
            }
            return plan;
        };

        // Get current repayment plan based on freqinmonths
        const getCurrentRepaymentPlan = (date) => {
            let plan = { amount: 0, freqinmonths: paymentFrequencyMonths, start: startDate };
            for (const rep of repaymentChanges) {
                if (date.isSameOrAfter(moment(rep.start, 'DD/MM/YYYY'))) {
                    plan = {
                        amount: rep.amount,
                        freqinmonths: rep.freqinmonths || paymentFrequencyMonths,
                        start: rep.start
                    };
                }
            }
            return plan;
        };

        // --- Status helper (easy to change later) ---
        function getStatus(flowType /*, optionally you can pass dueDate or settlement data later */) {
            if (flowType === "0001") return "S"; // disbursement settled
            return "P"; // everything else planned by default
        }

        let schedule = [];
        let outstandingPrincipal = commitCapital;
        let currentDate = moment(startDate, 'DD/MM/YYYY');
        let lastPeriodStart = currentDate.clone(); // keep track of the current period start
        const finalDate = moment(endDate, 'DD/MM/YYYY');
        const finalRepDate = moment(finalRepaymentDate, 'DD/MM/YYYY');
        const finalRepCutoff = finalRepDate.clone().add(1, "month"); // include last month as cutoff
        let index = 1;

        // --- Add Loan Disbursement row as the first entry ---
        schedule.push({
            "Index": index++,
            "flowType": "0001",
            "Calculation From": currentDate.format('DD/MM/YYYY'),
            "Due Date": currentDate.format('DD/MM/YYYY'),
            "Calculation Date": currentDate.format('DD/MM/YYYY'),
            "Outstanding Principal Start": "",
            "Interest Rate (%)": "",
            "Days": "",
            "Name": "Loan disbursement",
            "Amount": parseFloat(outstandingPrincipal.toFixed(2)),
            "Repayment Amount": "",
            "Principal Repayment": "",
            "Interest Amount": "",
            "Outstanding Principal End": parseFloat(outstandingPrincipal.toFixed(2)),
            "Planned/Incurred Status": getStatus("0001")
        });

        // --- Helper: Push Final Repayment (uses explicit fromDate and dueDate) ---
        function pushFinalRepayment(fromDate, dueDate) {
            const calcFrom = (fromDate && fromDate.format) ? fromDate.format('DD/MM/YYYY') : lastPeriodStart.format('DD/MM/YYYY');
            const due = (dueDate && dueDate.format) ? dueDate.format('DD/MM/YYYY') : finalRepCutoff.format('DD/MM/YYYY');
            const calcDate = finalRepDate.clone().endOf('month').format('DD/MM/YYYY');

            schedule.push({
                "Index": index++,
                "flowType": "0115",
                "Calculation From": calcFrom,
                "Due Date": due,
                "Calculation Date": calcDate,
                "Outstanding Principal Start": parseFloat(outstandingPrincipal.toFixed(2)),
                "Interest Rate (%)": "",
                "Days": "",
                "Name": "Final Repayment",
                "Amount": parseFloat(outstandingPrincipal.toFixed(2)),
                "Repayment Amount": parseFloat(outstandingPrincipal.toFixed(2)),
                "Principal Repayment": parseFloat(outstandingPrincipal.toFixed(2)),
                "Interest Amount": "",
                "Outstanding Principal End": 0,
                "Planned/Incurred Status": getStatus("0115")
            });
        }

        let finalAdded = false;

        while (currentDate.isBefore(finalDate)) {
            // capture start of this period
            lastPeriodStart = currentDate.clone();

            let nextDate = currentDate.clone().add(paymentFrequencyMonths, 'months');
            let days = getDays(currentDate, nextDate);

            const interestPlan = getCurrentInterestPlan(currentDate);
            const repaymentPlan = getCurrentRepaymentPlan(currentDate);

            const monthsSinceInterestStart = currentDate.diff(moment(interestPlan.start, 'DD/MM/YYYY'), 'months') + 1;
            const monthsSinceRepaymentStart = currentDate.diff(moment(repaymentPlan.start, 'DD/MM/YYYY'), 'months') + 1;

            const principalStart = outstandingPrincipal;

            // Determine interest for this period based on freqinmonths
            let interest = 0;
            if (monthsSinceInterestStart % interestPlan.freqinmonths === 0) {
                interest = outstandingPrincipal * interestPlan.rate * days / 360;
            }

            // Determine principal repayment for this period based on freqinmonths
            let scheduledAnnuity = 0;
            if (monthsSinceRepaymentStart % repaymentPlan.freqinmonths === 0) {
                scheduledAnnuity = repaymentPlan.amount;
            }

            let principalRepayment = Math.max(0, Math.min(scheduledAnnuity - interest, outstandingPrincipal));
            let repayment = principalRepayment + interest;

            // Last period detection
            const isLastPeriod = inclusive
                ? nextDate.isSameOrAfter(finalRepCutoff)
                : nextDate.isAfter(finalRepCutoff);

            let calculationDate = nextDate.clone().subtract(1, 'days');
            if (interestCalcMethod === "360/360" && calculationDate.date() === 31) {
                calculationDate.date(30);
            }

            // --- Interest row ---
            if (interest !== 0) {
                schedule.push({
                    "Index": index++,
                    "flowType": "0110",
                    "Calculation From": currentDate.format('DD/MM/YYYY'),
                    "Due Date": nextDate.format('DD/MM/YYYY'),
                    "Calculation Date": calculationDate.format('DD/MM/YYYY'),
                    "Outstanding Principal Start": parseFloat(principalStart.toFixed(2)),
                    "Interest Rate (%)": parseFloat((interestPlan.rate * 100).toFixed(2)),
                    "Days": days,
                    "Name": "Interest Receivable",
                    "Amount": parseFloat(interest.toFixed(2)),
                    "Repayment Amount": "",
                    "Principal Repayment": "",
                    "Interest Amount": parseFloat(interest.toFixed(2)),
                    "Outstanding Principal End": parseFloat(outstandingPrincipal.toFixed(2)),
                    "Planned/Incurred Status": getStatus("0110")
                });
            }

            // --- Annuity row ---
            if (principalRepayment !== 0) {
                outstandingPrincipal -= principalRepayment;
                schedule.push({
                    "Index": index++,
                    "flowType": "0125",
                    "Calculation From": currentDate.format('DD/MM/YYYY'),
                    "Due Date": nextDate.format('DD/MM/YYYY'),
                    "Calculation Date": calculationDate.format('DD/MM/YYYY'),
                    "Outstanding Principal Start": "",
                    "Interest Rate (%)": "",
                    "Days": days,
                    "Name": "Principal Receivable",
                    "Amount": parseFloat(principalRepayment.toFixed(2)),
                    "Repayment Amount": parseFloat(repayment.toFixed(2)),
                    "Principal Repayment": parseFloat(principalRepayment.toFixed(2)),
                    "Interest Amount": "",
                    "Outstanding Principal End": "",
                    "Planned/Incurred Status": getStatus("0125")
                });
            }


            // --- Final repayment inside loop (use precise from/due when we detect it) ---
            if (isLastPeriod && Math.abs(outstandingPrincipal) > 0.01) {
                pushFinalRepayment(currentDate, nextDate); // use current period start & nextDate as dueDate
                outstandingPrincipal = 0;
                finalAdded = true;
                break;
            }

            currentDate = nextDate.clone();
        }

        // --- Safety: Add final repayment after loop if anything remains (use lastPeriodStart and finalRepCutoff) ---
        if (!finalAdded && Math.abs(outstandingPrincipal) > 0.01) {
            pushFinalRepayment(lastPeriodStart, finalRepCutoff);
            outstandingPrincipal = 0;
            finalAdded = true;
        }

        return schedule;
    }



    const input = {
        commitCapital: 100000, // loan amount
        startDate: "01/01/2025",
        endDate: "01/01/2027",
        interestPeriods: [
            { start: "01/01/2025", rate: 0.03, freqinmonths: 1 }, // yearly reset at 3%
            { start: "01/01/2026", rate: 0.04, freqinmonths: 1 }   // monthly reset at 4%
        ],
        repaymentChanges: [
            { start: "01/01/2026", amount: 6000, freqinmonths: 1 }, // every 2 months
            { start: "01/03/2026", amount: 7000, freqinmonths: 1 }  // overrides → monthly
        ],
        finalRepaymentDate: "01/12/2026",
        paymentFrequencyMonths: 1, // monthly schedule
        interestCalcMethod: "360/360",
        inclusive: true
    };

    // === Function Call ===
    const schedule = calculateLoanScheduleFlexible(input);

    // === Output ===
    console.table(schedule);



    // // Example usage
    // const scheduleACT = calculateLoanScheduleFlexible({
    //     commitCapital: 100000,
    //     startDate: '01/01/2025',
    //     endDate: '01/01/2027',
    //     interestPeriods: [
    //         { start: '01/01/2025', rate: 0.03 },
    //         { start: '01/01/2026', rate: 0.04 }
    //     ],
    //     repaymentChanges: [
    //         { start: '01/01/2026', amount: 6000 },
    //         { start: '01/03/2026', amount: 7000 }
    //     ],
    //     finalRepaymentDate: '01/12/2026',
    //     paymentFrequencyMonths: 1,
    //     interestCalcMethod: "360/360",
    //     inclusive: false
    // });

    // console.table(scheduleACT);
    // //New code Test



    // // --- Inputs ---
    // const commitmentCapital = 200000;
    // const fixedFrom = parse('09/06/2007', 'MM/dd/yyyy', new Date());
    // const fixedUntil = parse('10/01/2022', 'MM/dd/yyyy', new Date());
    // const interestFixedEffectiveDate = parse('05/01/2016', 'MM/dd/yyyy', new Date());
    // const paymentDueDate = parse('06/01/2016', 'MM/dd/yyyy', new Date());

    // const interestChanges = [
    //     { effectiveFrom: fixedFrom, rate: 0 },
    //     { effectiveFrom: interestFixedEffectiveDate, rate: 0.04 },
    // ];

    // const inclusiveEnd = false;
    // const paymentFrequencyMonths = 1;
    // const interestCalcMethod = "act/360";
    // const currency = "USD";

    // // --- Calculate schedule ---
    // const formattedSchedule = calculateAmortizationScheduleFormatted(
    //     commitmentCapital,
    //     fixedFrom,
    //     fixedUntil,
    //     interestChanges,
    //     paymentDueDate,
    //     paymentFrequencyMonths,
    //     inclusiveEnd,
    //     interestCalcMethod,
    //     currency
    // );

    // // --- Print output ---
    // console.table(formattedSchedule);

    // Example usage
    // const resultACT360 = loanAmortization({
    //     principal: 200000,
    //     fixedFrom: '09/06/2007',
    //     fixedUntil: '10/01/2022',
    //     interestRate: 0.04,
    //     interestEffectiveFrom: '05/01/2016',
    //     interestMethod: 'act/360',
    //     inclusiveEnd: false
    // });

    // console.table(resultACT360.schedule);


    this.on('loadAmortizationFunc', async (req) => {
        debugger;

        // Extract from req.data (all strings initially)
        let {
            principal,
            annualRate,
            startDate,
            endDate,
            interestFixedDate,
            inclusiveIndicator,
            contractId,
            intCalMt,
            percentage,
            dueDate,
            calculationDate,
            conditionAmt,
            efffectiveDatefinalRepayment,
            loanData,
            isActiveEntity
        } = req.data;

        console.log("paramssss", req.data)
        // loanData = JSON.parse(loanData);
        // console.log("loan data", loanData)
        // ✅ Convert to proper datatypes
        // // Normalize values with safe conversion
        // const principalVal = Number(principal) || 200000;
        // const annualRateVal = Number(annualRate) || 0.04;
        // const startDateVal = startDate ? new Date(startDate).toISOString().split("T")[0] : "2007-09-06";
        // const endDateVal = endDate ? new Date(endDate).toISOString().split("T")[0] : "2022-10-01";
        // const interestFixedDateVal = interestFixedDate ? new Date(interestFixedDate).toISOString().split("T")[0] : "2016-05-01";
        // const inclusiveIndicatorVal = (inclusiveIndicator === "true" || inclusiveIndicator === true) ? true : false;

        // console.log("Normalized Params:", {
        //     principalVal,
        //     annualRateVal,
        //     startDate,
        //     endDate,
        //     interestFixedDate,
        //     inclusiveIndicatorVal
        // });
        // let act = intCalMt;
        // ✅ Call the function with individual params
        // const result = loanAmortization(
        //     principalVal,
        //     startDate,
        //     endDate,
        //     annualRateVal,
        //     interestFixedDate,
        //     act,//interestMethod
        //     inclusiveIndicatorVal
        // );
        function getFirstPaymentDate(fixedFrom) {
            const firstPayment = addMonths(fixedFrom, 1); // next month
            firstPayment.setDate(1); // first day of next month
            return firstPayment;
        }
        // // --- Inputs ---
        // const commitmentCapital = Number(principal);
        // const fixedFrom = new Date(startDate)
        // const fixedUntil = new Date(endDate)
        // const interestFixedEffectiveDate = new Date(interestFixedDate)
        // const paymentDueDate = getFirstPaymentDate(interestFixedDate);
        // // parse('06/01/2016', 'MM/dd/yyyy', new Date());

        // const interestChanges = [
        //     { effectiveFrom: fixedFrom, rate: 0 },
        //     { effectiveFrom: interestFixedEffectiveDate, rate: 0.04 },
        // ];

        // const inclusiveEnd = (inclusiveIndicator === "true" || inclusiveIndicator === true) ? true : false;
        // const paymentFrequencyMonths = 1;
        // const interestCalcMethod = intCalMt
        // const currency = "USD";


        // // calculate periods automatically
        // const periods = differenceInMonths(new Date(endDate), new Date(startDate));
        // var percentage_converted = Number(percentage) / 100;


        // const formattedSchedule = calculateAmortizationSchedule({
        //     principal: commitmentCapital,
        //     periods,
        //     interestCalcMethod: intCalMt,
        //     firstDueDate: startDate,
        //     repaymentAmount: Number(conditionAmt),
        //     interestConditions: [
        //         { effectiveFrom: new Date(startDate), effectiveTo: new Date(endDate), rate: 0.05 }
        //     ],
        //     currency: "USD"
        // });

        //  const formattedSchedule = calculateAmortizationSchedule({
        //     principal: commitmentCapital,
        //     startDate,
        //     periods,
        //     useAnnuity: true,
        //     interestCalcMethod: intCalMt,
        //     firstDueDate: dueDate,
        //     firstCalcDate: calculationDate,
        //     interestConditions: [
        //         {
        //             effectiveFrom: interestFixedEffectiveDate,
        //             effectiveTo: new Date(endDate),
        //             rate: percentage_converted
        //         },
        //     ],
        // });

        // console.table(formattedSchedule);

        // --- Calculate schedule ---
        // const formattedSchedule = calculateAmortizationScheduleFormatted(
        //     commitmentCapital,
        //     fixedFrom,
        //     fixedUntil,
        //     interestChanges,
        //     paymentDueDate,
        //     paymentFrequencyMonths,
        //     inclusiveEnd,
        //     interestCalcMethod,
        //     currency
        // );

        // // --- Print output ---
        // console.table(formattedSchedule);


        // 🔹 Example input (strings)
        // var percentage_converted = Number(percentage) / 100;
        // const rawInput = {
        //     commitCapital: principal,
        //     fixedFrom: startDate,
        //     fixedUntil: endDate,
        //     nominalInterestRate: percentage_converted,
        //     annuityRepayment: conditionAmt,
        //     paymentFrequencyMonths: "1",
        //     firstDueDate: dueDate,
        //     finalRepaymentDueDate: efffectiveDatefinalRepayment,
        //     method: intCalMt
        // };

        // // 🔹 Convert outside
        // const parsedInput = {
        //     commitCapital: Number(rawInput.commitCapital),
        //     fixedFrom: moment(rawInput.fixedFrom, "YYYY-MM-DD"),
        //     fixedUntil: moment(rawInput.fixedUntil, "YYYY-MM-DD"),
        //     nominalInterestRate: Number(rawInput.nominalInterestRate),
        //     annuityRepayment: Number(rawInput.annuityRepayment),
        //     paymentFrequencyMonths: Number(rawInput.paymentFrequencyMonths),
        //     firstDueDate: moment(rawInput.firstDueDate, "YYYY-MM-DD"),
        //     finalRepaymentDueDate: moment(rawInput.finalRepaymentDueDate, "YYYY-MM-DD"),
        //     method: rawInput.method,
        // };

        // 🔹 Run
        // const formattedSchedule = calculateAmortizationSchedule(parsedInput);
        // console.table(formattedSchedule);



        async function buildContractData(contractId) {
            // Fetch rows from DB
            if (isActiveEntity === "true") {
                var data = await SELECT.from(ConditionItems).where({ contractId: contractId });

            }
            else {
                var data = await SELECT.from(ConditionItems.drafts).where({ contractId: contractId });
            }

            const result = {
                interestPeriods: [],
                repaymentChanges: [],
                finalRepaymentDate: null
            };

            data.forEach(oData => {
                switch (oData.conditionTypeText) {
                    case "Nominal Interest Fixed":
                        result.interestPeriods.push({
                            start: formatDate(oData.effectiveFrom),
                            rate: parseFloat(oData.percentage) / 100 || 0
                        });
                        break;

                    case "Annuity repayment":
                        result.repaymentChanges.push({
                            start: formatDate(oData.effectiveFrom),
                            amount: parseFloat(oData.conditionAmt) || 0
                        });
                        break;

                    case "Final Repayment":
                        result.finalRepaymentDate = formatDate(oData.effectiveFrom);
                        break;
                }
            });

            return result;
        }
        var data_items = await buildContractData(contractId);
        console.log("backend data", data_items)

        // Helper: format date from JS Date or string → dd/MM/yyyy
        function formatDate(dateValue) {
            if (!dateValue) return null;

            const oDate = new Date(dateValue);
            if (isNaN(oDate.getTime())) return null;

            const dd = String(oDate.getDate()).padStart(2, "0");
            const mm = String(oDate.getMonth() + 1).padStart(2, "0");
            const yyyy = oDate.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        }

        function formatToDDMMYYYY(dateStr) {
            if (!dateStr) return dateStr;
            const [year, month, day] = dateStr.split("-");
            return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
        }


        const formattedSchedule = calculateLoanScheduleFlexible({
            commitCapital: Number(principal),
            startDate: formatToDDMMYYYY(startDate),
            endDate: formatToDDMMYYYY(endDate),
            interestPeriods: data_items.interestPeriods,
            repaymentChanges: data_items.repaymentChanges,
            finalRepaymentDate: data_items.finalRepaymentDate,
            paymentFrequencyMonths: 1,
            interestCalcMethod: intCalMt,
            inclusive: inclusiveIndicator == 'true' ? true : false
        });

        console.table(formattedSchedule);

        let formattedData = formattedSchedule.map(item => {
            // safely get "Due Date" (with space in key)
            let [day, month, year] = item["Due Date"].split("/");
            // let formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            function convertDateToUSFormat(dateStr) {
                if (!dateStr) return null;
                let [day, month, year] = dateStr.split("/");
                let shortYear = year;
                return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${shortYear}`;
            }


            return {
                index: item.Index,
                flowType: item.flowType,
                calculationFrom: convertDateToUSFormat(item["Calculation From"]),
                dueDate: convertDateToUSFormat(item["Due Date"]),           // normalized field
                calculationDate: convertDateToUSFormat(item["Calculation Date"]),
                baseAmount: item["Outstanding Principal Start"],
                percentageRate: item["Interest Rate (%)"],
                numberOfDays: item.Days,
                name: item.Name,
                settlementAmount: item.Amount,         // renamed
                repaymentAmount: item["Repayment Amount"],
                principalRepayment: item["Principal Repayment"],
                interestAmount: item["Interest Amount"],
                outstandingPrincipalEnd: item["Outstanding Principal End"],
                contractId: contractId,
                settlementCurrency: "USD",
                planActualRec: item["Planned/Incurred Status"]
            };
        });
        console.table(formattedData);

        // let formattedData = formattedSchedule.map(item => {
        //     // convert date format dd/MM/yyyy → yyyy-MM-dd
        //     let [day, month, year] = item.dueDate.split("/");  // notice order changed
        //     let formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;


        //     return {
        //         ...item,
        //         paymentDate: formattedDate,
        //         contractId: contractId,
        //         settlementCurrency: "USD"
        //     };
        // });

        // const enrichedResult = result.schedule.map(obj => ({
        //     ...obj,
        //     contractId: contractId
        // }));

        await DELETE.from(AmortizationSchedule2);
        await INSERT.into(AmortizationSchedule2).entries(formattedData);
        await SELECT.from(AmortizationSchedule2);
        // return result;
    });
    this.on('loadAmortizationFuncNew', async (req) => {
        debugger;

        // Extract from req.data (all strings initially)
        let {
            principal,
            annualRate,
            startDate,
            endDate,
            interestFixedDate,
            inclusiveIndicator,
            contractId,
            intCalMt,
            percentage,
            dueDate,
            calculationDate,
            conditionAmt,
            efffectiveDatefinalRepayment,
            loanData,
            isActiveEntity
        } = req.data;

        console.log("paramssss", req.data)
        // loanData = JSON.parse(loanData);
        // console.log("loan data", loanData)
        // ✅ Convert to proper datatypes
        // // Normalize values with safe conversion
        // const principalVal = Number(principal) || 200000;
        // const annualRateVal = Number(annualRate) || 0.04;
        // const startDateVal = startDate ? new Date(startDate).toISOString().split("T")[0] : "2007-09-06";
        // const endDateVal = endDate ? new Date(endDate).toISOString().split("T")[0] : "2022-10-01";
        // const interestFixedDateVal = interestFixedDate ? new Date(interestFixedDate).toISOString().split("T")[0] : "2016-05-01";
        // const inclusiveIndicatorVal = (inclusiveIndicator === "true" || inclusiveIndicator === true) ? true : false;

        // console.log("Normalized Params:", {
        //     principalVal,
        //     annualRateVal,
        //     startDate,
        //     endDate,
        //     interestFixedDate,
        //     inclusiveIndicatorVal
        // });
        // let act = intCalMt;
        // ✅ Call the function with individual params
        // const result = loanAmortization(
        //     principalVal,
        //     startDate,
        //     endDate,
        //     annualRateVal,
        //     interestFixedDate,
        //     act,//interestMethod
        //     inclusiveIndicatorVal
        // );
        function getFirstPaymentDate(fixedFrom) {
            const firstPayment = addMonths(fixedFrom, 1); // next month
            firstPayment.setDate(1); // first day of next month
            return firstPayment;
        }
        // // --- Inputs ---
        // const commitmentCapital = Number(principal);
        // const fixedFrom = new Date(startDate)
        // const fixedUntil = new Date(endDate)
        // const interestFixedEffectiveDate = new Date(interestFixedDate)
        // const paymentDueDate = getFirstPaymentDate(interestFixedDate);
        // // parse('06/01/2016', 'MM/dd/yyyy', new Date());

        // const interestChanges = [
        //     { effectiveFrom: fixedFrom, rate: 0 },
        //     { effectiveFrom: interestFixedEffectiveDate, rate: 0.04 },
        // ];

        // const inclusiveEnd = (inclusiveIndicator === "true" || inclusiveIndicator === true) ? true : false;
        // const paymentFrequencyMonths = 1;
        // const interestCalcMethod = intCalMt
        // const currency = "USD";


        // // calculate periods automatically
        // const periods = differenceInMonths(new Date(endDate), new Date(startDate));
        // var percentage_converted = Number(percentage) / 100;


        // const formattedSchedule = calculateAmortizationSchedule({
        //     principal: commitmentCapital,
        //     periods,
        //     interestCalcMethod: intCalMt,
        //     firstDueDate: startDate,
        //     repaymentAmount: Number(conditionAmt),
        //     interestConditions: [
        //         { effectiveFrom: new Date(startDate), effectiveTo: new Date(endDate), rate: 0.05 }
        //     ],
        //     currency: "USD"
        // });

        //  const formattedSchedule = calculateAmortizationSchedule({
        //     principal: commitmentCapital,
        //     startDate,
        //     periods,
        //     useAnnuity: true,
        //     interestCalcMethod: intCalMt,
        //     firstDueDate: dueDate,
        //     firstCalcDate: calculationDate,
        //     interestConditions: [
        //         {
        //             effectiveFrom: interestFixedEffectiveDate,
        //             effectiveTo: new Date(endDate),
        //             rate: percentage_converted
        //         },
        //     ],
        // });

        // console.table(formattedSchedule);

        // --- Calculate schedule ---
        // const formattedSchedule = calculateAmortizationScheduleFormatted(
        //     commitmentCapital,
        //     fixedFrom,
        //     fixedUntil,
        //     interestChanges,
        //     paymentDueDate,
        //     paymentFrequencyMonths,
        //     inclusiveEnd,
        //     interestCalcMethod,
        //     currency
        // );

        // // --- Print output ---
        // console.table(formattedSchedule);


        // 🔹 Example input (strings)
        // var percentage_converted = Number(percentage) / 100;
        // const rawInput = {
        //     commitCapital: principal,
        //     fixedFrom: startDate,
        //     fixedUntil: endDate,
        //     nominalInterestRate: percentage_converted,
        //     annuityRepayment: conditionAmt,
        //     paymentFrequencyMonths: "1",
        //     firstDueDate: dueDate,
        //     finalRepaymentDueDate: efffectiveDatefinalRepayment,
        //     method: intCalMt
        // };

        // // 🔹 Convert outside
        // const parsedInput = {
        //     commitCapital: Number(rawInput.commitCapital),
        //     fixedFrom: moment(rawInput.fixedFrom, "YYYY-MM-DD"),
        //     fixedUntil: moment(rawInput.fixedUntil, "YYYY-MM-DD"),
        //     nominalInterestRate: Number(rawInput.nominalInterestRate),
        //     annuityRepayment: Number(rawInput.annuityRepayment),
        //     paymentFrequencyMonths: Number(rawInput.paymentFrequencyMonths),
        //     firstDueDate: moment(rawInput.firstDueDate, "YYYY-MM-DD"),
        //     finalRepaymentDueDate: moment(rawInput.finalRepaymentDueDate, "YYYY-MM-DD"),
        //     method: rawInput.method,
        // };

        // 🔹 Run
        // const formattedSchedule = calculateAmortizationSchedule(parsedInput);
        // console.table(formattedSchedule);



        async function buildContractData(contractId) {
            // Fetch rows from DB
            if (isActiveEntity === "true") {
                var data = await SELECT.from(ConditionItemsNew).where({ contractId: contractId });

            }
            else {
                var data = await SELECT.from(ConditionItemsNew.drafts).where({ contractId: contractId });
            }

            const result = {
                interestPeriods: [],
                repaymentChanges: [],
                finalRepaymentDate: null
            };

            data.forEach(oData => {
                switch (oData.conditionTypeText) {
                    case "Nominal Interest Fixed":
                        result.interestPeriods.push({
                            start: formatDate(oData.effectiveFrom),
                            rate: parseFloat(oData.percentage) / 100 || 0
                        });
                        break;

                    case "Payment Amount":
                        result.repaymentChanges.push({
                            start: formatDate(oData.effectiveFrom),
                            amount: parseFloat(oData.conditionAmt) || 0
                        });
                        break;

                    case "Final Repayment":
                        result.finalRepaymentDate = formatDate(oData.effectiveFrom);
                        break;
                }
            });

            return result;
        }
        var data_items = await buildContractData(contractId);
        console.log("backend data", data_items)

        // Helper: format date from JS Date or string → dd/MM/yyyy
        function formatDate(dateValue) {
            if (!dateValue) return null;

            const oDate = new Date(dateValue);
            if (isNaN(oDate.getTime())) return null;

            const dd = String(oDate.getDate()).padStart(2, "0");
            const mm = String(oDate.getMonth() + 1).padStart(2, "0");
            const yyyy = oDate.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        }

        function formatToDDMMYYYY(dateStr) {
            if (!dateStr) return dateStr;
            const [year, month, day] = dateStr.split("-");
            return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
        }

        // const input = {
        //     commitCapital: 100000, // loan amount
        //     startDate: "01/01/2025",
        //     endDate: "01/01/2027",
        //     interestPeriods: [
        //         { start: "01/01/2025", rate: 0.03, freqinmonths: 1 }, // yearly reset at 3%
        //         { start: "01/01/2026", rate: 0.04, freqinmonths: 1 }   // monthly reset at 4%
        //     ],
        //     repaymentChanges: [
        //         { start: "01/01/2026", amount: 6000, freqinmonths: 1 }, // every 2 months
        //         { start: "01/03/2026", amount: 7000, freqinmonths: 1 }  // overrides → monthly
        //     ],
        //     finalRepaymentDate: "01/12/2026",
        //     paymentFrequencyMonths: 1, // monthly schedule
        //     interestCalcMethod: "360/360",
        //     inclusive: true
        // };

        let oInput = {
            commitCapital: Number(principal),
            startDate: formatToDDMMYYYY(startDate),
            endDate: formatToDDMMYYYY(endDate),
            interestPeriods: data_items.interestPeriods,
            repaymentChanges: data_items.repaymentChanges,
            finalRepaymentDate: data_items.finalRepaymentDate,
            paymentFrequencyMonths: 1,
            interestCalcMethod: intCalMt,
            inclusive: inclusiveIndicator == 'true' ? true : false
        }

        console.log(oInput);


        const formattedSchedule = calculateLoanScheduleFlexible(oInput);

        console.table(formattedSchedule);

        let formattedData = formattedSchedule.map(item => {
            // safely get "Due Date" (with space in key)
            let [day, month, year] = item["Due Date"].split("/");
            // let formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            function convertDateToUSFormat(dateStr) {
                if (!dateStr) return null;
                let [day, month, year] = dateStr.split("/");
                let shortYear = year;
                return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${shortYear}`;
            }


            return {
                index: item.Index,
                flowType: item.flowType,
                calculationFrom: convertDateToUSFormat(item["Calculation From"]),
                dueDate: convertDateToUSFormat(item["Due Date"]),           // normalized field
                calculationDate: convertDateToUSFormat(item["Calculation Date"]),
                baseAmount: item["Outstanding Principal Start"],
                percentageRate: item["Interest Rate (%)"],
                numberOfDays: item.Days,
                name: item.Name,
                settlementAmount: item.Amount,         // renamed
                repaymentAmount: item["Repayment Amount"],
                principalRepayment: item["Principal Repayment"],
                interestAmount: item["Interest Amount"],
                outstandingPrincipalEnd: item["Outstanding Principal End"],
                contractId: contractId,
                settlementCurrency: "USD",
                planActualRec: item["Planned/Incurred Status"]
            };
        });
        console.table(formattedData);

        // let formattedData = formattedSchedule.map(item => {
        //     // convert date format dd/MM/yyyy → yyyy-MM-dd
        //     let [day, month, year] = item.dueDate.split("/");  // notice order changed
        //     let formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;


        //     return {
        //         ...item,
        //         paymentDate: formattedDate,
        //         contractId: contractId,
        //         settlementCurrency: "USD"
        //     };
        // });

        // const enrichedResult = result.schedule.map(obj => ({
        //     ...obj,
        //     contractId: contractId
        // }));

        await DELETE.from(AmortizationSchedule2New);
        await INSERT.into(AmortizationSchedule2New).entries(formattedData);
        await SELECT.from(AmortizationSchedule2New);
        // return result;
    });

    this.on('UPDATE', ConditionItems.drafts, async (req, next) => {
        try {
            var conditionData = await SELECT.from(ConditionItems.drafts).where({ conditionId: req.data.conditionId })

            var contractData = await SELECT.from(Contract.drafts).where({ ID: conditionData[0].contractId })
            var fixedFrom = contractData[0].fixedFrom;
            var fixedUntil = contractData[0].fixedUntil;

            if (!fixedFrom || !fixedUntil) {
                return req.error(
                    400,
                    `You cannot set dates until both Fixed From and Fixed Until are maintained.`
                );
            }


            // Helper to check range inclusively
            const isOutOfRange = (date) =>
                date < fixedFrom || date > fixedUntil;

            // ---- effectiveFrom check ----

            if (req.data.effectiveFrom) {
                const effectiveFrom = req.data.effectiveFrom;
                if (isOutOfRange(effectiveFrom)) {
                    req.data.effectiveFrom = null; // or ""
                    // await UPDATE(ConditionItems.drafts).set({ effectiveFrom: null, percentage: "1111" }).where({ conditionId: req.data.conditionId });
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Effective From  must be between Fixed From and Fixed Until ).`,
                        target: "effectiveFrom",
                        details: [{ field: "effectiveFrom", value: null }]
                    });
                }
            }

            // ---- dueDate check ----
            if (req.data.dueDate) {
                const dueDate = req.data.dueDate;
                if (isOutOfRange(dueDate)) {
                    req.data.dueDate = null;
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Due Date must be between Fixed From and Fixed Until ).`,
                        target: "dueDate",
                        details: [{ field: "dueDate", value: null }]
                    });
                }
            }

            // ---- calculationDate check ----
            if (req.data.calculationDate) {
                const calculationDate = req.data.calculationDate;
                if (isOutOfRange(calculationDate)) {
                    req.data.calculationDate = null;
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Calculation Date  must be between Fixed From and Fixed Until ).`,
                        target: "calculationDate",
                        details: [{ field: "calculationDate", value: null }]
                    });
                }
            }


            return next();
        } catch (error) {
        }
    });
    this.on('UPDATE', ConditionItemsNew.drafts, async (req, next) => {
        try {
            var conditionData = await SELECT.from(ConditionItemsNew.drafts).where({ conditionId: req.data.conditionId })

            var contractData = await SELECT.from(contractNew.drafts).where({ ID: conditionData[0].contractId })
            var fixedFrom = contractData[0].fixedFrom;
            var fixedUntil = contractData[0].fixedUntil;

            if (!fixedFrom || !fixedUntil) {
                return req.error(
                    400,
                    `You cannot set dates until both Fixed From and Fixed Until are maintained.`
                );
            }


            // Helper to check range inclusively
            const isOutOfRange = (date) =>
                date < fixedFrom || date > fixedUntil;

            // ---- effectiveFrom check ----

            if (req.data.effectiveFrom) {
                const effectiveFrom = req.data.effectiveFrom;
                if (isOutOfRange(effectiveFrom)) {
                    req.data.effectiveFrom = null; // or ""
                    // await UPDATE(ConditionItems.drafts).set({ effectiveFrom: null, percentage: "1111" }).where({ conditionId: req.data.conditionId });
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Effective From  must be between Fixed From and Fixed Until ).`,
                        target: "effectiveFrom",
                        details: [{ field: "effectiveFrom", value: null }]
                    });
                }
            }

            // ---- dueDate check ----
            if (req.data.dueDate) {
                const dueDate = req.data.dueDate;
                if (isOutOfRange(dueDate)) {
                    req.data.dueDate = null;
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Due Date must be between Fixed From and Fixed Until ).`,
                        target: "dueDate",
                        details: [{ field: "dueDate", value: null }]
                    });
                }
            }

            // ---- calculationDate check ----
            if (req.data.calculationDate) {
                const calculationDate = req.data.calculationDate;
                if (isOutOfRange(calculationDate)) {
                    req.data.calculationDate = null;
                    return req.reject({
                        code: "VALIDATION_ERROR",
                        status: 400,
                        message: `Calculation Date  must be between Fixed From and Fixed Until ).`,
                        target: "calculationDate",
                        details: [{ field: "calculationDate", value: null }]
                    });
                }
            }


            return next();
        } catch (error) {
        }
    });
});





// this.before('READ', 'CashFlow', async (req) => {
//     //check content-type
//     try {
//         console.log("handler triggered")
//         var columns = req.query.SELECT.columns;
//         const fieldNames = columns.map(item => item.ref[0]);
//         console.log(fieldNames);


//         const result = {};
//         let currentKey = null;
//         var arr = req.query.SELECT.where;

//         arr.forEach(item => {
//             if (typeof item === "object" && item.ref) {
//                 currentKey = item.ref[0]; // store the key name
//             } else if (typeof item === "object" && item.val && currentKey) {
//                 result[currentKey] = item.val; // assign value to key
//                 currentKey = null; // reset
//             }
//         });

//         console.log(result);
//         // console.log('content-type: ', req.headers['content-type'])



//         //api call
//         const https = require("https");
//         var api_data;

//         const url = "https://682efc29746f8ca4a47f40cb.mockapi.io/api/getiflowdata/ddd";

//         function httpsGet(url) {
//             return new Promise((resolve, reject) => {
//                 https.get(url, (res) => {
//                     let data = "";

//                     res.on("data", (chunk) => {
//                         data += chunk;
//                     });

//                     res.on("end", () => {
//                         try {
//                             resolve(JSON.parse(data)); // parse JSON
//                         } catch (err) {
//                             reject(err); // handle JSON parse errors
//                         }
//                     });

//                 }).on("error", (err) => {
//                     reject(err);
//                 });
//             });
//         }

//         async function callAPI() {
//             try {
//                 api_data = await httpsGet(url);
//                 console.log("Response:", api_data);
//             } catch (err) {
//                 console.error("Error:", err.message);
//             }
//         }

//         await callAPI();
//         await DELETE.from('cfs_CashFlow');
//         await INSERT.into('cfs_CashFlow').entries(api_data);

//         let data = await SELECT.from('cfs_CashFlow');
//         delete req.query.SELECT.where;
//     } catch (error) {
//         console.log("Error", error);
//     }

// })
// }