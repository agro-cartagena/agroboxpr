const { productService } = require('../services')

const { insertProduct, readAllProducts, getProductById, updateProduct, deleteProduct } = productService
const { uploadImage } = require('../services/upload.service')

const postProduct = async (req, res, next) => {
	const { product_name, product_category, product_quantity_stock, product_units, product_price } = req.body;
	const image = req.file

	console.log(req.body)
	if(!uploadImage(image))
		return res.status(409).send("Error uploading file.")

	const product = {
		product_name, 
		product_category, 
		product_quantity_stock: Number(product_quantity_stock), 
		product_units, 
		product_price: Number(product_price),
		product_image: image.filename
	}

	try {
		await insertProduct(product).then(result => {
			if (result != null) {
				res.sendStatus(201)
				next()
			} else {
				res.sendStatus(409)
				next()
			}
		})
	} catch (e) {
		res.sendStatus(500) && next(e)
	}
}

const getProducts = async (req, res, next) => {
	try {
		await readAllProducts().then((products) => {
			res.status(200).send(products)
		})
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const getById = async (req, res, next) => {
	const id = req.params.id
	try {
		await getProductById(id).then((product) => {
			if(product){
				res.status(200).send(product)
			} else{
				res.status(404).send()
			}
		})
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const update = async (req, res, next) => {
	const change = req.body
	const id = req.params.id

	try {
		const update = await updateProduct(id, change)
		if (update == null) {
			res.sendStatus(404)
			next()
		}
		else if(!update){
			res.sendStatus(409)
			next()
		} else{
			res.sendStatus(200)
			next()
		}
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const deletion = async (req, res, next) => {
	const id = req.params.id

	try {
		const deletion = await deleteProduct(id)
		if(deletion != null){
			res.sendStatus(200)
			next()
		}
		else{
			res.sendStatus(404)
			next()
		}
	} catch (e) {
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	postProduct,
	getProducts,
	getById,
	update,
	deletion,
}
