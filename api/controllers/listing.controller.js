import createHttpError from "http-errors";
import Listing from "../models/listing.model.js";

export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if(!listing) throw createHttpError(404, 'Listing not found!');

        if(req.user.id !== listing.userRef) throw createHttpError(401, 'You can only delete your own listings!');

        await Listing.findByIdAndDelete(req.params.id);

        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) throw createHttpError(404, 'Listing not found!');
        if(req.user.id !== listing.userRef) throw createHttpError(401, 'You can only update your own listings!');
        const updateListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) throw createHttpError(404, 'Listing not found!');

        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};