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
} = orderService
const { validateId, validateUserId, validateCity } = validationMiddleware

const postOrder = async (req, res, next) => {
	const order = req.body.order
	const content = req.body.order_content
	const userId = req.userId

	console.log("Content: ",content)
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
	const userId = req.params.id
	try {
		let validate
		await validateUserId(userId).then((result) => {
			validate = result
		})
		if (validate != null) {
			await readUserOrders(userId).then((orders) => {
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

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		let validate
		await validateId(id, 'order').then((result) => {
			validate = result
		})
		if (validate != null) {
			await getOrderById(id).then((order) => {
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

const getByCity = async (req, res, next) => {
	const city = req.params.city
	try {
		let validate
		await validateCity(city).then((result) => {
			validate = result
		})
		if (validate != null) {
			await getOrderByCity(city).then((order) => {
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

const getAll = async (req, res, next) => {
	try {
		await getAllOrders().then((orders) => {
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
		let validate
		await validateId(id, 'order').then((result) => {
			validate = result
		})
		if (validate != null) {
			let manage = await manageInventory(id)
			if(manage == true){
				res.sendStatus(200)
				next()
			} else {
				res.sendStatus(404)
				next()
			}
		} else {
			res.sendStatus(404) && next()
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
}
