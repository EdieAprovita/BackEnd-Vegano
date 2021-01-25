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

authroutes.get('/', (protect, getUsers))
authroutes.get('/profile', (protect, getUserProfile))
authroutes.get('/:id', (protect, getUserById))
authroutes.post('/', registerUser)
authroutes.post('/login', authUser)
authroutes.put('/profile', (protect, updateUserProfile))
authroutes.put('/:id', (protect, updateUser))
authroutes.delete('/:id', (protect, deleteUser))
module.exports = authroutes
