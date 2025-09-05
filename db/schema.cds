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
    key ID                         : UUID;
        companyCode                : String  @Common.Label: 'Company Code';
    key loanNumber                 : String  @mandatory  @Common.Label: 'Loan Number';
    key productType                : String  @mandatory  @Common.Label: 'Product Type';
    key loanType                   : String  @mandatory  @Common.Label: 'Loan Type';
    key loanPartner                : String  @mandatory  @Common.Label: 'Loan Partner';
        status                     : String;
        disbursementStatus         : String;

        //basic data
        pledgedStatus              : String;
        //analysis
        purposeOfLoan              : String;
        arBillingJob               : String;
        //conditions
        commitCapital              : String  @mandatory;
        repaymentType              : String;

        //term/fixed Period
        fixedFrom                  : Date  @mandatory;
        fixedUntil                 : Date  @mandatory;
        include                    : Boolean ;

        //Interest Calculation
        intCalMt                   : String  @mandatory;
        contractToCondition        : Composition of many ConditionItems
                                         on contractToCondition.contractId = ID;
        contractToLoanAmortization : Association to  many LoanAmortization
                                         on contractToLoanAmortization.contractId=ID;


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
        dueDate             : Date ;
        calculationDate     : Date ;
        sequence            : Integer;
        conditionToContract : Association to contract;


}

entity LoanAmortization {
    key ID               : UUID;
        contractId       : UUID;
        periodStart      : String;
        periodEnd        : String;
        paymentDate      : String;
        principalPayment : String;
        interestPayment  : String;
        totalPayment     : String;
        openingBalance : String;
        closingBalance : String;
        LoanAmortizationToContract:Association to contract;

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
   Key ID          : UUID;
    value       : String;
    description : String;
}

entity paymentFromExactDaySearchHepl {
    key ID          : UUID;
        value       : String;
        description : String;
}
