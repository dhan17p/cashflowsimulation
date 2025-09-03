using CashFlowService as service from '../../srv/service';
annotate service.Contract with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'companyCode',
                Value : companyCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'loanNumber',
                Value : loanNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'productType',
                Value : productType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'loanType',
                Value : loanType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'loanPartner',
                Value : loanPartner,
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
            Label : 'companyCode',
            Value : companyCode,
        },
        {
            $Type : 'UI.DataField',
            Label : 'loanNumber',
            Value : loanNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'productType',
            Value : productType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'loanType',
            Value : loanType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'loanPartner',
            Value : loanPartner,
        },
    ],
);

