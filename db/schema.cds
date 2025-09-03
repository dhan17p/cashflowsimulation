namespace cfs;

entity CashFlow {
    key ID               : UUID;
        productType      : String;
        businessPartner  : String;
        typesOfInterest  : String;
        loanAmount       : String;
        loanTerm         : String;
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
    key ID          : UUID;
        companyCode : String;
        loanNumber  : String;
        productType : String;
        loanType    : String;
        loanPartner : String;
}
