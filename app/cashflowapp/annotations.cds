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
);

