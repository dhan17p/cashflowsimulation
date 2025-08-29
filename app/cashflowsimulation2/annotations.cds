using CashFlowService as service from '../../srv/service';
using from '../../db/schema';

annotate service.CashFlow2 with @(
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
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Items',
            ID : 'Items',
            Target : 'cashflow2toItem/@UI.LineItem#Items',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            // Label : 'productType',
            Value : productType,
        },
        {
            $Type : 'UI.DataField',
            // Label : 'businessPartner',
            Value : businessPartner,
        },
        {
            $Type : 'UI.DataField',
            // Label : 'typesOfInterest',
            Value : typesOfInterest,
        },
        {
            $Type : 'UI.DataField',
            // Label : 'loanAmount',
            Value : loanAmount,
        },
        {
            $Type : 'UI.DataField',
            // Label : 'loanTerm',
            Value : loanTerm,
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

annotate service.cashFlowLineItem with @(
    UI.LineItem #Items : [
        {
            $Type : 'UI.DataField',
            Value : dueDate,
        },
        {
            $Type : 'UI.DataField',
            Value : paymentDate,
        },
        {
            $Type : 'UI.DataField',
            Value : fType,
        },
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : SettlementAmount,
        },
    ]
);

