const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/mdb')
const engines = require('consolidate')

const {
	authRouter,
	productRouter,
	boxRouter,
	orderRouter,
	orderContentRouter
} = require('./routes')

const paymentRouter = require('./routes/payment')
const geocodingRouter = require('./routes/geocoding')
const imageRouter = require('./routes/upload')

//Get environment variables
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.engine('ejs', engines.ejs)
app.set('views', './views')
app.set('view engine', 'ejs')

//Use Express Routers
app.use('/api/product', productRouter)
app.use('/api/box', boxRouter)
app.use('/api/auth', authRouter)
app.use('/api/order', orderRouter)
app.use('/api/content', orderContentRouter) // only to be used for testing build
app.use('/api/payment', paymentRouter)
app.use('/api/geocoder', geocodingRouter)
app.use('/api/image', imageRouter)


module.exports = app
