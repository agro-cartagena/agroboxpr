const { orderDb } = require('../db')

const {
	createOrderDb,
	readUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByMunicipalityDb,
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
		await readUserOrdersDb(userId)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderById = async (id) => {
	try {
		await getOrderByIdDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateOrder = async (id, changes) => {
	try {
		await updateOrderDb(id, changes)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderByMunicipality = async (municipality) => {
	try {
		await getOrderByMunicipalityDb(municipality)
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
