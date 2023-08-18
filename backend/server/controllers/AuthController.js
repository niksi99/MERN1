const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.signup = async (req, res, next) => {
    
    const thatUser = await User.findOne({email: req.body.email})
    
    // if(thatUser) {
    //     return res.status(400).json({
    //         succes: false,
    //         message: 'User already exists'
    //     })
    // }

    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            succes: true,
            user: newUser
        })
    }
    catch(error) {
        next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return next(new ErrorResponse(400, `Email or Password dont exist`));
        }

        const thatUser = await User.findOne({email})
    
        if(!thatUser) {
            return next(new ErrorResponse(400, `User doesnt exist`));
        }

        const isMatchedPassword = await thatUser.comparePasswords(password)
        if(!isMatchedPassword) {
            return next(new ErrorResponse(400, `Wrong password! Please, enter valid one`));
        }

        generateCookieByToken(thatUser, 200, res);
    }
    catch(error) {
        // res.status(400).json({
        //     succes: false,
        //     message: error.message
        // })
        return next(new ErrorResponse(400, `Invalid credentials`));
    }
}

module.exports.logout = (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.getAUser = async (req, res, next) => {
    try {
        const aUser = await User.findById(req.params.id);
        res.status(200).json({
            succes: true,
            aUser
        })
    }
    catch(error) {
        next(error);
    }
}

exports.getUserProfile = async(req, res, next) => {
    try {
        const thisUser = await User.findById(req.user.id);
        res.status(200).json({
            succes: true,
            thisUser
        })
    }
    catch(error) {
        next(error);
    }
}

const generateCookieByToken = async (user, statusCode, res) => {
    
    const token = await user.generateJWT();
    const cookieOptions = {
        httpOnly: true,
        expiresIn: new Date(Date.now() + process.env.EXPIRE_JWT)
    }
    res.status(statusCode)
       .cookie('token', token, cookieOptions)
       .json({success: true, token})
        
}

