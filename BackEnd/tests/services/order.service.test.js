const { orderService } = require('../../services')
const { orderDb, orderContentDb, productDb } = require('../../db')

const newProduct = require('../mock-data/newOrder.json')
const db = require('../../db/mdb')

const dotenv = require('dotenv')
dotenv.config()

//test variables
let testable, test_id, test_change

//db functions within service modified to be written as follow instead of calling using import
orderDb.createOrderDb = jest.fn()
orderContentDb.createOrderContentDb = jest.fn()
orderDb.getOrderByCityDb = jest.fn()
orderDb.getOrderByIdDb = jest.fn()
orderDb.updateOrderDb = jest.fn()
productDb.decreaseProductDb = jest.fn()


describe('Product Service Suite', () => {
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

		//set up product already in db for modification testing
		await orderService
			.getProductById('608319210d68ab45e42baffa')
			.then((prod) => {
				testable = {
					product_name: prod.product_name,
					product_category: prod.product_category,
					product_quantity_stock: prod.product_quantity_stock,
					product_units: prod.product_units,
					product_price: prod.product_price,
				}
				test_id = prod._id
				test_change = { product_name: prod.product_name + 'updated' }
			})
	})

	describe('\n\nInsert Product', () => {
		it('Should have an insertProduct function', () => {
			expect(typeof orderService.insertProduct).toBe('function')
		})

		it('Should expect createProductDb to be called sucessfully', async () => {
			await orderService.insertProduct(newProduct)
			expect(orderDb.createProductDb).toBeCalledWith(newProduct)
		})

		it('Should expect createProductDb to fail with product validation', async () => {
			expect(await orderService.insertProduct(testable)).toBeNull()
		})
	})

	describe('\n\nDelete Product', () => {
		it('Should have an productService.deleteProduct function', async () => {
			expect(typeof orderService.deleteProduct).toBe('function')
		})

		it('Should expect deleteProductDb to be fail without id value', async () => {
			await orderService.deleteProduct()
			expect(orderDb.deleteProductDb).not.toBeCalled()
		})

		it('Should expect deleteProductDb to be called succesfully', async () => {
			expect.assertions(2)
			await orderService.deleteProduct(test_id)
			expect(orderDb.deleteProductDb).toBeCalled()
			expect(orderDb.deleteProductDb).toBeCalledWith(test_id)
		})
	})

	describe('\n\nUpdate Product', () => {
		it('Should have an productService.updateProduct function', async () => {
			expect(typeof orderService.updateProduct).toBe('function')
		})

		it('Should expect deleteProductDb to be fail without id value', async () => {
			await orderService.updateProduct()
			expect(orderDb.updateProductDb).not.toBeCalled()
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			expect.assertions(2)
			await orderService.updateProduct(test_id, test_change)
			expect(orderDb.updateProductDb).toBeCalled()
			expect(orderDb.updateProductDb).toBeCalledWith(test_id, test_change)
		})
	})

	afterAll(() => {
		db.close(function (err) {
			if (err) {
				console.log('Unable to close Mongo connection.')
				process.exit(1)
			} else {
				// console.log('Mongo connection closed')
			}
		})
	})
})
