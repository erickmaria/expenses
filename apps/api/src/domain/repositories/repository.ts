import db from '../../database/drivers/postgres';


export interface ICreateRepository<T> {
    create(obj: T): Promise<T[]>
}

export interface IGetAllRepository<T> {
    getAll(): Promise<T[]>
}

export interface IGetByIDRepository<T> {
    getById(id: unknown): Promise<T | Error>
}

export interface IUpdateRepository<T> {
    update(obj: T): Promise<T | Error>
}

export interface IDeleteRepository<T> {
    delete(id: unknown): Promise<T | Error>
}

export abstract class Repository<T> {
    
    protected tableName: string

    constructor(tableName: string) {
        this.tableName = tableName
    }

    protected async query<T>(queryText: string, params?: any[]): Promise<T[] | undefined | Error > {
        try {
            const result = await db.client?.query(queryText, params);
            return result?.rows;
        }catch(err){
            throw err
        }
    }

}

export abstract class CreateRepository<T extends Object> extends Repository<T> implements ICreateRepository<T> {
    
    async create(data: T): Promise<T[]> {
        try{

            const keys = Object.keys(data).map((key) => {
                return key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
            })

            const values = Object.values(data);
            const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
            const queryText = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result =  await this.query<T>(queryText, values)

            if (result == undefined) {
                return [] as T[]
            }

            const parsedResult = (result as T[] ).map(item => {
                const newItem: any = {};
                Object.keys(item).forEach(key => {
                    // @ts-expect-error
                    newItem[key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())] = item[key];
                });
                return newItem as T;
            });

            return parsedResult

        }catch(err){
            throw err
        }
    }

}


export abstract class GetAllRepository<T extends Object> extends Repository<T> implements IGetAllRepository<T> {
    
    async getAll(): Promise<T[]> {
        
        const queryText = `SELECT * FROM ${this.tableName}`;
        
        try{
            const result = await this.query<T>(queryText);

            if (result == undefined) {
                return [] as T[]
            }


            const parseResult = (result as T[] ).map(item => {
                const newItem: any = {};
                Object.keys(item).forEach(key => {
                    // @ts-expect-error
                    newItem[key.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase())] = item[key];
                });
                return newItem as T;
            });

            return parseResult

        }catch(err){
            throw err
        }
    }

}