using CashFlowService as service from '../../srv/service';
annotate service.CashFlow with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'productType',
                Value : productType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'businessPartner',
                Value : businessPartner,
            },
            {
                $Type : 'UI.DataField',
                Label : 'typesOfInterest',
                Value : typesOfInterest,
            },
            {
                $Type : 'UI.DataField',
                Label : 'loanAmount',
                Value : loanAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'loanTerm',
                Value : loanTerm,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : dueDate,
            Label : 'dueDate',
        },
        {
            $Type : 'UI.DataField',
            Value : patmentDate,
            Label : 'patmentDate',
        },
        {
            $Type : 'UI.DataField',
            Value : fType,
            Label : 'fType',
        },
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'name',
        },
        {
            $Type : 'UI.DataField',
            Value : SettlementAmount,
            Label : 'SettlementAmount',
        },
    ],
    UI.SelectionFields : [
        productType,
        businessPartner,
        typesOfInterest,
        loanAmount,
        loanTerm,
    ],
);

annotate service.CashFlow with {
    productType @Common.Label : 'Product Type'
};

annotate service.CashFlow with {
    businessPartner @Common.Label : 'Business Partner'
};

annotate service.CashFlow with {
    typesOfInterest @Common.Label : 'Types of Interest'
};

annotate service.CashFlow with {
    loanAmount @Common.Label : 'Loan Amount'
};

annotate service.CashFlow with {
    loanTerm @Common.Label : 'loanTerm'
};

