const {logger} = require('./logger');

// class for handle the error
class errorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

// middle ware to store the error log or throw the error
const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof errorHandler){
        logger.log({
            level: 'error',
            timestamp: new Date().toString(),
            "request URL": req.url,
            "error message": err.message
        });
        return res.status(err.statusCode).json({status: false, msg: err.message})
    }
    return res
        .status(500)
        .send("Oops! Something went wrong... Please try again later!");
}

module.exports = {errorHandler, errorHandlerMiddleware}