namespace cfs;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity CashFlow {
    key ID               : UUID;
        productType      : String;
        businessPartner  : String;
        typesOfInterest  : String;
        loanAmount       : String;
        loanTerm         : String;
        loanTermEnd      : String;
        dueDate          : String;
        patmentDate      : String;
        fType            : String;
        name             : String;
        SettlementAmount : String;
}

entity CashFlow2 {
    key ID              : UUID;
        productType     : String @Common.Label: 'Product Type';
        businessPartner : String @Common.Label: 'Business Partner';
        typesOfInterest : String @Common.Label: 'Types of Interest';
        loanAmount      : String @Common.Label: 'Loan Amount';
        loanTerm        : String @Common.Label: 'Product Term';
        cashflow2toItem : Composition of many cashFlowLineItem
                              on cashflow2toItem.IdCashflowChild = ID;

}

entity cashFlowLineItem {
    key IdCashflowChild        : UUID;
    key IDL                    : UUID;
        dueDate                : String @Common.Label: 'Due Date';
        paymentDate            : String @Common.Label: 'Patment Date';
        fType                  : String @Common.Label: 'FType';
        name                   : String @Common.Label: 'Name';
        SettlementAmount       : String @Common.Label: 'Settlement Amount';
        cashflowItemTocashFlow : Association to CashFlow2;
}


entity contract {
    key ID                                 : UUID;
        companyCode                        : String  @Common.Label: 'Company Code';
    key loanNumber                         : String  @mandatory  @Common.Label: 'Loan Number';
    key productType                        : String  @mandatory  @Common.Label: 'Product Type';
    key loanType                           : String  @mandatory  @Common.Label: 'Loan Type';
    key loanPartner                        : String  @mandatory  @Common.Label: 'Loan Partner';
        status                             : String;
        disbursementStatus                 : String;

        //basic data
        pledgedStatus                      : String;
        //analysis
        purposeOfLoan                      : String;
        arBillingJob                       : String;
        //conditions
        commitCapital                      : String  @mandatory;
        repaymentType                      : String;

        //term/fixed Period
        fixedFrom                          : Date    @mandatory;
        fixedUntil                         : Date    @mandatory;
        include                            : Boolean;

        //Interest Calculation
        intCalMt                           : String  @mandatory;
        contractToCondition                : Composition of many ConditionItems
                                                 on contractToCondition.contractId = ID;
        // contractToConditionAdjust          : Association to many ConditionItemsAdjust
        //                                          on contractToConditionAdjust.contractId = ID;
        contractToLoanAmortization         : Association to many LoanAmortization
                                                 on contractToLoanAmortization.contractId = ID;
        contractToLoanAmortizationSchedule : Association to many AmortizationSchedule
                                                 on contractToLoanAmortizationSchedule.contractId = ID;


}
entity contractAdjust{
    key ID                                 : UUID;
        companyCode                        : String  @Common.Label: 'Company Code';
    key loanNumber                         : String  @mandatory  @Common.Label: 'Loan Number';
    key productType                        : String  @mandatory  @Common.Label: 'Product Type';
    key loanType                           : String  @mandatory  @Common.Label: 'Loan Type';
    key loanPartner                        : String  @mandatory  @Common.Label: 'Loan Partner';
        status                             : String;
        disbursementStatus                 : String;

        //basic data
        pledgedStatus                      : String;
        //analysis
        purposeOfLoan                      : String;
        arBillingJob                       : String;
        //conditions
        commitCapital                      : String  @mandatory;
        repaymentType                      : String;

        //term/fixed Period
        fixedFrom                          : Date    @mandatory;
        fixedUntil                         : Date    @mandatory;
        include                            : Boolean;

        //Interest Calculation
        intCalMt                           : String  @mandatory;
        contractToConditionAdjust          : Composition of many ConditionItemsAdjust
                                                 on contractToConditionAdjust.contractId = ID;
}

entity ConditionItems : managed {
    key conditionId         : UUID;
        contractId          : UUID;
        conditionTypeText   : String;
        effectiveFrom       : Date;
        percentage          : String;
        conditionAmt        : String;
        paymentFromExactDay : String;
        frequencyInMonths   : String;
        dueDate             : Date;
        calculationDate     : Date;
        sequence            : Integer;
        conditionToContract : Association to contract;


}

entity ConditionItemsAdjust : managed {
    key conditionId         : UUID;
        contractId          : UUID;
        conditionTypeText   : String;
        effectiveFrom       : Date;
        percentage          : String;
        conditionAmt        : String;
        paymentFromExactDay : String;
        frequencyInMonths   : String;
        dueDate             : Date;
        calculationDate     : Date;
        sequence            : Integer;
        conditionToContract : Association to contract;


}

