import { GetAllExpensesRepository } from "../../domain/repositories/expenses/get-all-expenses";
import { CreateExpensesRequestDTO } from "../../dtos/CreateExpensesRequestDTO";
import { Service } from "../service";

export class GetAllExpensesService extends Service<CreateExpensesRequestDTO, GetAllExpensesRepository>{

    constructor(){
        super(new GetAllExpensesRepository());
    }

    async execute(): Promise<CreateExpensesRequestDTO[] > {

        const expenses = await this.repository.getAll()

        return expenses.map((e) => ({
            did: e.id,
            name: e.name,
            description: e.description,
            dateExpiration: e.dateExpiration,
            installment: e.installment,
            value: e.value,
            status: e.status,
            tags: e.tags

        }));
    }
    
}
