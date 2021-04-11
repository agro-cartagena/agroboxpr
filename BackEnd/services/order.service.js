const { orderDb } = require('../db')

const {
	createOrderDb,
	readAllOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	deleteOrderDb,
} = orderDb

const createOrder = async (order) => {
	try {
		await createOrderDb(order)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readAllOrders = async () => {
	try {
		await readAllOrdersDb()
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

const updateOrder = async (id) => {
	try {
		await updateOrderDb()
	} catch (e) {
		throw new Error(e.message)
	}
}

const deleteOrder = async (id) => {
	try {
		await deleteOrderDb()
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createOrder,
	readAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
}
