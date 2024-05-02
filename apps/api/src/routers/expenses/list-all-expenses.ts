import { Router } from "express";
import { GetAllExpensesController } from "../../controllers/expenses/get-all-expenses";

export const listAllExpensesRouter: Router = Router().get("/", async (request, response) => {

    const {body, statusCode} = await new GetAllExpensesController().handle()
    
    response.status(statusCode).send(body)
})
