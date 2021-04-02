const { boxService } = require('../services')
const { insertBox, readAllBoxes, getBoxById } = boxService
const { updateEntry, addProductList } = boxService

const postBox = async (req, res, next) => {
	const box = req.body

	try {
		await insertBox(box)
		res.sendStatus(201) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id

	try {
		await getBoxById(id).then((box) => {
			res.status(200).send(box)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getAllBoxes = async (req, res, next) => {
	try {
		await readAllBoxes().then((boxes) => {
			res.status(200).send(boxes)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const update = async (req, res, next) => {
	const params = req.body

	try {
		await updateEntry(params)
		res.sendStatus(200) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const addProducts = async (req, res, next) => {
	const params = req.body

	try {
		await addProductList(params)
		res.sendStatus(200) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postBox,
	getAllBoxes,
	getById,
	update,
	addProducts,
}
