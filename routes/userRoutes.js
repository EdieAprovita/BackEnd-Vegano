const authroutes = require('express').Router()

const {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} = require('../controllers/userControllers')

const { protect, admin } = require('../middleware/authMiddleware')

//USER ROUTES

authroutes.get('/', (protect, admin, getUsers))
authroutes.get('/profile', (protect, getUserProfile))
authroutes.get('/:id', (protect, admin, getUserById))
authroutes.post('/', registerUser)
authroutes.post('/login', authUser)
authroutes.put('/profile', (protect, admin, updateUserProfile))
authroutes.put('/:id', (protect, updateUser))
authroutes.delete('/:id', (protect, admin, deleteUser))
module.exports = authroutes
