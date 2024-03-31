import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    try {
        if(!token){
            throw createHttpError(401, 'Unauthorized');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) throw createHttpError(403, 'Forbidden')
            req.user = data;
            next();
        })
    } catch (error) {
        next(error);
    }
}