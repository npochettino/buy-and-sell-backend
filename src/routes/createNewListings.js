import { db } from "../database";
import { v4 as uuid } from "uuid";
import * as admin from 'firebase-admin';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        try {
            const token = req.headers.authtoken;
            if (!token) {
                throw Boom.unauthorized("Missing authentication token.");
            }

            const user = await admin.auth().verifyIdToken(token);
            const userId = user.uid;

            const { name = '', description = '', price = 0 } = req.payload || {};
            if (typeof name !== "string" || typeof description !== "string" || typeof price !== "number") {
                throw Boom.badRequest("Invalid input data.");
            }

            const id = uuid();
            const views = 0;

            await db.query(
                `INSERT INTO listings (id, name, description, price, user_id, views)
                 VALUES (?, ?, ?, ?, ?, ?);`,
                [id, name.trim(), description.trim(), price, userId, views]
            );

            return h.response({ id, name, description, price, userId, views }).code(201);
        } catch (err) {
            console.error("Error creating new listing:", err);
            throw Boom.badImplementation("Internal Server Error");
        }
    }
}