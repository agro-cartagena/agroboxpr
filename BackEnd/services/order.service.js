const { Logger } = require('mongodb')
const { orderDb, orderContentDb, productDb } = require('../db')
const { getProductById } = require('./product.service')

const {
	createOrderDb,
	getAllUserOrdersDb,
	getOrderByIdDb,
	updateOrderDb,
	getOrderByCityDb,
	readAllOrdersDb,
} = orderDb

const { createOrderContentDb, getOrderContentByOrder } = orderContentDb
const { decreaseProductDb, getProductByIdDb } = productDb

const createOrder = async (order, orderContent, userId) => {
	try {
		let order_id = await createOrderDb({ user_id: userId, ...order })
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

const retrieveProductList = async (orderId) => {
	try {
		let order, orderList
		let boxList = []
		let result = []

		//get boxes
		await getOrderContentByOrder(orderId).then((boxes) => {
			order = Object.keys(boxes)
			orderList = boxes
		})

		order.pop('_id')
		order.pop('order_id')

		order.forEach((box) => {
			boxList.push(orderList[parseInt(box)])
		})

		boxList.forEach((box) => {
			box.box_content.forEach((prod) => {
				result.push({
					boxes: box.box_quantity,
					product_id: prod.productId,
					amount: prod.amount,
				})
			})
		})

		return result
	} catch (e) {
		throw new Error(e.message)
	}
}

const manageInventory = async (orderId) => {
	try {
		//retrieve each unique product within the boxes in the order
		let productList = []

		await retrieveProductList(orderId).then((list) => {
			productList = list
		})

		// Verify product amounts in the inventory
		for (const product of productList) {
			const item = await getProductByIdDb(product.product_id)
			const orderAmount = product.amount * product.boxes
			const stockAmount = parseInt(item.product_quantity_stock)

			//Not enough items in inventory to carry out order
			if (stockAmount < orderAmount) {
				return {
					msg: 'inventory management failed',
					product: product.product_id,
					stock: stockAmount,
					order: orderAmount,
				}
			}
		}

		// reduce stock in inventory accordingly
		productList.forEach((product) => {
			const orderAmount = product.amount * product.boxes
			decreaseProductDb(product.product_id, orderAmount)
		})

		return true
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
	manageInventory,
	retrieveProductList,
}
