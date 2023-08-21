const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

exports.isAuthenticated = async (req, res, next) => {
 
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorResponse(401, "You must log in in order to access this resourse"))
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT)
        
        //verify token
        req.user = await User.findById(decodedToken.id)
        console.log(req.user)
        next();
        
        if(!req.user) {
            return next(new ErrorResponse(401, "Invalid req.user - User with this token not found"))
        }
    }
    catch(error) {
        return next(new ErrorResponse(400), error.message)
    }
}

exports.isAdminRole = (req, res, next) => {
    if(req.user.role === 0) {
        return next(new ErrorResponse(401, "You mush be an Admin"));
    }
    next();
}