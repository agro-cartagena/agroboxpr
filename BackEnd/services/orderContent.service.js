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
		let boxes = await getOrderContentDb()
		let temp = {}
		let result = []
		let j = 0
		boxes.forEach((index) => {
			if (!index.hasOwnProperty('boxes')) result.push(index)
			else {
				for (let i = 0; i < index.boxes.length; i++) {
					temp = { [i]: index.boxes[i], ...temp }
				}
				temp = {
					...temp,
					_id: index._id,
					order_id: index.order_id,
				}
				result.push(temp)
			}
		})
		return result
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

		if (orderList.hasOwnProperty('boxes')) {
			return orderList.boxes
		}

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
