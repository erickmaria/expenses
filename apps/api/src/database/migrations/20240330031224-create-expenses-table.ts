import { IDatabaseMigration } from "../database"
import PostgresClient  from "../drivers/postgres"

export const createExpensesTablemigration: IDatabaseMigration<typeof PostgresClient> = {

  db: PostgresClient,

  async up(): Promise<void> {

    console.log("[INFO][MIRATION][UP][BEGIN] create-expenses-table")

    try {   

      await this.db.client?.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expenses_status') THEN
            CREATE TYPE expenses_status AS ENUM ('pending', 'done', 'late');
          END IF;
        END $$;
        
        CREATE TABLE IF NOT EXISTS expenses (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          value NUMERIC NOT NULL,
          date_expiration DATE NOT NULL,
          installment VARCHAR(50),
          description TEXT,
          status EXPENSES_STATUS,
          tags TEXT[],
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

      console.log("[INFO][MIRATION][UP][END] create-expenses-table")


    }catch(err){
      console.error(err)
    }
        
  },

  async down(): Promise<void> {

    console.log("[INFO][MIRATION][DOWN][BEGIN] create-expenses-table")

    try{

      await this.db.client?.query(`
        DROP TABLE IF EXISTS expenses;

        DO $$ 
        BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expenses_status') THEN
          RAISE NOTICE 'Type dropped successfully.';
          DROP TYPE expenses_status;
          END IF;
        END $$;
      `)

      console.log("[INFO][MIRATION][DOWN][END] create-expenses-table")

    }catch(err){
      console.error(err)
    }
  }
}