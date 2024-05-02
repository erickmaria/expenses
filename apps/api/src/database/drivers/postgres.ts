import { Pool, PoolClient } from 'pg';
import { IDatabaseClient } from '../database';
import { env } from '../../env';

const PostgresClient: IDatabaseClient<PoolClient> = {
    client: undefined as unknown as PoolClient,
    
    async connect(): Promise<void> {
        const pool = new Pool({
            connectionString: env.DATABASE_CONNECTION_STRING,
            max: 10
        })

        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        })

        const client =  await pool.connect().catch((err) => {
            console.error("[ERROR][Postgres] " + err)
            process.exit(-1)
        })


        console.log("[INFO][Postgres] connection established with Postgres!")

        this.client = client
    },

};

export default PostgresClient