const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/CategoryController');

router.post('/create', CategoryController.createACategory);

module.exports = router