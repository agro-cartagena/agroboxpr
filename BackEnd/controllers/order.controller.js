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
		const get = await readUserOrders(userId)
		if (get != null) {
			res.sendStatus(200)
			next()
		} else {
			res.sendStatus(404)
			next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		const get = await getOrderById(id)
		if (get != null) {
			res.sendStatus(200)
			next()
		} else {
			res.sendStatus(404)
			next()
		}
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
		const update = await updateOrder(id)
		if (update != null) {
			res.sendStatus(200)
			next()
		} else {
			res.sendStatus(404)
			next()
		}
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
