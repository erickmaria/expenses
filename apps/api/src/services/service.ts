import { Repository } from "../domain/repositories/repository";

export interface IService<T> {
    execute(data?: T): Promise<T | T[] | Error>
}

export abstract class Service<T , R extends Repository<T>> implements IService<T> {
    
    constructor(protected readonly repository: R ) {}
    
    abstract execute(data?: T): Promise<T  | T[] | Error>;
}