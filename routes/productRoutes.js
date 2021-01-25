const router = require('express').Router()

const {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} = require('../controllers/productControllers')

const { protect, admin } = require('../middleware/authMiddleware')

//CRUD PRODUCTS

router.get('/', getProducts)
router.get('/top', getTopProducts)
router.get('/:id', getProductById)
router.post('/create', (protect, admin, createProduct))
router.post('/:id/reviews', (protect, createProductReview))
router.put('/edit/:id', (protect, admin, updateProduct))
router.delete('/delete/:id', (protect, admin, deleteProduct))

module.exports = router
