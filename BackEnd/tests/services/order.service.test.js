const { orderService, orderContentService } = require('../../services')
const { orderDb, orderContentDb, productDb } = require('../../db')

const newOrder = require('../mock-data/newOrder.json')
const db = require('../../db/mdb')

const dotenv = require('dotenv')
dotenv.config()

//test variables
let test_order, test_content
let test_id, test_change
let product_ids = {
	ids: [
		'60776cd54f15dc23034c0a7c',
		'60776cf54f15dc23034c0a7d',
		'60776d284f15dc23034c0a7e',
		'60819070fb6a3f309e2db143',
	],
}
const user_id = '60734b626b9eb2004099f2df'

//db functions within service modified to be written as follow instead of calling using import
orderDb.createOrderDb = jest.fn()
orderContentDb.createOrderContentDb = jest.fn()
orderDb.getOrderByCityDb = jest.fn()
orderDb.getOrderByIdDb = jest.fn()
orderDb.updateOrderDb = jest.fn()
productDb.decreaseProductDb = jest.fn()

describe('Order Service Suite', () => {
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
			.getOrderById('60834e9f3149974a54f8c008')
			.then((ord) => {
				test_order = {
					order_name: ord.order_name,
					order_number: ord.order_number,
					delivery_address: ord.delivery_address,
					delivery_city: ord.delivery_city,
					delivery_zipcode: ord.delivery_zipcode,
					total_price: ord.price,
					payment_method: ord.payment_method,
					order_status: ord.order_status,
				}
				test_id = ord._id
				test_change = { order_name: ord.order_name + ' updated' }
			})
		await orderContentService
			.getOrderContent('60834e9f3149974a54f8c008')
			.then((content) => {
				test_content = content
			})
	})

	describe('\n\nInsert order\n', () => {
		it('Should have an createOrder function', () => {
			expect(typeof orderService.createOrder).toBe('function')
		})

		it('Should expect createOrderDb & createOrderContentDb to be called sucessfully', async () => {
			expect.assertions(2)
			await orderService.createOrder(
				newOrder.order,
				newOrder.orderContent,
				user_id
			)
			expect(orderDb.createOrderDb).toBeCalledWith({
				order_status: 'pendiente',
				user_id: '60734b626b9eb2004099f2df',
				...newOrder.order,
			})
			expect(orderContentDb.createOrderContentDb).toBeCalledWith({
				...newOrder.orderContent,
			})
		})
	})

	describe('\n\nUpdate order', () => {
		it('Should have an orderService.updateOrder function', async () => {
			expect(typeof orderService.updateOrder).toBe('function')
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			expect.assertions(2)
			console.log(test_id, test_change)
			await orderService.updateOrder(test_id, test_change)
			expect(orderDb.updateOrderDb).toBeCalled()
			expect(orderDb.updateOrderDb).toBeCalledWith(test_id, test_change)
		})
	})

	describe('\n\n Manage Inventory', () => {
		it('Should have an orderService.updateOrder function', async () => {
			expect(typeof orderService.manageInventory).toBe('function')
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			console.log(test_id, test_order)
			await orderService.manageInventory(test_id)
			expect(productDb.decreaseProductDb).toBeCalled()
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
