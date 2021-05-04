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
		await manageInventory(order_id)
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
 * Connects to the order Contents collection in the database and retrieves the document matching
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

		// get boxes from the order
		await getOrderContentByOrder(orderId).then((boxes) => { // (testing) mock getting content
			order = Object.keys(boxes)
			orderList = boxes
		})

		// remove keys that are not associated with the order's boxes
		order.pop('_id')
		order.pop('order_id')

		// isolate the amount of boxes of each type and the content in these from the rest
		// of the box data
		order.map((box) => {
			boxList.push({
				amount: orderList[parseInt(box)].box_quantity,
				content: orderList[parseInt(box)].box_content,
			})
		})

		// link together for future use each product's id, name, and total amount
		// to be remove upon purchase
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

/**
 * Modifies the values of products in the stock according to the products amounts contained 
 * in the order's content. 
 * @param {ObjectId} orderId id value of the order to get the associated content
 * @returns {Promise<true|JSON|Error} Function returns the value true if the inventory management
 * is successful, and a JSON message relaying changes can't be done for a given product
 * if the resulting update gives a negative value. If there is an error in async functions return Error.
 */
const manageInventory = async (orderId) => {
	try {
		let initial_product_list = []
		let product_amounts = []
		let amount_differance = []
		
		//retrieve each unique product within the boxes in the order
		await retrieveProductList(orderId).then((list) => {
			//(testing) mock return of products
			initial_product_list = list
		})

		// Verify product amounts in the inventory, are added to product_amounts if enough
		// are in stock, otherwise return error msg JSON
		for (const product of initial_product_list) {
			
			//recieve product inventory data
			const item = await getProductByIdDb(product._id) // (testing) mock finding the products
			
			// establish amounts to be used
			const orderAmount = product.total_products
			const stockAmount = item.product_quantity_stock
			
			//verify if differance won't be negative
			if (orderAmount <= stockAmount)
				product_amounts.push({
					_id: item._id,
					orderAmount: orderAmount,
					stockAmount: stockAmount,
				})
			else return { msg: `cannot do changes for ${item.product_name}` }
		}

		// amount_diferance holds the products _id and the new quantity in stock
		// after carrying out sale.
		product_amounts.map((index) => {
			amount_differance.push({
				delta: index.stockAmount - index.orderAmount,
				_id: index._id,
			})
		})

		// inventory update step
		for (let i = 0; i < amount_differance.length; i++) {
			await updateProductDb(amount_differance[i]._id, {		//mock updating content
				product_quantity_stock: amount_differance[i].delta,
			})
		}

		//management succesful
		return true
	} catch (e) {
		throw new Error(e.message)
	}
}

/**
 * Helper function that organizes the get functions by order status.
 * @param {Function} getFuncionDb function that recieves all the data from orders collection
 * @returns {Promise<JSON|Error>} JSON document organized by order status, Error for 
 * get method errors.
 */
const filterByStatus = async (getFuncionDb) => {
	try {
		let categories = []
		let order_catalog = []
		let response = {}

		// retrieve data, categorizes the order status 
		await getFuncionDb().then((element) => {
			order_catalog = element
			for (const order in element) {
				if (!categories.includes(element[order].order_status))
					categories.push(element[order].order_status)
			}
		})

		// organizes the data for the specified status category
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
 * Helper function that organizes the get functions by order status. Used for get functions
 * that use a parameter value.
 * @param {Function} getFuncionDb function that recieves all the data from orders collection
 * @param {*} parameter parameter to be used inside getFunctionDb
 * @returns {Promise<JSON|Error>} JSON document organized by order status, Error for 
 * get method errors.
 */
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
