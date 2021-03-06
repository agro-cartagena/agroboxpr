const { boxDb } = require('../db')

const { createBoxDb, findAllBoxesDb, deleteBoxDb } = boxDb
const { getBoxProductsDb, getBoxNameDb, getBoxPriceDb } = boxDb
const { updateEntryDb, addProductListDb } = boxDb

const insertBox = async (box) => {
	console.log('\nInside box service\n', box)

	try {
		return await createBoxDb(box)
	} catch (e) {
		throw new Error(e.message)
	}
}

const readAllBoxes = async () => {
	console.log('\nRetrieving boxes \n')

	try {
		return await findAllBoxesDb()
	} catch (e) {
		throw new Error(e.message)
	}
}

const deleteBoxFunc = async (boxName) => {
	console.log('\nRemoving box entry \n', boxName)
	try {
		console.log('\nDeletion successfull\n')
		return await deleteBoxDb(boxName)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getBoxProductList = async (boxDetail) => {
	try {
		return await getBoxProductsDb(boxDetail)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getBoxName = async (boxDetail) => {
	try {
		return await getBoxNameDb(boxDetail)
	} catch (e) {
		throw new Error(e.message)
	}
}

const getBoxPrice = async (boxDetail) => {
	try {
		return await getBoxPriceDb(boxDetail)
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
	insertBox,
	readAllBoxes,
	deleteBoxFunc,
	getBoxName,
	getBoxPrice,
	getBoxProductList,
	updateEntry,
	addProductList,
}
