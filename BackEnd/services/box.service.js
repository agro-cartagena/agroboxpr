const { ObjectID } = require('mongodb')
const { boxDb } = require('../db')
const { insertBoxDb, findAllBoxesDb, findAvailableBoxesDb, getBoxByIdDb, findProductsByIdList } = boxDb
const { updateEntryDb, addProductListDb } = boxDb

const createBox = async (box) => {
	const newBox = {
		...box,
		available: true
	}

	try {
		return await insertBoxDb(newBox)
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
				boxId : box._id,
				boxName : box.boxName,
				boxPrice : box.boxPrice,
				boxImage : box.boxImage
			}
		})
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
				boxId : box._id,
				boxName : box.boxName,
				boxPrice : box.boxPrice,
				boxImage : box.boxImage
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
		let result = {}
		
		if(box){
			// console.log("Box: ", box)
			const productIdList = box.boxContent;
			productIdList.map((productId) => {
				productsQuery.push({
					_id: ObjectID(productId)
				})
			});

			const products = await findProductsByIdList(productsQuery);
			console.log(`Products for ${box.boxName}: `, products);
			if(products) {
				products.forEach(product => {
					result = {
						[product.product_name] : product,
						...result
					}
				});

				console.log("Result: ", result);
				return result;
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
		return await updateEntryDb({ _id: ObjectID(id) }, updateDocument)
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

module.exports = {
	createBox,
	readAllBoxes,
	readAvailableBoxes,
	readBoxProducts,
	getBoxById,
	updateEntry,
	addProductList,
}
