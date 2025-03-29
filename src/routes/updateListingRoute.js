import { db } from "../database";
import * as admin from 'firebase-admin';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        if (!token) {
            throw Boom.unauthorized("Missing authentication token.");
        }
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.uid;
        const id = req.params.id
        const { name ,description ,price } = req.payload;        

        await db.query(`
            UPDATE listings
                SET name=?, description=?, price=?
                WHERE id=? AND user_id=?
            `,
            [name, description, price, id, userId]
            
        );
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?',
            [id, userId],
        )
        return results[0]
    }
}