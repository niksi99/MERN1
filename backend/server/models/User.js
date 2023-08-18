const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter the name'],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter the e-mail'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Password must have at least 8 characters'],
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePasswords = async function (hashedPassword) {
    return await bcrypt.compare(hashedPassword, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.SECRET_JWT,
        { expiresIn: 900} // 15mins
    )
}

module.exports = mongoose.model('User', userSchema);