import { Expenses } from "../../models/expenses";
import { GetAllRepository } from "../repository";

export class GetAllExpensesRepository extends GetAllRepository<Expenses> {
    constructor(){
        super('expenses')
    }
}