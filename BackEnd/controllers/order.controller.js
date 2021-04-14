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
		await readUserOrders(userId).then((orders)=> {
			res.status(200).send(orders)
			next()
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		await getOrderById(id).then((order) => {
			res.status(200).send(order)
			next()
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getByMunicipality = async (req, res, next) => {
	const municipality = req.params.municipality
	try {
		await getOrderByMunicipality(municipality).then((order) => {
			res.status(200).send(order)
			next()
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const update = async (req, res, next) => {
	const id = req.params.id
	const change = req.body
	try {
		const update = await updateOrder(id, change)
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
