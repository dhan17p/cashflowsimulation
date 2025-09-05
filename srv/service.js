const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
    let { Contract, ConditionItems, LoanAmortization } = this.entities;
    var DraftAdministrativeData_DraftUUID;


    this.after('CREATE', Contract.drafts, async (req) => {
        debugger
        debugger
        var data = [
            { sequence: 1, contractId: req.ID, conditionTypeText: "Nominal Interest Fixed", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },
            { sequence: 2, contractId: req.ID, conditionTypeText: "Delinquency fee", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },
            { sequence: 3, contractId: req.ID, conditionTypeText: "Annuity repayment", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },]
        for (let i = 0; i < data.length; i++) {
            await INSERT.into(ConditionItems.drafts).entries(data[i])
        }
        // await INSERT.into(ConditionItems.drafts).entries(data);


    })


    const { parse, differenceInDays, addMonths, addDays, format } = require('date-fns');

    // --- Main loan amortization function ---
    function loanAmortization(
        principal,
        fixedFrom,
        fixedUntil,
        interestRate,
        interestEffectiveFrom,
        interestMethod = 'act/360', // "act/360" or "360/360"
        inclusiveEnd = false
    ) {
        // Parse input dates in yyyy-MM-dd format
        const start = parse(fixedFrom, 'yyyy-MM-dd', new Date());
        const end = parse(fixedUntil, 'yyyy-MM-dd', new Date());
        const effectiveRateDate = parse(interestEffectiveFrom, 'yyyy-MM-dd', new Date());

        let balance = principal;

        // Total months for annuity calculation
        const totalMonths =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth()) +
            (inclusiveEnd ? 0 : -1);

        const monthlyRate = interestRate / 12;

        // Monthly annuity payment formula
        const fixedPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));

        const schedule = [];
        let periodStartDate = start;

        // Loop for each payment period
        for (let i = 0; i < totalMonths && balance > 0; i++) {
            const monthEnd = new Date(periodStartDate.getFullYear(), periodStartDate.getMonth() + 1, 0);
            const periodEndDate = inclusiveEnd ? monthEnd : addDays(monthEnd, -1);

            // Days in period calculation
            let daysInPeriod;
            if (interestMethod === 'act/360') {
                daysInPeriod = differenceInDays(periodEndDate, periodStartDate) + 1;
            } else if (interestMethod === '360/360') {
                daysInPeriod = 30;
            } else {
                throw new Error(`Unsupported interest method: ${interestMethod}`);
            }

            // Interest payment only after effective date
            const interestPayment = periodStartDate >= effectiveRateDate
                ? balance * interestRate * (daysInPeriod / 360)
                : 0;

            // Principal payment
            let principalPayment = fixedPayment - interestPayment;
            if (principalPayment > balance) principalPayment = balance;

            const closingBalance = balance - principalPayment;
            const paymentDueDate = addDays(monthEnd, 1);

            schedule.push({
                periodStart: format(periodStartDate, 'dd-MM-yyyy'),
                periodEnd: format(periodEndDate, 'dd-MM-yyyy'),
                paymentDate: format(paymentDueDate, 'dd-MM-yyyy'),
                principalPayment: parseFloat(principalPayment.toFixed(2)),
                interestPayment: parseFloat(interestPayment.toFixed(2)),
                totalPayment: parseFloat((principalPayment + interestPayment).toFixed(2)),
                openingBalance: parseFloat(balance.toFixed(2)),
                closingBalance: parseFloat(closingBalance.toFixed(2))
            });

            balance = closingBalance;
            periodStartDate = addMonths(periodStartDate, 1);
        }

        return { fixedPayment: parseFloat(fixedPayment.toFixed(2)), schedule };
    }

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
            intCalMt
        } = req.data;

        // ✅ Convert to proper datatypes
        // Normalize values with safe conversion
        const principalVal = Number(principal) || 200000;
        const annualRateVal = Number(annualRate) || 0.04;
        const startDateVal = startDate ? new Date(startDate).toISOString().split("T")[0] : "2007-09-06";
        const endDateVal = endDate ? new Date(endDate).toISOString().split("T")[0] : "2022-10-01";
        const interestFixedDateVal = interestFixedDate ? new Date(interestFixedDate).toISOString().split("T")[0] : "2016-05-01";
        const inclusiveIndicatorVal = (inclusiveIndicator === "true" || inclusiveIndicator === true) ? true : false;

        console.log("Normalized Params:", {
            principalVal,
            annualRateVal,
            startDate,
            endDate,
            interestFixedDate,
            inclusiveIndicatorVal
        });
        let act = intCalMt;
        // ✅ Call the function with individual params
        const result = loanAmortization(
            principalVal,
            startDate,
            endDate,
            annualRateVal,
            interestFixedDate,
            act,//interestMethod
            inclusiveIndicatorVal
        );

        // loanAmortization({
        //     principal: 200000,
        //     fixedFrom: '09/06/2007',
        //     fixedUntil: '10/01/2022',
        //     interestRate: 0.04,
        //     interestEffectiveFrom: '05/01/2016',
        //     interestMethod: 'act/360',
        //     inclusiveEnd: false
        // });

        // --- Example usage ---
        // const resultACT360 = loanAmortization({
        //     principal: 200000,
        //     fixedFrom: '2007-09-06',          // input format yyyy-MM-dd
        //     fixedUntil: '2022-10-01',
        //     interestRate: 0.04,
        //     interestEffectiveFrom: '2016-05-01',
        //     interestMethod: 'act/360',
        //     inclusiveEnd: false
        // });

        // console.log('Fixed Payment:', resultACT360.fixedPayment);
        // console.log('Amortization Schedule:');
        // console.table(resultACT360.schedule);

        const enrichedResult = result.schedule.map(obj => ({
            ...obj,
            contractId: contractId
        }));

        await DELETE.from(LoanAmortization);
        await INSERT.into(LoanAmortization).entries(enrichedResult);

        console.table(enrichedResult);
        return result;
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