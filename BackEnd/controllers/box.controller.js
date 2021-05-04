const { boxService } = require('../services')
const { createBox, readAllBoxes, readAvailableBoxes, readBoxProducts, getBoxById } = boxService
const { updateEntry, addProductList, deleteBoxById } = boxService
const { uploadImage } = require('../services/upload.service')

const postBox = async (req, res, next) => {
	const { box_name, box_price, box_content } = req.body
	const image = req.file

	console.log(req.file)
	console.log(req.body)

	const isImage = await uploadImage(image)
	if(!isImage)
		return res.status(409).send("Error uploading file.")

	const box = {
		box_name: box_name, 
		box_price: Number(box_price), 
		box_content: JSON.parse(box_content),
		box_image: image.filename
	}

	try {
		await boxService.createBox(box).then(result => {
			if(result){
				res.status(201).send() && next()
			} else{
				res.status(409).send()
			}
		})
	} catch (err) {
		// console.log(err.message)
		res.sendStatus(500) && next(err)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id

	try {
		await getBoxById(id).then((box) => {
			if(box){
				const response = {
					_id: box._id,
					box_name: box.box_name,
					box_price: box.box_price,
					box_image: box.box_image,
					box_content: box.box_content
				}
				res.status(200).send(response)
			} else{
				res.status(404).json({
                    errors: [{ box: "Box not found." }],
                });
			}
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
			if(products){
				res.status(200).send(products)
			} else{
				res.status(404).json({
                    errors: [{ box: "Box not found." }],
                });
			}
		})
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const updateBox = async (req, res, next) => {
	const id = req.params.id
	const { box_name, box_price, box_content, box_image } = req.body

	const updateFields = {
		box_name, 
		box_price: Number(box_price), 
		box_image: box_image ? box_image : req.file.filename,
		box_content: JSON.parse(box_content)
	}

	try {
		await updateEntry(id, updateFields).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(404).json({
                    errors: [{ user: "Box not found." }],
                });
            }
        })
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const enableBox = async (req, res, next) => {
	const id = req.params.id
	const updateFields = {
		available : true
	}

	try {
		await updateEntry(id, updateFields).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(404).json({
                    errors: [{ user: "Box not found." }],
                });
            }
        })
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const disableBox = async (req, res, next) => {
	const id = req.params.id
	const updateFields = {
		available : false
	}

	try {
		await updateEntry(id, updateFields).then(result => {
            if(result){
                res.status(200).send()
            } else{
                res.status(404).json({
                    errors: [{ box: "Box not found." }],
                });
            }
        })
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

const deleteBox = async (req, res, next) => {
	const id = req.params.id

	try {
		await deleteBoxById(id).then(result => {
			if(result != null){
				res.sendStatus(200)
				next()
			}
			else{
				res.sendStatus(404)
				next()
			}
		})
	} catch (e) {
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
	enableBox,
	disableBox,
	addProducts,
	deleteBox
}
