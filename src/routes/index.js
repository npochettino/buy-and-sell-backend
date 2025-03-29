import { addViewToListingRoute } from "./addViewToListing";
import { createNewListingRoute } from "./createNewListings";
import { deleteListingRoute } from "./deleteListing";
import { getAllListingRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { getUserListingsRoute } from "./getUSerListings";
import { updateListingRoute } from "./updateListingRoute";

export default [
    getAllListingRoute,
    getListingRoute,
    addViewToListingRoute,
    getUserListingsRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute
]