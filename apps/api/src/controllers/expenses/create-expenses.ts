import { ZodError } from "zod";
import { Controller, IHttpRequest, IHttpResponse, ResponseError } from "../controller";
import { CreateExpensesService } from "../../services/expenses/create-expenses";
import { CreateExpensesRequestDTO } from "../../dtos/CreateExpensesRequestDTO";

const CreateExpensesError: ResponseError = {
    name: "create-expense-error",
    message: "Something wrong happened",
};

const CreateExpensesCannotBodyEmptyError: ResponseError = {
    name: "create-expense-cannot-body-empty-error",
    message: "Something wrong happened",
};

const CreateExpensesBodyParseError: ResponseError = {
    name: "create-expense-body-parse-error",
    message: undefined
}

export class CreateExpensesController extends Controller<CreateExpensesRequestDTO> {

    constructor(protected readonly service: CreateExpensesService = new CreateExpensesService()){
        super(service);
    }

    async handle(httpRequest?: IHttpRequest<unknown> | undefined): Promise<IHttpResponse<unknown | ResponseError >> {
        try {

            if (httpRequest?.body === undefined) {
                return {
                    statusCode: 400,
                    body: CreateExpensesCannotBodyEmptyError
                }
            }

            const expense = await this.service.execute(
                new CreateExpensesRequestDTO({...httpRequest.body})
            )

            return {
                statusCode: 201,
                body: expense
            }

        }catch(err){

            console.error(err)

            if (err instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: {...CreateExpensesBodyParseError, message: err.issues}
                }
            }

            return {
                statusCode: 500,
                body: CreateExpensesError
            }
        }
    }

}