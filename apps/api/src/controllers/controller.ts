import { IService } from "../services/service";

export interface ResponseError {
    name: string
    message: unknown
    stack?: unknown | undefined
}

export interface IHttpResponse<T> {
    statusCode: number
    body: T | T[] | ResponseError
}

export interface IHttpRequest<T> {
    params?: any;
    headers?: any
    body?: T;
}

export interface IController {
    handle(httpRequest?: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>;
}

export abstract class Controller<T>  implements IController {
    
    constructor(protected readonly service: IService<T> ) {}
    
    abstract handle(httpRequest?: IHttpRequest<unknown> | undefined): Promise<IHttpResponse<unknown>>;
    
}