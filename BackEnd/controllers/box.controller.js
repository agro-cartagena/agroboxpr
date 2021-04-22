const { boxService } = require('../services')
const { createBox, readAllBoxes, readAvailableBoxes, readBoxProducts, getBoxById } = boxService
const { updateEntry, addProductList } = boxService

const postBox = async (req, res, next) => {
	const body = req.body
	const file = req.file

	let box_content = []

	// Receives one array for box products and another for box product qty. Both arrays must match in length and be in correct order 
	// for box to be created correctly.
	// Comment out code IF and array of js objects can be sent through form-data
	if(body.box_content.length === body.product_quantity_box.length){
		for(let i = 0; i < body.box_content.length; i ++) {
			box_content.push({
				_id: body.box_content[i],
				product_quantity_box: Number(body.product_quantity_box[i])
			})
		}
	} else {
		console.log("WTF Bro!")
	}

	
	// Comment out code IF an array of js objects can be sent through form-data
	const box = {
		box_name: body.box_name,
		box_price: body.box_price,
		box_image: file.filename,
		box_content: box_content
	}
	// Uncomment IF an array of js objects can be sent through form-data
	// const box = {
	// 	box_name: body.box_name,
	// 	box_price: body.box_price,
	// 	box_image: file.filename,
	// 	box_content: body.box_content
	// }

	try {
		const newBox = await boxService.createBox(box)
		res.status(201).json(newBox) && next()
		res.status(201).send() && next()
	} catch (err) {
		// console.log(err.message)
		res.sendStatus(500) && next(err)
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

const getAvailableBoxes = async (req, res, next) => {
	try {
		await readAvailableBoxes().then((boxes) => {
			res.status(200).send(boxes)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getBoxProducts = async (req, res, next) => {
	const id = req.params.id

	try {
		await readBoxProducts(id).then(products => {
			res.status(200).send(products)
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const updateBox = async (req, res, next) => {
	const id = req.params.id
	const updateFields = req.body

	try {
		await updateEntry(id, updateFields)
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
	getAvailableBoxes,
	getBoxProducts,
	getById,
	updateBox,
	addProducts,
}
