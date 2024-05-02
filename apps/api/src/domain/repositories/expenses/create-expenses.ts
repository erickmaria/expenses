import { Expenses } from "../../models/expenses";
import { CreateRepository } from "../repository";


export class CreateExpensesRepository extends CreateRepository<Expenses> {
    constructor(){
        super('expenses')
    }
}