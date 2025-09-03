using CashFlowService as service from '../../srv/service';

annotate service.Contract with @(
    UI.SelectionFields                : [
        loanNumber,
        loanPartner,
    ],
    UI.LineItem                       : [
        {
            $Type: 'UI.DataField',
            Value: companyCode,
        },
        {
            $Type: 'UI.DataField',
            Value: loanNumber,
        },
        {
            $Type: 'UI.DataField',
            Value: productType,
        },
        {
            $Type: 'UI.DataField',
            Value: loanType,
        },
        {
            $Type: 'UI.DataField',
            Value: loanPartner,
            Label: 'Loan  Partner',
        },
    ],
    UI.Facets                         : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Header Details',
            ID    : 'HeaderDetails',
            Target: '@UI.FieldGroup#HeaderDetails',
            @UI.Hidden,
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Basic Data',
            ID    : 'BasicData',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Classification',
                    ID    : 'Classification',
                    Target: '@UI.FieldGroup#Classification',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Analysis Data',
                    ID    : 'AnalysisData',
                    Target: '@UI.FieldGroup#AnalysisData',
                },
            ],
        },
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Conditions',
            ID    : 'Conditions',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Conditions',
                    ID    : 'Conditions1',
                    Target: '@UI.FieldGroup#Conditions',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Term/Fixed Period',
                    ID    : 'TermFixedPeriod',
                    Target: '@UI.FieldGroup#TermFixedPeriod',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Interest Calculation',
                    ID    : 'InterestCalculation',
                    Target: '@UI.FieldGroup#InterestCalculation',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Condition Items',
                    ID    : 'ConditionItems1',
                    Target: 'contractToCondition/@UI.LineItem#ConditionItems1',
                },
            ],
        },
    ],
    UI.FieldGroup #HeaderDetails      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: loanNumber,
            },
            {
                $Type: 'UI.DataField',
                Value: productType,
            },
            {
                $Type: 'UI.DataField',
                Value: status,
                Label: 'Status',
            },
            {
                $Type: 'UI.DataField',
                Value: disbursementStatus,
                Label: 'Disb.  Status',
            },
            {
                $Type: 'UI.DataField',
                Value: loanPartner,
                Label: 'Business  Partner',
            },
        ],
    },
    UI.FieldGroup #Classification     : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: loanType,
            },
            {
                $Type: 'UI.DataField',
                Value: pledgedStatus,
                Label: 'Pledged Status',
            },
        ],
    },
    UI.FieldGroup #AnalysisData       : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: purposeOfLoan,
                Label: 'Purpose of Loan',
            },
            {
                $Type: 'UI.DataField',
                Value: arBillingJob,
                Label: 'AR Billing Job',
            },
        ],
    },
    UI.FieldGroup #Conditions         : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: commitCapital,
                Label: 'Commit. Capital',
            },
            {
                $Type: 'UI.DataField',
                Value: repaymentType,
                Label: 'Repayment Type',
            },
        ],
    },
    UI.FieldGroup #TermFixedPeriod    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'Fixed From',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'Fixed unt.',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'Incl.',
            },
        ],
    },
    UI.FieldGroup #InterestCalculation: {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: intCalMt,
            Label: 'Int.Cal.Mt',
        }, ],
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Header Details',
            ID : 'HeaderSection',
            Target : '@UI.FieldGroup#HeaderSection',
            @UI.Hidden,
        },
    ],
    UI.FieldGroup #HeaderSection : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : loanNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : productType,
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'Status',
            },
            {
                $Type : 'UI.DataField',
                Value : disbursementStatus,
                Label : 'Disb. Status',
            },
            {
                $Type : 'UI.DataField',
                Value : loanPartner,
            },
        ],
    },
    UI.HeaderInfo : {
        TypeName : '  ',
        TypeNamePlural : ' ',
    },
);

annotate service.Contract with {
    loanNumber @Common.Label: 'Loan Number'
};

annotate service.Contract with {
    status @Common.FieldControl: #ReadOnly
};

annotate service.Contract with {
    disbursementStatus @Common.FieldControl: #ReadOnly
};

annotate cfs.ConditionItems with @(UI.LineItem #ConditionItems: []);

annotate service.ConditionItems with @(UI.LineItem #ConditionItems1: [
    {
    $Type: 'UI.DataField',
    Value: conditionTypeText,
    Label: 'Cond.Type Text'
},
{
    $Type: 'UI.DataField',
    Value: effectiveFrom,
    Label: 'Eff. From'
},
{
    $Type: 'UI.DataField',
    Value: percentage,
    Label: 'Percentage'
},
{
    $Type: 'UI.DataField',
    Value: conditionAmt,
    Label: 'Condition Amnt'
},
{
    $Type: 'UI.DataField',
    Value: paymentFromExactDay,
    Label: 'Payment From Exact Day'
},
{
    $Type: 'UI.DataField',
    Value: frequencyInMonths,
    Label: 'Frequency in Months'
},
{
    $Type: 'UI.DataField',
    Value: dueDate,
    Label: 'Due Date'
},
{
    $Type: 'UI.DataField',
    Value: calculationDate,
    Label: 'Calculation Date'
}
]);
annotate service.ConditionItems with {
    conditionTypeText @Common.FieldControl : #ReadOnly
};

