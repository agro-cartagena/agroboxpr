const { orderDb } = require('../db')

const {
	createOrderDb,
	readUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
} = orderDb

const createOrder = async (order) => {
	try {
		await createOrderDb(order)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readUserOrders = async (userId) => {
	try {
		return await readUserOrdersDb(userId)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderById = async (id) => {
	try {
		return await getOrderByIdDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateOrder = async (id, changes) => {
	try {
		return await updateOrderDb(id, changes)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderByCity = async (municipality) => {
	try {
		return await getOrderByCityDb(municipality)
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByCity,
	updateOrder,
}
