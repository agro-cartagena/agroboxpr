const { orderService } = require('../services')

const {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByMunicipality,
	updateOrder,
} = orderService

const postOrder = async (req, res, next) => {
	const order = req.body
	try {
		await createOrder(order)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getUserOrders = async (req, res, next) => {
	const userId = req.params.id
	try {
		await readUserOrders(userId)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		await getOrderById(id)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getByMunicipality = async (req, res, next) => {
	const municipality = req.params.getByMunicipality
	try {
		await getOrderByMunicipality(municipality)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const update = async (req, res, next) => {
	const id = req.params.id
	try {
		await updateOrder(id)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postOrder,
	getById,
	getUserOrders,
	getByMunicipality,
	update,
}
