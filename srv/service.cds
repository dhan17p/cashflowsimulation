using {  cfs} from '../db/schema';
service CashFlowService {
    entity CashFlow as projection on cfs.CashFlow;
    entity CashFlow2 as projection on cfs.CashFlow2;
    @odata.draft.enabled
    entity Contract as projection on cfs.contract;
    entity ConditionItems as projection on cfs.ConditionItems;
    

}
