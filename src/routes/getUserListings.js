import { db } from "../database";
import Boom from "@hapi/boom";
import * as admin from 'firebase-admin';

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        try {
            const token = req.headers.authtoken;
            if (!token) {
                throw Boom.unauthorized("Missing authentication token.");
            }

            const user = await admin.auth().verifyIdToken(token);
            const userId = req.params.userId;

            if (user.uid !== userId) {
                throw Boom.unauthorized("Users can only access their own listings.");
            }

            const { results }  = await db.query(
                'SELECT * FROM `buy-and-sell`.listings WHERE user_id = ?',
                [userId]
            );

            return results;
        } catch (err) {
            console.error("Error fetching user listings:", err);
            throw Boom.badImplementation("Internal Server Error");
        }
    }
}