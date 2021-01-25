const asyncHandler = require('express-async-handler')
const Product = require('../models/Product')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
	try {
		const pageSize = 10
		const page = Number(req.query.pageNumber) || 1

		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: 'i',
					},
			  }
			: {}

		const count = await Product.countDocuments({ ...keyword })
		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1))

		res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)

		if (product) {
			res.status(200).json(product)
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)

		if (product) {
			await product.remove()
			res.json({ message: 'Product removed' })
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
	try {
		const product = new Product({
			name: 'Sample name',
			price: 0,
			user: req.user._id,
			image: '/images/sample.jpg',
			brand: 'Sample brand',
			category: 'Sample category',
			countInStock: 0,
			numReviews: 0,
			description: 'Sample description',
		})

		const createdProduct = await product.save()
		res.status(201).json(createdProduct)
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
	try {
		const {
			name,
			price,
			description,
			image,
			brand,
			category,
			countInStock,
		} = req.body

		const product = await Product.findById(req.params.id)

		if (product) {
			product.name = name
			product.price = price
			product.description = description
			product.image = image
			product.brand = brand
			product.category = category
			product.countInStock = countInStock

			const updatedProduct = await product.save()
			res.json(updatedProduct)
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
	try {
		const { rating, comment } = req.body

		const product = await Product.findById(req.params.id)

		if (product) {
			const alreadyReviewed = product.reviews.find(
				r => r.user.toString() === req.user._id.toString()
			)

			if (alreadyReviewed) {
				res.status(400)
				throw new Error('Product already reviewed')
			}

			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			}

			product.reviews.push(review)

			product.numReviews = product.reviews.length

			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length

			await product.save()
			res.status(201).json({ message: 'Review added' })
		}
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3)

		res.status(200).json(products)
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})