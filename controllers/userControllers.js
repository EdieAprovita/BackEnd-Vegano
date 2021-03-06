const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error({ message: `${Error}` })
	}
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, password } = req.body

		const userExists = await User.findOne({ email })

		if (userExists) {
			res.status(400)
			throw new Error('User already exists')
		}

		const user = await User.create({
			name,
			email,
			password,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			})
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			})
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id)

		if (user) {
			user.name = req.body.name || user.name
			user.email = req.body.email || user.email
			if (req.body.password) {
				user.password = req.body.password
			}

			const updatedUser = await user.save()

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser._id),
			})
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		if (user) {
			await user.remove()
			res.json({ message: 'User removed' })
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password')

		if (user) {
			res.json(user)
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		if (user) {
			user.name = req.body.name || user.name
			user.email = req.body.email || user.email
			user.isAdmin = req.body.isAdmin

			const updatedUser = await user.save()

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			})
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})
