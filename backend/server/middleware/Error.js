const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {

    //console.log(err)
    let error = {...err}
    error.message = err.message;

    //Mongoose Bad Object Id:
    if(err.name === 'CastError') {
        const message = 'Object not found'
        error = new ErrorResponse(404, message)
    }

    //Mongoose Duplicate Email
    if(err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(400, message);
    }

    //Validate error - Not entered password
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(400, message)
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

module.exports = errorHandler