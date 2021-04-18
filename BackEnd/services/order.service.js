const { orderDb, orderContentDb, productDb } = require('../db')

const {
	createOrderDb,
	getAllUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
	readAllOrdersDb,
} = orderDb

const { createOrderContentDb, getOrderContentByOrder } = orderContentDb
const { updateProductDb } = productDb

const createOrder = async (order, orderContent) => {
	try {
		let order_id
		order_id = await createOrderDb(order)
		await createOrderContentDb({ order_id: order_id, ...orderContent })
		return true
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

const getOrderByCity = async (city) => {
	try {
		return await getOrderByCityDb(city)
	} catch (e) {
		throw new Error(e.message)
	}
}

const confirmOrder = async (orderId) => {
	try {
		let order
		let productList = []

		//get boxes
		await getOrderContentByOrder(orderId).then((boxes) => {
			order = boxes.boxes
		})

		//make a list of product id / amount objexts
		order.forEach((box) => {
			box.boxContent.forEach((content) => {
				productList.push({"product_id":content.productId, "amount":content.amount })
			})
		})



		return productList
	} catch (e) {
		throw new Error(e.message)
	}
}

// let update = {
// 				"_id": "60776cf54f15dc23034c0a7d",
// 				"update": {
// 					"product_quantity_stock": "5"
// 				}
// 			}

module.exports = {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByCity,
	updateOrder,
	getAllOrders,
	confirmOrder,
}
