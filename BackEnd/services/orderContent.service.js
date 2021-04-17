const { orderContentDb } = require('../db')
const { validationMiddleware } = require('../middleware')
const {
	createOrderContentDb,
	getOrderContentDb,
	getOrderContentByIdDb,
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
		let validate
		await validationMiddleware.validateId(id, 'orderContent').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await getOrderContentByIdDb(id)
		}
        else {
            return null
        }
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createOrderContent,
	getOrderContent,
	getOrderContentById,
}
