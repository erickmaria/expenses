import { IDatabaseMigration } from "../database"
import PostgresClient  from "../drivers/postgres"

export const createExpensesTablemigration: IDatabaseMigration<typeof PostgresClient> = {

  db: PostgresClient,

  async up(): Promise<void> {

    console.log("[INFO][MIRATION][UP][BEGIN] ${i}")

    try {   

      await this.db.client?.query(`YOUR SQL`)

      console.log("[INFO][MIRATION][UP][END] ${i}")


    }catch(err){
      console.error(err)
    }
        
  },

  async down(): Promise<void> {

    console.log("[INFO][MIRATION][DOWN][BEGIN] ${i}")

    try{

      await this.db.client?.query(`YOUR SQL`)

      console.log("[INFO][MIRATION][DOWN][END] ${i}")

    }catch(err){
      console.error(err)
    }
  }
}