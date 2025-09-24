using CashFlowService as service from '../../srv/service';
annotate service.contractAdjust with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
          
            {
                $Type : 'UI.DataField',
                Label : 'Effective Capital',
                Value : commitCapital,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Adjustment From',
                Value : fixedFrom,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Adjustment Until',
                Value : fixedUntil,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Int.Cal.Mt',
                Value : intCalMt,
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
            Label : 'Condition Items',
            ID : 'ConditionItems',
            Target : 'contractToConditionAdjust/@UI.LineItem#ConditionItems',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : loanPartner,
        },
        {
            $Type : 'UI.DataField',
            Value : loanType,
        },
        {
            $Type : 'UI.DataField',
            Value : productType,
        },
        {
            $Type : 'UI.DataField',
            Value : loanNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : companyCode,
        },
    ],
    UI.HeaderInfo : {
        TypeNamePlural : ' ',
        TypeName : ' ',
    },
    UI.DeleteHidden : true,
);

annotate service.ConditionItemsAdjust with @(
    UI.LineItem #ConditionItems : [
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
    ]
);
annotate service.ConditionItemsAdjust with {
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
annotate service.ConditionItemsAdjust with {
    conditionTypeText @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'ConditionTypeTextSearchHelp',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: conditionTypeText,
                ValueListProperty: 'value',
            }, ],
            Label         : 'Condition text shelp',
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.contractAdjust with {
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
            Label : 'Interest Calculation Search Help',
        },
        Common.ValueListWithFixedValues : true,
)};