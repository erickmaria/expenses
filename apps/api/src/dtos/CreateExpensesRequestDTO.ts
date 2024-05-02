export interface ICreateExpensesRequestDTO {
    id?: number
    name: string
    value: number
    dateExpiration: Date
    installment: string
    description: string
    status: "pending" | "done" | "late"
    tags: Array<string>
}

import { z } from "zod"
import { Dto } from "./dto"

const CreateExpensesSchema  = z.object({
    id : z.number().optional(),
    name: z.string().min(4),
    value: z.number(),
    dateExpiration: z.coerce.date(),
    installment: z.string().regex(/^(\d+)\/(\d+)$/, 'Invalid installment format'),
    description: z.string(),
    status: z.enum(["pending", "done", "late"]),
    tags: z.string().array()
})



export class CreateExpensesRequestDTO extends Dto<typeof CreateExpensesSchema> 
// implements z.infer<typeof CreateExpensesSchema>
 {
    
    // id?: number | undefined
    // name: string
    // value: number
    // dateExpiration: Date
    // installment: string
    // description: string
    // status: "pending" | "done" | "late"
    // tags: string[]

    protected rules() {
        return CreateExpensesSchema
    }
    
}
