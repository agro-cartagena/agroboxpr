const {
	orderService,
	orderContentService,
	productService,
} = require('../../services')
const { orderDb, orderContentDb, productDb } = require('../../db')

const newOrder = require('../mock-data/newOrder.json')
const db = require('../../db/mdb')

const dotenv = require('dotenv')
dotenv.config()

//test variables
let test_order, test_content
let test_id, test_change
let ids = [
	// values taken directly from the dbs for product and orderContent
	//using order with id = 60834e9f3149974a54f8c008
	{ id: '60776c524f15dc23034c0a7b', left: 10 },
	{ id: '60776cd54f15dc23034c0a7c', left: 10 },
	{ id: '60776cf54f15dc23034c0a7d', left: 5 },
	{ id: '60776d284f15dc23034c0a7e', left: 5 },
]

const user_id = '60734b626b9eb2004099f2df'

//db functions within service modified to be written as follow instead of calling using import
orderDb.createOrderDb = jest.fn()
orderContentDb.createOrderContentDb = jest.fn()
orderDb.getOrderByCityDb = jest.fn()
orderDb.getOrderByIdDb = jest.fn()
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
			test_id = '608b06d688732135572a7b0b'
			test_change = { order_name: 'Testing update method', total_price: 10 }
			let order
			console.log(test_id, test_change)
			await orderService.updateOrder(test_id, {
				order_name: 'Testing update method',
				total_price: 10,
			})
			await orderService.getOrderById(test_id).then((result) => {
				order = result
			})
			expect(order.order_name).toBe('Testing update method')
			expect(order.total_price).toBe(10)
		})
	})

	describe('\n\n Manage Inventory', () => {
		it('Should have an orderService.updateOrder function', async () => {
			expect(typeof orderService.manageInventory).toBe('function')
		})

		it('Should expect updateProductDb to be called succesfully', async () => {
			let test_id = '60834e9f3149974a54f8c008'
			console.log(test_id, test_order)
			let init = [
				await productService.getProductById(ids[0].id),
				await productService.getProductById(ids[1].id),
				await productService.getProductById(ids[2].id),
				await productService.getProductById(ids[3].id),
			]
			await orderService.manageInventory(test_id)
			let totals = [
				await productService.getProductById(ids[0].id),
				await productService.getProductById(ids[1].id),
				await productService.getProductById(ids[2].id),
				await productService.getProductById(ids[3].id),
			]
			expect(totals[0].product_quantity_stock).toBe(init[0].product_quantity_stock - ids[0].left)
			expect(totals[1].product_quantity_stock).toBe(init[1].product_quantity_stock - ids[1].left)
			expect(totals[2].product_quantity_stock).toBe(init[2].product_quantity_stock - ids[2].left)
			expect(totals[3].product_quantity_stock).toBe(init[3].product_quantity_stock - ids[3].left)

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
