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
		let order
		let productList = []

		//get boxes
		await getOrderContentByOrder(orderId).then((boxes) => {
			order = boxes.boxes
		})

		//make a list of product id / amount objexts
		order.forEach((box) => {
			box.boxContent.forEach((content) => {
					productList.push({
						product_id: content.productId,
						amount: content.amount,
						boxes: box.boxQuantity,
					})
			})
		})
		return { productList }
	} catch (e) {
		throw new Error(e.message)
	}
}

const manageInventory = async (orderId) => {
	try {
		//retrieve each unique product within the boxes in the order
		let productList
		await retrieveProductList(orderId).then((result) => {
			productList = result.productList
		})

		// Verify product amounts in the inventory
		for (const product of productList) {
			const item = await getProductByIdDb(product.product_id)
			const orderAmount = product.amount * product.boxes
			const stockAmount = item.product_quantity_stock

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
}
