const { orderContentDb } = require('../db')
const {
	createOrderContentDb,
	getOrderContentDb,
	getOrderContentByIdDb,
	updateOderContentDb,
} = orderContentDb

const createOrderContent = async (orderContent) => {
	try {
		await createOrderContentDb(orderContent)
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
		return await getOrderContentByIdDb(id)
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
