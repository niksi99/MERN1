const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController');

router.post('/create', ProductController.createAProduct);

router.get('/allProducts', ProductController.allProducts)

module.exports = router