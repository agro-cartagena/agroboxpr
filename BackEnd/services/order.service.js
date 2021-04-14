const { orderDb } = require('../db')
const { validationMiddleware } = require('../middleware')

const {
	createOrderDb,
	readUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByMunicipalityDb,
} = orderDb

const { validateId, validateUserId } = validationMiddleware

const createOrder = async (order) => {
	try {
		await createOrderDb(order)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readUserOrders = async (userId) => {
	try {
		let validate
		await validateUserId(userId).then((result) => {
			validate = result
		})
		if (validate != null) {
			return await readUserOrdersDb(userId)
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderById = async (id) => {
	try {
		let validate
		await validateId(id, 'order').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await getOrderByIdDb(id)
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateOrder = async (id, changes) => {
	try {
		let validate
		await validateId(id, 'order').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await updateOrderDb(id, changes)
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderByMunicipality = async (municipality) => {
	try {
		return await getOrderByMunicipalityDb(municipality)
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByMunicipality,
	updateOrder,
}
