using CashFlowService as service from '../../srv/service';

annotate service.contractNew with @(
    UI.SelectionFields                 : [
        loanNumber,
        loanPartner,
    ],
    UI.LineItem                        : [
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
    UI.Facets                          : [
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
            ID    : 'Coditions',
            Facets: [
                {
                    $Type : 'UI.CollectionFacet',
                    Label : 'Conditions',
                    ID    : 'Conditions1',
                    Facets: [{
                        $Type : 'UI.ReferenceFacet',
                        Label : '   ',
                        ID    : '_',
                        Target: '@UI.FieldGroup#_',
                    }, ],
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Term/Fixed Period',
                    ID    : 'Fixed',
                    Target: '@UI.FieldGroup#Fixed',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Interest Calculation',
                    ID    : 'InterestCalculation',
                    Target: '@UI.FieldGroup#InterestCalculation2',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Condition Items',
                    ID    : 'ConditionItems',
                    Target: 'contractToCondition/@UI.SelectionPresentationVariant#ConditionItems4',
                },
            ],
        },
    ],
    UI.FieldGroup #HeaderDetails       : {
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
    UI.FieldGroup #Classification      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: loanType,
                @UI.Hidden,
            },
            {
                $Type: 'UI.DataField',
                Value: pledgedStatus,
                Label: 'Pledged Status',
            },
        ],
    },
    UI.FieldGroup #AnalysisData        : {
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
    UI.FieldGroup #Conditions          : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'Commit. Capital',
        }],
    },
    UI.FieldGroup #TermFixedPeriod     : {
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
                Label: 'Fixed until',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'Inclusive Indicator',
            },
        ],
    },
    UI.FieldGroup #InterestCalculation : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: intCalMt,
            Label: 'Int.Cal.Mt',
        }, ],
    },
    UI.HeaderFacets                    : [{
        $Type : 'UI.ReferenceFacet',
        Label : 'Header Details',
        ID    : 'HeaderSection',
        Target: '@UI.FieldGroup#HeaderSection',
        @UI.Hidden,
    }, ],
    UI.FieldGroup #HeaderSection       : {
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
                Label: 'Disb. Status',
            },
            {
                $Type: 'UI.DataField',
                Value: loanPartner,
            },
        ],
    },
    UI.HeaderInfo                      : {
        TypeName      : '  ',
        TypeNamePlural: ' ',
    },
    UI.FieldGroup #Conditions1         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #TermFixedPeriod1    : {
        $Type: 'UI.FieldGroupType',
        Data : [],
    },
    UI.FieldGroup #Term                : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'fixedFrom',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'fixedUntil',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'include',
            },
        ],
    },
    UI.FieldGroup #TermFixedPeriod2    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'fixedFrom',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'fixedUntil',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'include',
            },
        ],
    },
    UI.FieldGroup #InterestCalculation1: {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: intCalMt,
            Label: 'intCalMt',
        }, ],
    },
    UI.FieldGroup #Conditions2         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #conditions          : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #TermFixedPeriod3    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'fixedFrom',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'fixedUntil',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'include',
            },
        ],
    },
    UI.FieldGroup #Conditions3         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #conditions1         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #TermFixedP          : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'fixedFrom',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'fixedUntil',
            },
        ],
    },
    UI.FieldGroup #conditions2         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #Termfixed           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'fixedFrom',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'fixedUntil',
            },
        ],
    },
    UI.FieldGroup #Fixed               : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: fixedFrom,
                Label: 'Amortization Start',
            },
            {
                $Type: 'UI.DataField',
                Value: fixedUntil,
                Label: 'Amortization End',
            },
            {
                $Type: 'UI.DataField',
                Value: include,
                Label: 'Inclusive Indicator',
            },
        ],
    },
    UI.FieldGroup #InterestCalculation2: {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: intCalMt,
            Label: 'Interest Calculation Method',
        }, ],
    },
    UI.FieldGroup #Conditions4         : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'commitCapital',
        }, ],
    },
    UI.FieldGroup #_                   : {
        $Type: 'UI.FieldGroupType',
        Data : [{
            $Type: 'UI.DataField',
            Value: commitCapital,
            Label: 'Loan Amount',
        }, ],
    },
);

annotate service.contractNew with {
    loanNumber @Common.Label: 'Loan Number'
};

annotate service.contractNew with {
    status @Common.FieldControl: #ReadOnly
};

annotate service.contractNew with {
    disbursementStatus @Common.FieldControl: #ReadOnly
};

annotate cfs.ConditionItemsNew with @(
    UI.LineItem #ConditionItems                     : [],
    UI.LineItem #ConditionItems2                    : [
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
    ],
    UI.LineItem #ConditionItems3                    : [
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
    ],
    UI.SelectionPresentationVariant #ConditionItems3: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#ConditionItems3',
            ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : sequence,
                Descending: false,
            }, ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
    },
    UI.LineItem #ConditionItems4                    : [
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
    ],
    UI.SelectionPresentationVariant #ConditionItems4: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#ConditionItems4',
            ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : sequence,
                Descending: false,
            }, ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
    },
);

annotate service.ConditionItemsNew with @(UI.LineItem #ConditionItems1: [
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
],
    Common.Text : arBillingJob,);



annotate service.contractNew with {
    pledgedStatus @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'PledgedStatusSearchHelp',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: pledgedStatus,
                ValueListProperty: 'value',
            }],
            Label         : 'Pledges status ',
        },
        Common.ValueListWithFixedValues: true,
    )
};



annotate service.contractNew with {
    purposeOfLoan @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'purposeOfLoanSearchHelp',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: purposeOfLoan,
                ValueListProperty: 'value',
            }, ],
            Label         : 'Purpose of Loan Search Help',
        },
        Common.ValueListWithFixedValues: true,
    )
};



// annotate service.purposeOfLoanSearchHelp with {
//     value @(
//         Common.Text                    : description,
//         Common.Text.@UI.TextArrangement: #TextLast,
//     )
// };

annotate service.ConditionItemsNew with {
    paymentFromExactDay @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'paymentFromExactDaySearchHepl',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: paymentFromExactDay,
                ValueListProperty: 'value',
            }, ],
            Label         : 'Payment from exact day search Hepl',
        },
        Common.ValueListWithFixedValues: true,
    )
};

// annotate service.paymentFromExactDaySearchHepl with {
//     value @(
//         Common.Text                    : description,
//         Common.Text.@UI.TextArrangement: #TextLast,
//     )
// };
annotate service.ConditionItemsNew with {
    conditionTypeText @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'ConditionTypeTextSearchHelpNew',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : conditionTypeText,
                    ValueListProperty : 'value',
                },
            ],
            Label : 'Condition text shelp',
        },
        Common.ValueListWithFixedValues : true,
)};


annotate service.contractNew with {
    intCalMt @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'InterestCalSearchHelp',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : intCalMt,
                    ValueListProperty : 'value',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
)};

