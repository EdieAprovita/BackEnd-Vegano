const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchena = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Please write de user'],
			ref: 'User',
		},

		orderItems: [
			{
				name: {
					type: String,
					required: [true, 'Add the name item'],
				},

				qty: {
					type: Number,
					required: [true, 'Please add the quantity'],
				},

				image: {
					type: String,
					required: [true, 'Add and image'],
				},

				price: {
					type: Number,
					required: [true, 'Add the price'],
				},

				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: [true, 'Add the product'],
					ref: 'Product',
				},
			},
		],

		shippingAddress: {
			address: {
				type: String,
				required: [true, 'Add the address'],
			},

			city: {
				type: String,
				required: [true, 'Add a city'],
			},

			postalCode: {
				type: String,
				required: [true, 'Add the postal code'],
			},

			country: {
				type: String,
				required: [true, 'Add the country'],
			},
		},

		paymentResult: {
			id: {
				type: String,
			},

			status: {
				type: String,
			},

			update_time: {
				type: String,
			},

			email_address: {
				type: String,
			},

			taxPrice: {
				type: Number,
				required: [true, 'Add the tax price'],
				default: 0.0,
			},

			shippingPrice: {
				type: Number,
				required: [true, 'Add the shipping price'],
				default: 0.0,
			},

			totalPrice: {
				type: Number,
				required: [true, 'Add the total price'],
				default: 0.0,
			},

			isPaid: {
				type: Boolean,
				required: [true, 'Add the status payment'],
				default: false,
			},

			paidAt: {
				type: Date,
			},

			isDelivered: {
				type: Boolean,
				required: [true, 'Add the status delivery'],
				default: false,
			},

			deliveredAt: {
				type: Date,
			},
		},
	},
	{
		timestamps: true,
	},
)

const Order = mongoose.model('Order', orderSchena)

module.exports = Order
