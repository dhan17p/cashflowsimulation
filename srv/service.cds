using {cfs} from '../db/schema';

service CashFlowService {
    entity CashFlow                      as projection on cfs.CashFlow;
    entity CashFlow2                     as projection on cfs.CashFlow2;

    @odata.draft.enabled
    entity Contract                      as projection on cfs.contract;

    entity ConditionItems                as projection on cfs.ConditionItems;
    entity InterestCalSearchHelp         as projection on cfs.InterestCalSearchHelp;
    entity PledgedStatusSearchHelp       as projection on cfs.PledgedStatusSearchHelp;
    entity purposeOfLoanSearchHelp       as projection on cfs.purposeOfLoanSearchHelp;
    entity paymentFromExactDaySearchHepl as projection on cfs.paymentFromExactDaySearchHepl;
    entity LoanAmortization as projection on cfs.LoanAmortization;


    function loadAmortizationFunc(principal: String,
                              annualRate: String,
                              startDate: String,
                              endDate: String,
                              interestFixedDate: String,
                              inclusiveIndicator: String,
                           
                              contractId: String,
                                 intCalMt:String) returns String;


}
