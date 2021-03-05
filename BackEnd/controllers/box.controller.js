const { boxService } = require('../services')
const { insertBox, readAllBoxes, deleteBoxFunc } = boxService
const { getBoxName, getBoxPrice, getBoxProductList } = boxService
const {updateFirst} = boxService

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

const getBox = async (req, res, next) => {
	try {
		await readAllBoxes().then((boxes) => {
			res.status(200).send(boxes)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const deleteBox = async (req, res, next) => {
	const boxName = req.body
	try {
		await deleteBoxFunc(boxName)
		res.sendStatus(200) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getProducts = async (req, res, next) => {
	const box = req.body

	try {
		await getBoxProductList(box).then((products) => {
			res.status(200).send(products)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getPrice = async (req, res, next) => {
	const box = req.body

	try {
		await getBoxPrice(box).then((products) => {
			res.status(200).send(products)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getName = async (req, res, next) => {
	const box = req.body

	try {
		await getBoxName(box).then((products) => {
			res.status(200).send(products)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const update = async (req, res, next) => {
	const params = req.body

	try {
		await updateFirst(params)
		res.sendStatus(200) && next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postBox,
	getBox,
	deleteBox,
	getProducts,
	getName,
	getPrice,
	update
}
