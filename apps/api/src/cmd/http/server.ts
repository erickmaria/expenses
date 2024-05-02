
import app from '../../app.js';
import db from '../../database/drivers/postgres';

const PORT = process.env.PORT || 3000;

const main =  async () => {

    await db.connect()

    app.listen(PORT, () => {
        console.log(`[INFO][Server] listening on port ${PORT}`);
    });
}

main()
