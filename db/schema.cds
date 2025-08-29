namespace cfs;

entity CashFlow {
    key ID:UUID;
    productType:String;
    businessPartner:String;
    typesOfInterest:String;
    loanAmount:String;
    loanTerm :String;  
}
