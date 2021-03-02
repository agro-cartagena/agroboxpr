const { boxDb } = require('../db')

const { createBoxDb, findAllBoxesDb } = boxDb

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

module.exports = {
    insertBox,
    readAllBoxes
}