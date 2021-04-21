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
const { decreaseProductDb } = productDb

const createOrder = async (order, orderContent, userId) => {
	try {
		let order_id
		order_id = await createOrderDb({"user_id": userId, ...order})
		await createOrderContentDb({ "order_id": order_id, ...orderContent })
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

const manageInventory = async (orderId) => {
	try {
		let order
		let productList = []
		let box_amounts = []

		//get boxes
		await getOrderContentByOrder(orderId).then((boxes) => {
			order = boxes.boxes
		})

		//make a list of product id / amount objexts
		order.forEach((box) => {
			box_amounts.push(box.boxQuantity)
			box.boxContent.forEach((content) => {
				productList.push({
					"product_id": content.productId,
					"amount": content.amount,
				})
			})
		})

		// decrease product ammounts in the inventory
		productList.forEach((product) => {
			box_amounts.forEach((amount) => {
				// console.log(`original amounts: ${product.amount} box amounts: ${amount}`);
				// console.log(`\nnew ammounts: ${product.amount * amount}\n`);
				decreaseProductDb(product.product_id, product.amount * amount)
			})
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
