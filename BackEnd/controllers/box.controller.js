const { boxService } = require('../services')
const { insertBox, readAllBoxes } = boxService

const postBox = async (req, res, next) => {
	const box = req.body

	try {
		await insertBox(box)
		res.sendStatus(201)
		next()
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

module.exports = {
    postBox,
    getBox
}