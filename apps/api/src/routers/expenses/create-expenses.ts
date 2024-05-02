import { Router } from "express";
import { CreateExpensesController } from "../../controllers/expenses/create-expenses";

export const createExpensesRouter: Router = Router().post("/", async (request, response) => {

    const {body, statusCode} = await new CreateExpensesController().handle({
        body: request.body
    })
    
    response.status(statusCode).send(body)
})