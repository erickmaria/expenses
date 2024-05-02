import db from '../../database/drivers/postgres.js';
import { createExpensesTablemigration } from '../../database/migrations/20240330031224-create-expenses-table.js';

const migrationUp = async () => {
    await db.connect()

    createExpensesTablemigration.up()

    db.client?.release()
}

migrationUp()