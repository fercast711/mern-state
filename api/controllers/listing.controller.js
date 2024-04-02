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

export const getListings = async(req, res, next) => {
    try {
        
        const limit = parseInt(req.query.limit) || 4;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if(offer === undefined || offer === 'false') {
            offer = {$in: [false, true]}
        }

        let furnished = req.query.furnished;

        if( furnished === undefined || furnished === 'false') {
            furnished = {$in: [true, false]}
        }

        let parking = req.query.parking;

        if( parking === undefined || parking === 'false') {
            parking = {$in: [false, true]}
        }

        let type = req.query.type;

        if( type === undefined || type === 'all' ) {
            type = {$in: ['rent', 'sale']}
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: {$regex: searchTerm, $options: 'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort({
            [sort]: order
        })
        .limit(limit).skip(startIndex);
        res.status(200).json(listings);
    } catch (error) {
        next(error)
    }
}