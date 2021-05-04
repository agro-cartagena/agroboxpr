const { orderContentDb } = require('../db')
const {
	createOrderContentDb,
	getOrderContentDb,
	getOrderContentByIdDb,
	updateOderContentDb,
} = orderContentDb

const createOrderContent = async (orderContent) => {
	try {
		return await createOrderContentDb(orderContent)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderContent = async () => {
	try {
		return await getOrderContentDb()
	} catch (e) {
		throw new Error(e.message)
	}
}

const getOrderContentById = async (id) => {
	try {
		let order, orderList
		let boxList = []


		//get boxes
		await getOrderContentByIdDb(id).then((boxes) => {
			order = Object.keys(boxes)
			orderList = boxes
		})

		order.pop('_id')
		order.pop('order_id')

		order.forEach((box) => {
			boxList.push(orderList[parseInt(box)])
		})
		return boxList
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateOderContent = async (id, changes) => {
	try {
		return await updateOderContentDb(id, changes)
	} catch (e) {
		throw new Error(e.message)
	}
}



module.exports = {
	createOrderContent,
	getOrderContent,
	getOrderContentById,
	updateOderContent,
}
