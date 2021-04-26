const { productService } = require('../../services')
const { productDb } = require('../../db')

const newProduct = require('../mock-data/newProduct.json')
const db = require('../../db/mdb')

const dotenv = require('dotenv')
dotenv.config()

//test variables
let testable, test_id, test_change

//db functions within service modified to be written as follow instead of calling using import
productDb.createProductDb = jest.fn()
productDb.deleteProductDb = jest.fn()
productDb.getProductById = jest.fn()
productDb.updateProductDb = jest.fn()

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
		await productService
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
			expect(typeof productService.insertProduct).toBe('function')
		})

		it('Should expect createProductDb to be called sucessfully', async () => {
			await productService.insertProduct(newProduct)
			expect(productDb.createProductDb).toBeCalledWith(newProduct)
		})

		it('Should expect createProductDb to fail with product validation', async () => {
			expect(await productService.insertProduct(testable)).toBeNull()
		})
	})

	describe('\n\nDelete Product', () => {
		it('Should have an productService.deleteProduct function', async () => {
			expect(typeof productService.deleteProduct).toBe('function')
		})

		it('Should expect deleteProductDb to be fail without id value', async () => {
			await productService.deleteProduct()
			expect(productDb.deleteProductDb).not.toBeCalled()
		})

		it('Should expect deleteProductDb to be called succesfully', async () => {
			expect.assertions(2)
			await productService.deleteProduct(test_id)
			expect(productDb.deleteProductDb).toBeCalled()
			expect(productDb.deleteProductDb).toBeCalledWith(test_id)
		})
	})

	describe('\n\nUpdate Product', () => {
		it('Should have an productService.updateProduct function', async () => {
			expect(typeof productService.updateProduct).toBe('function')
		})

		it('Should expect deleteProductDb to be fail without id value', async () => {
			await productService.updateProduct()
			expect(productDb.updateProductDb).not.toBeCalled()
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			expect.assertions(2)
			await productService.updateProduct(test_id, test_change)
			expect(productDb.updateProductDb).toBeCalled()
			expect(productDb.updateProductDb).toBeCalledWith(test_id, test_change)
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
