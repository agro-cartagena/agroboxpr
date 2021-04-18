const { orderDb, orderContentDb } = require('../db')

const {
	createOrderDb,
	getAllUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
	readAllOrdersDb,
} = orderDb
const {createOrderContentDb, updateOderContentDb} = orderContentDb

const createOrder = async (order) => {
	try {
		let order_id, content_id
		await createOrderDb(order).then((orderId) => {
			order_id = orderId
		})
		await createOrderContentDb(order).then((contentId) => {
			content_id = contentId
		})
		await updateOrderDb(order_id, {"order_Content":content_id})
		await updateOderContentDb(content_id, {"order_id": order_id})
	} catch (e) {
		throw new Error(e.message)
	}
}

const readUserOrders = async (userId) => {
	try {
		return await getAllUserOrdersDb(userId)
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

const getAllOrders = async () => {
	try {
		return await readAllOrdersDb()
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
	getAllOrders,
}
