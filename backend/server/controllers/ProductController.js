const Product = require('../models/Product');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.createAProduct = async(req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json({
            success: true,
            newProduct
        })
    }
    catch(error) {
        console.log(error)
        next(error)
    }
}