const Category = require('../models/Category');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.createACategory = async(req, res, next) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            success: true,
            newCategory
        })
    }
    catch(error) {
        console.log(error)
        next(error)
    }
}

module.exports.allCategories = async(req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        })
    }
    catch(error) {
        console.log(error)
        next(error)
    }
}
