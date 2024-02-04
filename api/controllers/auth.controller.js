import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try{
        const {
            username,
            email,
            password,
        } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User saved successfully"});
    }catch(error){
        next(error)
    }
}

export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) throw createHttpError(404, 'User not found');
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) throw createHttpError(401, 'Wrong credentials!!');
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const {email, name, photo} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User(
                {
                    username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4), 
                    email, 
                    password: hashedPassword,
                    avatar: photo,
                }
            );
            await newUser.save();
            user = await User.findOne({email});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest} = user._doc;
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}