import Boom from "@hapi/boom";
import { db } from "../database";

export const getListingRoute = {
    method: 'GET',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const { id } = req.params;

        const { results } = await db.query(
            'SELECT * FROM listings WHERE id = ?',
            [id]
        );

        if (results.length > 0) {
            return results[0];
        } else {
            return h.response({ message: 'Listing not found' }).code(404);
        }
    }
}