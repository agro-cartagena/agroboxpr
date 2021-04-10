const { boxDb } = require('../db')
const { insertBoxDb, findAllBoxesDb, getBoxByIdDb } = boxDb
const { updateEntryDb, addProductListDb } = boxDb

const createBox = async (box) => {

	try {
		return await insertBoxDb(box)
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
				boxName : box.name,
				boxPrice : box.price,
				boxImage : box.imageUrl
			}
		})
		return response
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

const updateEntry = async (updateParams) => {
	try {
		return await updateEntryDb(updateParams)
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
	getBoxById,
	updateEntry,
	addProductList,
}
