const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
    let { Contract, ConditionItems } = this.entities;
    this.after('CREATE', Contract.drafts, async (req) => {
        debugger
        debugger
        var data = [
            { contractId: req.ID, conditionTypeText: "Nominal Interest Fixed", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },
            { contractId: req.ID, conditionTypeText: "Delinquency fee", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },
            { contractId: req.ID, conditionTypeText: "Annuity repayment", DraftAdministrativeData_DraftUUID: req.DraftAdministrativeData_DraftUUID },]
        await INSERT.into(ConditionItems.drafts).entries(data);


    })
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