const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController');
const { isAuthenticated, isAdminRole } = require('../middleware/Auth');

router.post('/create', isAuthenticated, isAdminRole, ProductController.createAProduct);

router.get('/allProducts', ProductController.allProducts)

module.exports = router