const router = require('express').Router()

const {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
} = require('../controllers/orderControllers')

const { protect, admin } = require('../middleware/authMiddleware')

//CRUD ORDERS

router.get('/', (protect, admin, getOrders))
router.get('/myorders', (protect, getMyOrders))
router.get('/:id', (protect, getOrderById))
router.post('/', (protect, addOrderItems))
router.put('/:id/pay', (protect, updateOrderToPaid))
router.put('/:id/deliver', (protect, admin, updateOrderToDelivered))

module.exports = router
