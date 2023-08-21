const Product = require('../models/Product');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports.createAProduct = async(req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            newProduct
        })
    }
    catch(error) {
        console.log(error)
        next(error)
    }
}

module.exports.allProducts = async(req, res, next) => {

    //pagonation
    const pageSize = 2
    const page = Number[req.query.pageNumber] || 1
    const count = await Product.find({}).estimatedDocumentCount();
    console.log(``)
    try {
        const products = await Product.find()
                                      .populate('category')
                                      .skip(pageSize * (page-1))
                                      .limit(pageSize);
        res.status(200).json({
            success: true,
            products,
            page,
            pages: Math.ceil(count / pageSize)
        })
    }
    catch(error) {
        console.log(error)
        next(error)
    }
}