const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
	{
		name: {
			type: String,
			require: [true, 'Please write a name'],
			unique: [true, 'This name already exist'],
		},

		email: {
			type: String,
			require: [true, 'Please write a email'],
			unique: [true, 'This email is already in use'],
		},

		password: {
			type: String,
			require: true,
		},

		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
module.exports = User
