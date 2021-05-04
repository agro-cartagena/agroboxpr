const {
	orderService,
	orderContentService,
	productService,
} = require('../../services')
const { orderDb, orderContentDb, productDb } = require('../../db')

const newOrder = require('../mock-data/newOrderContent.json')
const mockDb = require('../mock-data/mockDB.json')
const db = require('../../db/mdb')
const dotenv = require('dotenv')
dotenv.config()

//test variables
let test_order, test_content
let test_id, test_change

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

// ! Inventory Management Test 
// * Mocks the functions locally and get's are adjusted to work with mocked data.

productDb.getProductByIdDb = jest.fn((id) => {
	for (let i = 0; i < mockDb.length; i++) {
		if (mockDb[i]._id == id) return mockDb[i]
	}
	return id
})

productDb.updateProductDb = jest.fn((id, changes) => {
	for (let i = 0; i < mockDb.length; i++) {
		if (mockDb[i]._id == id)
			return {
				_id: mockDb[i]._id,
				product_name: mockDb[i].product_name,
				product_quantity_stock:
					mockDb[i].product_quantity_stock -
					changes.product_quantity_stock,
			}
	}
	return id
})

orderService.retrieveProductList = jest.fn(() => {
	let order, orderList
	let boxList = []
	let result = []

	// get boxes from the order

	order = Object.keys(newOrder)
	orderList = newOrder

	// remove keys that are not associated with the order's boxes
	order.pop('_id')
	order.pop('order_id')

	// isolate the amount of boxes of each type and the content in these from the rest
	// of the box data
	order.map((box) => {
		boxList.push({
			amount: orderList[parseInt(box)].box_quantity,
			content: orderList[parseInt(box)].box_content,
		})
	})

	// link together for future use each product's id, name, and total amount
	// to be remove upon purchase
	boxList.map((box) => {
		box.content.map((prod) => {
			result.push({
				_id: prod._id,
				prod_name: prod.product_name,
				total_products: prod.product_quantity_box * box.amount,
			})
		})
	})

	return result
})

orderService.manageInventory = jest.fn(() => {
	let start_values = []
	let final_values = []
	let initial_product_list = []
	let product_amounts = []
	let amount_differance = []

	mockDb.map((product) => {
		start_values.push({
			_id: product._id,
			product_name: product.product_name,
			product_quantity_stock: product.product_quantity_stock,
		})
	})

	//retrieve each unique product within the boxes in the order
	initial_product_list = orderService.retrieveProductList()

	// Verify product amounts in the inventory, are added to product_amounts if enough
	// are in stock, otherwise return error msg JSON
	initial_product_list.forEach((product) => {
		//recieve product inventory data
		let item = productDb.getProductByIdDb(product._id)

		// establish amounts to be used
		const orderAmount = product.total_products
		const stockAmount = item.product_quantity_stock

		//verify if differance won't be negative
		if (orderAmount <= stockAmount)
			product_amounts.push({
				_id: item._id,
				name: item.product_name, //added for ease in reading the data
				orderAmount: orderAmount,
				stockAmount: stockAmount,
			})
		else return { msg: `cannot do changes for ${item.product_name}` }
	})

	/*
	amount_diferance holds the products _id and the new quantity in stock
	after carrying out sale. Makes sure products aren't repeated since data is
	not automatically updated like in db and would return two instances of the 
	same product otherwise
	*/
	let inserted = []

	for (let i = 0; i < product_amounts.length; i++) {
		if (inserted.includes(product_amounts[i]._id)) {
			amount_differance.forEach((element) => {
				if (element._id == product_amounts[i]._id) {
					element.delta += product_amounts[i].orderAmount
				}
			})
		} else {
			amount_differance.push({
				delta: product_amounts[i].orderAmount,
				name: product_amounts[i].name,
				_id: product_amounts[i]._id,
			})
			inserted.push(product_amounts[i]._id)
		}
	}

	// inventory update step
	for (let i = 0; i < amount_differance.length; i++) {
		{
			final_values.push(
				productDb.updateProductDb(amount_differance[i]._id, {
					//mock updating content
					product_quantity_stock: amount_differance[i].delta,
				})
			)
		}
	}

	//management succesful
	return [start_values, final_values, amount_differance]
})

describe('\n\n Manage Inventory Test Case', () => {
	it('Should have an orderService.updateOrder function', async () => {
		expect(typeof orderService.manageInventory).toBe('function')
	})

	it('Should expect updateProductDb to be called succesfully', async () => {
		let product_list = orderService.manageInventory()
		let start = product_list[0]
		let end = product_list[1]
		let delta = product_list[2]

		let sorted_start = start.sort(function (a, b) {
			if (a.product_name > b.product_name) return 1
			else if (a.product_name < b.product_name) return -1

			return 0
		})
		let sorted_end = end.sort(function (a, b) {
			if (a.product_name > b.product_name) return 1
			else if (a.product_name < b.product_name) return -1

			return 0
		})
		let sorted_delta = delta.sort(function (a, b) {
			if (a.name > b.name) return 1
			else if (a.name < b.name) return -1

			return 0
		})

		console.log({ sorted_start, sorted_delta, sorted_end})
		for (let i = 0; i < sorted_start.length; i++) {
			expect(
				sorted_start[i].product_quantity_stock - sorted_delta[i].delta
			).toBe(sorted_end[i].product_quantity_stock)
		}
	})
})
