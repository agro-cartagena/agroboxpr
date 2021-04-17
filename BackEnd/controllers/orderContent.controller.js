const { orderContentService } = require('../services')
const { validationMiddleware } = require('../middleware')

const {
	createOrderContent,
	getOrderContent,
	getOrderContentById,
	updateOderContent,
} = orderContentService

const { validateId } = validationMiddleware

const postContent = async (req, res, next) => {
	const orderContent = req.body
	try {
		await createOrderContent(orderContent)
		res.status(201) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getContent = async (req, res, next) => {
	try {
		await getOrderContent().then((result) => {
			res.status(200).send(result)
			next()
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getContentById = async (req, res, next) => {
	const id = req.params.id
	try {
		let validate
		await validateId(id).then((result) => {
			validate = result
		})
		if (validate != null) {
			await getOrderContentById(id).then((result) => {
				res.status(200).send(result)
				next()
			})
		} else {
			res.sendStatus(404) && next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const putContent = async (req, res, next) => {
	const id = req.params.id
	const changes = req.body

	try {
		let validate
		await validateId(id).then((result) => {
			validate = result
		})
		if (validate != null) {
			await updateOderContent(id, changes)
			res.status(200) && next()
		} else {
			res.sendStatus(404) && next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postContent,
	getContent,
	getContentById,
	putContent,
}