entity ConditionTypeTextSearchHelp {
    key ID    : UUID;
        value : String;

}

entity LoanAmortization {
    key ID                         : UUID;
        contractId                 : UUID;
        periodStart                : String;
        periodEnd                  : String;
        paymentDate                : String;
        principalPayment           : String;
        interestPayment            : String;
        totalPayment               : String;
        openingBalance             : String;
        closingBalance             : String;
        LoanAmortizationToContract : Association to contract;

}

entity AmortizationSchedule {
    key ID                                 : UUID           @title: 'Unique row ID';
        contractId                         : UUID;
        index                              : Integer        @title: 'Index in schedule';
        paymentDate                        : Date           @title: 'Payment date';
        name                               : String(100)    @title: 'Description of the entry';
        settleAmount                       : Decimal(12, 2) @title: 'Amount for principal or interest';
        currency                           : String(3)      @title: 'Currency code';
        LoanAmortizationScheduleToContract : Association to contract;

}

entity AmortizationSchedule2 {

    key ID                 : UUID;
        dueDate            : String;
        flowType           : String;
        name               : String;
        planActualRec      : String;
        settlementAmount   : String;
        settlementCurrency : String;
        baseAmount         : String;
        percentageRate     : String;
        calculationFrom    : String;
        calculationDate    : String;
        numberOfDays       : String;
        index              : Integer;


}

entity InterestCalSearchHelp {
    key ID    : UUID;
        value : String;

}

entity PledgedStatusSearchHelp {
    key ID          : UUID;
        value       : String;
        description : String;
}

entity purposeOfLoanSearchHelp {
    key ID          : UUID;
        value       : String;
        description : String;
}

entity paymentFromExactDaySearchHepl {
    key ID          : UUID;
        value       : String;
        description : String;
}


//new application schema


entity contractNew {
    key ID                                 : UUID;
        companyCode                        : String  @Common.Label: 'Company Code';
    key loanNumber                         : String  @mandatory  @Common.Label: 'Loan Number';
    key productType                        : String  @mandatory  @Common.Label: 'Agency';
    key loanType                           : String  @mandatory  @Common.Label: 'Loan Program';
    key loanPartner                        : String  @mandatory  @Common.Label: 'Loan Partner';
        status                             : String;
        disbursementStatus                 : String;

        //basic data
        pledgedStatus                      : String;
        //analysis
        purposeOfLoan                      : String;
        arBillingJob                       : String;
        //conditions
        commitCapital                      : String  @mandatory;
        repaymentType                      : String;

        //term/fixed Period
        fixedFrom                          : Date    @mandatory;
        fixedUntil                         : Date    @mandatory;
        include                            : Boolean;

        //Interest Calculation
        intCalMt                           : String  @mandatory;
        contractToCondition                : Composition of many ConditionItemsNew
                                                 on contractToCondition.contractId = ID;
        contractToLoanAmortization         : Association to many LoanAmortizationNew
                                                 on contractToLoanAmortization.contractId = ID;
        contractToLoanAmortizationSchedule : Association to many LoanAmortizationNew
                                                 on contractToLoanAmortizationSchedule.contractId = ID;


}

entity ConditionItemsNew : managed {
    key conditionId         : UUID;
        contractId          : UUID;
        conditionTypeText   : String;
        effectiveFrom       : Date;
        percentage          : String;
        conditionAmt        : String;
        paymentFromExactDay : String;
        frequencyInMonths   : String;
        dueDate             : Date;
        calculationDate     : Date;
        sequence            : Integer;
        conditionToContract : Association to contract;


}


entity LoanAmortizationNew {
    key ID                         : UUID;
        contractId                 : UUID;
        periodStart                : String;
        periodEnd                  : String;
        paymentDate                : String;
        principalPayment           : String;
        interestPayment            : String;
        totalPayment               : String;
        openingBalance             : String;
        closingBalance             : String;
        LoanAmortizationToContract : Association to contract;

}


entity AmortizationSchedule2New {

    key ID                 : UUID;
        dueDate            : String;
        flowType           : String;
        name               : String;
        planActualRec      : String;
        settlementAmount   : String;
        settlementCurrency : String;
        baseAmount         : String;
        percentageRate     : String;
        calculationFrom    : String;
        calculationDate    : String;
        numberOfDays       : String;
        index              : Integer;


}

entity ConditionTypeTextSearchHelpNew {
    key ID    : UUID;
        value : String;

}
