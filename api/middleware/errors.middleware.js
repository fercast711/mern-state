export const errorHandler = (err, req, res, next) => {
    let errMsg = err.message || "An error occurred"
    let errCode =  err.statusCode || 500

    res.status(errCode).json({
        message: errMsg,
        success: false,
        code: errCode
    })
}