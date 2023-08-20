const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/CategoryController');

router.post('/create', CategoryController.createACategory);
router.get('/allCategories', CategoryController.allCategories)
module.exports = router