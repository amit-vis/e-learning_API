module.exports.invalidRoutesHandlerMiddleware = (req, res, next)=>{
    res
        .status(404)
        .json({success: false, msg: `Invalid Path: ${req.originalUrl}`});
    next();
};