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
const { updateProductDb, getProductByIdDb } = productDb

/**
 * Uses order information to create an order document inside the database, appending the user's id and an
 * initial "pending" status. Afterwards, using the object id returned from the insertion and
 * the orderContent value, an order content document is created.
 * @param {JSON} order Object containing relevant order information.
 * @param {JSON} orderContent Object containing the order's contents
 * @param {String} userId Id related to the user submitting the order.
 * @returns {Promise<true|Error>} Returns true if insertion process was succesful, otherwise it
 * throws an error.
 */
const createOrder = async (order, orderContent, userId) => {
	try {
		let order_id
		order_id = await createOrderDb({
			user_id: userId,
			order_status: 'Pendiente',
			...order,
		})

		await createOrderContentDb({ order_id: order_id, ...orderContent })
		return true
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and retrieves the orders for a given user.
 * The orders are then returned into a JSON where each key has a list related to the order's status.
 * @param {String} userId
 * @returns {Promise<JSON | Error>} Returns JSON object if fetch is succesful, otherwise it
 * throws an error.
 */
const readUserOrders = async (userId) => {
	try {
		return await filterByStatusWithParameter(getAllUserOrdersDb, userId)
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and retrieves an order matching specified id.
 * @param {ObjectId} id ObjectId of the order to fetch.
 * @returns {Promise<JSON| Error>} Returns JSON if fetch is succesful, otherwise it
 * throws an error.
 */
const getOrderById = async (id) => {
	try {
		return await getOrderByIdDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and retrieves all the orders stored.
 * The orders are then returned into a JSON where each key has a list related to the order's status.
 * @returns {Promise<JSON | Error>} Returns JSON object if fetch is succesful, otherwise it
 * throws an error.
 */
const getAllOrders = async () => {
	try {
		return await filterByStatus(readAllOrdersDb)
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and retrieves all the orders stored.
 * The orders are then returned into a JSON where each key has a list related to the order's status.
 * @deprecated Fetching all orders using getAllOrders returns them sorted by status
 * @returns {Promise<JSON | Error>} Returns JSON object if fetch is succesful, otherwise it
 * throws an error.
 */
const getOrderByStatus = async () => {
	try {
		let categories = []
		let order_catalog = []
		let response = {}

		await readAllOrdersDb().then((element) => {
			order_catalog = element
			for (const order in element) {
				if (!categories.includes(element[order].order_status))
					categories.push(element[order].order_status)
			}
		})

		categories.forEach((category) => {
			response = {
				[category]: order_catalog.filter(
					(order) => order.order_status == category
				),
				...response,
			}
		})

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and updates the document using a specified document id
 * and the changes to be applied.
 * @param {ObjectId} id Document to update's object id.
 * @param {JSON} changes JSON object containing the changes to apply.
 * @returns {Promise<JSON | Error>} Returns JSON object if update is succesful, otherwise it
 * throws an error. */
const updateOrder = async (id, changes) => {
	try {
		return await updateOrderDb(id, changes)
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the orders collection within the database and retrieves the orders for a given city.
 * @param {String} city City to filter documents in the database by.
 * @returns {Promise<JSON | Error>} Returns JSON object if fetch is succesful, otherwise it
 * throws an error.
 */
const getOrderByCity = async (city) => {
	try {
		return await getOrderByCityDb(city)
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Connects to the oreder Contents collection in the database and retrieves the document matching
 * the specified order id. The result of the fetch processed to return a list of JSON objects,
 * whose key value pairs are the number of boxes, the product_id and amounts of each product in each box.
 * This is a helper function to be used inside manageInventory.
 * @param {ObjectId} orderId
 * @returns {Promise<JSON|Error>} Returns a list of boxes, product_id & product amounts per each box if
 */
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

		order.map((box) => {
			boxList.push({
				amount: orderList[parseInt(box)].box_quantity,
				content: orderList[parseInt(box)].box_content,
			})
		})

		boxList.map((box) => {
			box.content.map((prod) => {
				result.push({
					_id: prod._id,
					prod_name: prod.product_name,
					total_products: prod.product_quantity_box * box.amount,
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
		let initial_product_list = []
		let product_amounts = []
		let amount_differance = []

		await retrieveProductList(orderId).then((list) => {
			//mock return of products
			initial_product_list = list
		})

		// Verify product amounts in the inventory
		for (const product of initial_product_list) {
			const item = await getProductByIdDb(product._id) // mock finding the products
			const orderAmount = product.total_products
			const stockAmount = item.product_quantity_stock
			if (orderAmount <= stockAmount)
				product_amounts.push({
					_id: item._id,
					orderAmount: orderAmount,
					stockAmount: stockAmount,
				})
			else return { msg: `cannot do changes for ${item.product_name}` }
		}

		//store ammounts to change here
		product_amounts.map((index) => {
			amount_differance.push({
				delta: index.stockAmount - index.orderAmount,
				_id: index._id,
			})
		})

		for (let i = 0; i < amount_differance.length; i++) {
			await updateProductDb(amount_differance[i]._id, {
				product_quantity_stock: amount_differance[i].delta,
			})
		}

		return true
	} catch (e) {
		throw new Error(e.message)
	}
}

const filterByStatus = async (getFuncionDb) => {
	try {
		let categories = []
		let order_catalog = []
		let response = {}

		await getFuncionDb().then((element) => {
			order_catalog = element
			for (const order in element) {
				if (!categories.includes(element[order].order_status))
					categories.push(element[order].order_status)
			}
		})

		categories.forEach((category) => {
			response = {
				[category]: order_catalog.filter(
					(order) => order.order_status == category
				),
				...response,
			}
		})

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

const filterByStatusWithParameter = async (getFuncionDb, parameter) => {
	try {
		let categories = []
		let order_catalog = []
		let response = {}

		await getFuncionDb(parameter).then((element) => {
			order_catalog = element
			for (const order in element) {
				if (!categories.includes(element[order].order_status))
					categories.push(element[order].order_status)
			}
		})

		categories.forEach((category) => {
			response = {
				[category]: order_catalog.filter(
					(order) => order.order_status == category
				),
				...response,
			}
		})

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createOrder,
	readUserOrders,
	getOrderById,
	getOrderByCity,
	getOrderByStatus,
	updateOrder,
	getAllOrders,
	manageInventory,
	retrieveProductList,
}
