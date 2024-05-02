import { CreateExpensesRepository } from "../../domain/repositories/expenses/create-expenses";
import { CreateExpensesRequestDTO } from "../../dtos/CreateExpensesRequestDTO";
import { Service } from "../service";

export class CreateExpensesService extends Service<CreateExpensesRequestDTO, CreateExpensesRepository>{

    constructor(){
        super(new CreateExpensesRepository());
    }

    async execute(data: CreateExpensesRequestDTO): Promise<CreateExpensesRequestDTO> {

        try {

            const expenses =  await this.repository.create({
                ...data.getData(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
          

            return expenses.map((e) => ({
                id: e.id,
                name: e.name,
                description: e.description,
                dateExpiration: e.dateExpiration,
                installment: e.installment,
                value: e.value,
                status: e.status,
                tags: e.tags
            }))[0]

        } catch (err) {
            throw err
        }
    }

    
}   