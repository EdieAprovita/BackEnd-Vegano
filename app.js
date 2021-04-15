require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const colors = require('colors')

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(x =>
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`.cyan.underline
		)
	)
	.catch(err => console.error('Error connecting to mongo'.red.bold, err))

const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use(
	cors({
		credentials: true,
		origin: [process.env.FRONTENDPOINT],
	})
)

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger('dev'))

const user = require('./routes/userRoutes')
app.use('/api/users', user)

const order = require('./routes/orderRoutes')
app.use('/api/orders', order)

const product = require('./routes/productRoutes')
app.use('/api/products', product)

const index = require('./routes/index')
app.use('/', index)

const upload = require('./routes/uploadRoutes')
app.use('/api/upload', upload)

const { notFound, errorHandler } = require('./middleware/errorMiddleware')
app.use(notFound)
app.use(errorHandler)

/* app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
 */
module.exports = app
