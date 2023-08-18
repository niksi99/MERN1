const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please enter the product name'],
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please enter the product descrpition'],
        maxlength: 280
    },
    prise: {
        type: Number,
        trim: true,
        required: [true, 'Please enter the product prise.']
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: [true, 'Product has its category!']
    },
    image: {
        type: String,
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Product', projectSchema);