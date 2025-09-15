using {cfs} from '../db/schema';

service CashFlowService {
    entity CashFlow                       as projection on cfs.CashFlow;
    entity CashFlow2                      as projection on cfs.CashFlow2;

    @odata.draft.enabled
    @Common.SideEffects: {
        SourceProperties: ['contractToCondition.paymentFromExactDay'], // when this field changes
        TargetEntities  : ['contractToCondition'] // refresh this entity
    }
    entity Contract                       as projection on cfs.contract;


    // @Common.SideEffects: {
    //     SourceProperties: ['purposeOfLoan'], // when this field changes
    //     TargetEntities  : [''] // refresh this entity
    // }

    @Common.SideEffects: {
        SourceProperties: ['paymentFromExactDay'], // when this field changes
        TargetProperties: [
            'dueDate',
            'calculationDate',
            'frequencyInMonths'
        ] // refresh this entity
    }
    entity ConditionItems                 as projection on cfs.ConditionItems;

    entity InterestCalSearchHelp          as projection on cfs.InterestCalSearchHelp;
    entity PledgedStatusSearchHelp        as projection on cfs.PledgedStatusSearchHelp;
    entity purposeOfLoanSearchHelp        as projection on cfs.purposeOfLoanSearchHelp;
    entity paymentFromExactDaySearchHepl  as projection on cfs.paymentFromExactDaySearchHepl;
    entity LoanAmortization               as projection on cfs.LoanAmortization;
    entity AmortizationSchedule           as projection on cfs.AmortizationSchedule;
    entity AmortizationSchedule2          as projection on cfs.AmortizationSchedule2;
    entity ConditionTypeTextSearchHelp    as projection on cfs.ConditionTypeTextSearchHelp;


    function loadAmortizationFunc(principal: String,
                                  annualRate: String,
                                  startDate: String,
                                  endDate: String,
                                  interestFixedDate: String,
                                  inclusiveIndicator: String,

                                  contractId: String,
                                  intCalMt: String,
                                  calculationDate: String,
                                  dueDate: String,
                                  percentage: String,
                                  conditionAmt: String,
                                  efffectiveDatefinalRepayment: String,
                                  isActiveEntity: String,
                                  loanData: LargeString)                  returns String;


    function onRatePress(contractId: Contract:ID, isActiveEntity: String) returns String;


    //new application service
    @odata.draft.enabled 
    entity contractNew                    as projection on cfs.contractNew;

    entity ConditionItemsNew              as projection on cfs.ConditionItemsNew;
    entity LoanAmortizationNew            as projection on cfs.LoanAmortizationNew;
    entity AmortizationSchedule2New       as projection on cfs.AmortizationSchedule2New;
    entity ConditionTypeTextSearchHelpNew as projection on cfs.ConditionTypeTextSearchHelpNew;

    function loadAmortizationFuncNew(principal: String,
                                     annualRate: String,
                                     startDate: String,
                                     endDate: String,
                                     interestFixedDate: String,
                                     inclusiveIndicator: String,

                                     contractId: String,
                                     intCalMt: String,
                                     calculationDate: String,
                                     dueDate: String,
                                     percentage: String,
                                     conditionAmt: String,
                                     efffectiveDatefinalRepayment: String,
                                     isActiveEntity: String,
                                     loanData: LargeString)               returns String;


}
