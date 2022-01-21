export const transactionType = {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE"
};

export class Transaction{
    value;
    type;
    id;
    timestamp;

    constructor(type, value){
        if(typeof value !== "number" || isNaN(value)){
            throw new TypeError("Value must be Number");
        }       
        this.value = value;
        
        if(!(type in transactionType)){
            throw new Error("Type must be INCOME or EXPENSE only")
        }
        this.type = type;
        this.id = `${type}-${value}-${Math.random().toFixed(4) * 100}`;
        this.timestamp = Date.now();
    }
};