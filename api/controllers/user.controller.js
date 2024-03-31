import createHttpError from "http-errors"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        message: "Hello world"
    })
}

export const updateUser = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) throw createHttpError(401, 'You can only modify your account')

        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        if(req.user.id !== req.params.id) throw createHttpError(401, 'You can only delete your own account')
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token').status(200).json({message: 'User has been deleted'});
    } catch (error) {
        next(error);
    }
}

export const getUserListings = async(req, res, next) =>{
    try {
        if(req.user.id !== req.params.id) throw createHttpError(401, 'You can only view your own listings')
        const listings = await Listing.find({userRef: req.params.id})
        res.status(200).json(listings)
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw createHttpError(404, 'User not found')
        
        const {password, ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};