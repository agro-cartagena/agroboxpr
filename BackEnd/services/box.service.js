const { boxDb } = require('../db')
const { createBoxDb, findAllBoxesDb, getBoxByIdDb } = boxDb
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
	insertBox,
	readAllBoxes,
	getBoxById,
	updateEntry,
	addProductList,
}
