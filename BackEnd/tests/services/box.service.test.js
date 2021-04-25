const { boxService } = require('../../services')
const { boxDb } = require('../../db')

const newBox = require('../mock-data/newBox.json')

const db = require('../../db/mdb')

const dotenv = require('dotenv')
dotenv.config()

//test variables
let testable, test_id, test_change

//db functions within service modified to be written as follow instead of calling using import
boxDb.insertBoxDb = jest.fn()
boxDb.findAllBoxesDb = jest.fn()
boxDb.findAvailableBoxesDb = jest.fn()
boxDb.findProductsByIdList = jest.fn()
boxDb.getBoxByIdDb = jest.fn()
boxDb.updateEntryDb = jest.fn()
boxDb.addProductListDb = jest.fn()

describe('Box Service Suite', () => {
	beforeAll(async () => {
		//Connect to MongoDB cluster
		await db.connect(process.env.CONNECTION_STRING, function (err) {
			if (err) {
				console.log('Unable to connect to Mongo.')
				process.exit(1)
			} else {
				console.log('Connected to Mongo')
			}
		})

		// set up box already in db for modification testing
		await boxService.getBoxById('6081840eedf8a82ed346c080').then((box) => {
			testable = {
				box_name: box.box_name,
				box_price: box.box_price,
				box_content: box.box_content,
			}
			test_id = box._id
			test_change = { box_name: box.box_name + 'updated' }
		})
	})

	describe('\n\nInsert Box', () => {
		it('Should have an createBox function', () => {
			expect(typeof boxService.createBox).toBe('function')
		})

		it('Should expect insertBoxDb to be called sucessfully', async () => {
            expect.assertions(2)
            let result = {available: true, ...newBox}
			await boxService.createBox(newBox)
            expect(boxDb.insertBoxDb).toBeCalled()
			expect(boxDb.insertBoxDb).toBeCalledWith(result)
		})
	})


	describe('\n\nUpdate Box', () => {
		it('Should have an boxService.updateEntry function', async () => {
			expect(typeof boxService.updateEntry).toBe('function')
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			await boxService.updateEntry(test_id, test_change)
			expect(boxDb.updateEntryDb).toBeCalled()
		})
	})

	afterAll(() => {
		db.close(async function (err) {
			if (err) {
				console.log('Unable to close Mongo connection.')
				process.exit(1)
			} else {
				// console.log('Mongo connection closed')
			}
		})
	})
})
