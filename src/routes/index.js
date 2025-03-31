import { addViewToListingRoute } from "./addViewToListing";
import { createNewListingRoute } from "./createNewListings";
import { deleteListingRoute } from "./deleteListing";
import { filesRoutes, staticFilesRoute } from "./files";
import { getAllListingRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { getUserListingsRoute } from "./getUserListings";
import { updateListingRoute } from "./updateListingRoute";

export default [
    getAllListingRoute,
    getListingRoute,
    addViewToListingRoute,
    getUserListingsRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute,
    staticFilesRoute,
    ...filesRoutes
]