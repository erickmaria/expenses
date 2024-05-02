import db from '../../database/drivers/postgres.js';
import { createExpensesTablemigration } from '../../database/migrations/20240330031224-create-expenses-table.js';

const migrationDown = async () => {
    await db.connect()

    createExpensesTablemigration.down()

    db.client?.release()
}

migrationDown()