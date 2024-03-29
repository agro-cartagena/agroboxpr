const { ObjectID } = require('mongodb')
const { boxDb } = require('../db')
const { insertBoxDb, findAllBoxesDb, findAvailableBoxesDb, getBoxByIdDb, findProductsByIdList } = boxDb
const { updateEntryDb, addProductListDb, deleteBoxDb } = boxDb
const { validationMiddleware } = require('../middleware')
const { validateBoxName, validateId } = validationMiddleware

const createBox = async (box) => {
	const newBox = {
		...box,
		available: true
	}

	try {
		const validateName = await validateBoxName(box.box_name)
		if(validateName == null){
			return await insertBoxDb(newBox)
		} else{
			return false
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

const readAllBoxes = async () => {
	// console.log('\nRetrieving boxes \n')

	try {
		const boxes = await findAllBoxesDb()
		//Only return to client: name, price, imageUrl & boxId
		const response = boxes.map(box => {
			return {
				_id : box._id,
				box_name : box.box_name,
				box_price : box.box_price,
				box_image : box.box_image,
				available : box.available
			}
		})
		
		//Sort available boxes first
		response.sort((x, y) => {
			return (x.available === y.available)? 0 : x.available? -1 : 1;
		});

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

const readAvailableBoxes = async () => {
	// console.log('\nRetrieving boxes \n')
	const query = { available: true }

	try {
		const boxes = await findAvailableBoxesDb(query)
		//Only return to client: name, price, imageUrl & boxId
		const response = boxes.map(box => {
			return {
				_id : box._id,
				box_name : box.box_name,
				box_price : box.box_price,
				box_image : box.box_image
			}
		})

		return response
	} catch (e) {
		throw new Error(e.message)
	}
}

const readBoxProducts = async (id) => {
	// console.log('\nRetrieving boxes \n')

	try {
		const box = await getBoxByIdDb(id);
		let productsQuery = []
		let result = []
		let productList = []
		
		if(box){
			productList = box.box_content;

			if(productList.length < 1){
				return productList
			}

			productList.map((product) => {
				productsQuery.push({
					_id: ObjectID(product._id)
				})
			});

			const products = await findProductsByIdList(productsQuery);
			
			if(products) {
				result = products.map(product => {
					const product_quantity_box = productList.find(boxProduct => boxProduct._id === product._id.toString()).product_quantity_box
					return {
						...product,
						product_quantity_box
					}
				})

				return result
			}
		}

		// return response
	} catch (e) {
		throw new Error(e.message)
	}
}

const getBoxById = async (id) => {
	try {
		return await getBoxByIdDb(id)
	} catch (e) {
		throw new Error(e.message)
	}
}

const updateEntry = async (id, updateFields) => {
	const updateDocument = {
        "$set": updateFields
    }
	try {
		return await updateEntryDb({ _id: ObjectID(id) }, updateDocument).then(async box => {

			if (box.value) {
				return true
			} else {
				return false
			}
		})
	} catch (e) {
		throw new Error(e.message)
	}
}

const addProductList = async (paramList) => {
	try {
		return await addProductListDb(paramList)
	} catch (e) {
		throw new Error(e.message)
	}
}

const deleteBoxById = async (id) => {
	try {
		let validate
		await validateId(id, 'box').then((result) => {
			validate = result
		})
		if (validate != null) {
			return await deleteBoxDb(id)
		} else {
			return null
		}
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = {
	createBox,
	readAllBoxes,
	readAvailableBoxes,
	readBoxProducts,
	getBoxById,
	updateEntry,
	addProductList,
	deleteBoxById
}
