using {  cfs} from '../db/schema';
service CashFlowService {
    entity CashFlow as projection on cfs.CashFlow;
}
