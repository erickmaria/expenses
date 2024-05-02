import {ZodError, ZodType, z } from "zod";

export abstract class Dto<T extends ZodType> {

    private data: z.infer<T>

    public constructor (data: Record<string, unknown>){
        this.validate(data)
    }

    protected abstract rules(): T ;

    // public get<K extends z.infer<T>>(key: K){
    //     return this.data[key]
    // }

    public getData(): z.infer<T>{
        return this.data;
    }  

    private validate(data: Record<string, unknown>){
        
        try {
            this.data = this.rules().parse(data)
        } catch (error) {
            if (error instanceof ZodError){
                throw error
            }
        }

    }

} 