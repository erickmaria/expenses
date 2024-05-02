import { Expenses } from "../../domain/models/expenses";
import { CreateExpensesRequestDTO } from "../../dtos/CreateExpensesRequestDTO";
import { GetAllExpensesService } from "../../services/expenses/get-all-expenses";
import {Controller, IHttpResponse } from "../controller";

const GetExpensesError: Error = {
    name: "get-expenses-error",
    message:"Error to list expenses"
}


export class GetAllExpensesController  extends Controller<CreateExpensesRequestDTO> {


    constructor(protected readonly service: GetAllExpensesService = new GetAllExpensesService()){
        super(service);
    }

    async handle(): Promise<IHttpResponse<CreateExpensesRequestDTO[] | Error>> {
        
        try {

            const expenses = await this.service.execute()

            if ((expenses as Expenses[]).length == 0){
                return {
                    statusCode: 404,
                    body: expenses
                }
            }

            return {
                statusCode: 200,
                body: expenses
            }

        }catch(err){

            return {
                statusCode: 500,
                body: GetExpensesError
            }
        }

    }

}

