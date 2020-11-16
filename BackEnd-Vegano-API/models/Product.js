const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},

		rating: {
			type: Number,
			required: [true, 'Please add a rating'],
		},

		comment: {
			type: String,
			required: [true, 'Please write a comment'],
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please add a user'],
		},
	},
	{
		timestamps: true,
	},
)

const productSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		name: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},

		brand: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		reviews: [reviewSchema],

		rating: {
			type: Number,
			required: [true, 'Please add the rating'],
			default: 0,
		},

		numReviews: {
			type: Number,
			required: [true, 'Please add the number reviews'],
			default: 0,
		},

		price: {
			type: Number,
			required: [true, 'Please add the price'],
			default: 0,
		},

		countInStock: {
			type: Number,
			required: [true, 'Please add the stock number'],
			default: 0,
		},
	},

	{
		timestamps: true,
	},
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
