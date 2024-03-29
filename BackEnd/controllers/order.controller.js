const { orderService } = require('../services')
const { validationMiddleware } = require('../middleware')

const {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByCity,
	updateOrder,
	getAllOrders,
	manageInventory,
	getOrderByStatus,
} = orderService
const { validateId, validateUserId, validateCity } = validationMiddleware

const postOrder = async (req, res, next) => {
	const order = req.body.order
	const content = req.body.order_content
	const userId = req.userId

	try {
		await createOrder(order, content, userId)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getUserOrders = async (req, res, next) => {
	const userId = req.userId
	try {
		let validate
		await validateUserId(userId).then((result) => {
			validate = result
		})
		if (validate != null) {
			await readUserOrders(userId).then((orders) => {
				if (!orders.hasOwnProperty('Pendiente')) orders['Pendiente'] = []
				if (!orders.hasOwnProperty('En Camino')) orders['En Camino'] = []
				if (!orders.hasOwnProperty('Completada')) orders['Completada'] = []
				res.status(200).send(orders)
				next()
			})
		} else {
			const orders = {
				"Pendiente": [],
				"En Camino": [],
				"Completada": []
			}

			res.status(200).send(orders) && next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		let validate
		await validateId(id, 'order').then((result) => {
			validate = result
		})
		if (validate != null) {
			await getOrderById(id).then((orders) => {
				// if (!orders.hasOwnProperty('Pendiente')) orders['Pendiente'] = []
				// if (!orders.hasOwnProperty('En Camino')) orders['En Camino'] = []
				// if (!orders.hasOwnProperty('Completada')) orders['Completada'] = []
				res.status(200).send(orders)
				next()
			})
		} else {
			res.sendStatus(404) && next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getByCity = async (req, res, next) => {
	const city = req.params.city
	try {
		let validate
		await validateCity(city).then((result) => {
			validate = result
		})
		if (validate != null) {
			await getOrderByCity(city).then((order) => {
				if (!orders.hasOwnProperty('Pendiente')) orders['Pendiente'] = []
				if (!orders.hasOwnProperty('En Camino')) orders['En Camino'] = []
				if (!orders.hasOwnProperty('Completada')) orders['Completada'] = []
				res.status(200).send(order)
				next()
			})
		} else {
			res.sendStatus(404) && next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getByStatus = async (req, res, next) => {
	try {
		await getOrderByStatus().then((orders) => {
			res.status(200).send(orders)
			next()
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getAll = async (req, res, next) => {
	try {
		await getAllOrders().then((orders) => {
			if (!orders.hasOwnProperty('Pendiente')) orders['Pendiente'] = []
			if (!orders.hasOwnProperty('En Camino')) orders['En Camino'] = []
			if (!orders.hasOwnProperty('Completada')) orders['Completada'] = []
			res.status(200).send(orders)
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

const manage = async (req, res, next) => {
	const id = req.params.id
	try {
		let validate, response
		await validateId(id, 'order').then((result) => {
			validate = result
		})

		if (validate != null) {
			await manageInventory(id).then((result) => {
				response = result
				if (response == true) {
					res.status(200).send(response)
					next()
				} else {
					res.sendStatus(404) && next()
				}
			})
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(404) && next(e)
	}
}

module.exports = {
	postOrder,
	getById,
	getUserOrders,
	getByCity,
	update,
	getAll,
	manage,
	getByStatus,
}
