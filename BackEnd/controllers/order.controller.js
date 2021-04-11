const { orderService } = require('../services')

const {
	createOrder,
	readAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
} = orderService    

const postOrder = async (req, res, next) => {
    const order = req.body
    try {
        await createOrder(order)
        res.sendStatus(200)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrder = async (req, res, next) => {
	try {
        await readAllOrders()
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}    
}    

const getById = async (req, res, next) => {
    const id = req.params.id
	try {
        await getOrderById(id)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}    
}    

const update = async (req, res, next) => {
    const id = req.params.id
	try {
        await updateOrder(id)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

const deletion = async (req, res, next) => {
    const id = req.params.id
	try {
        await deleteOrder(id)
		res.sendStatus(200)
		next()
	} catch (e) {
		console.log(e.message)
		res.sendStatus(500) && next(e)
	}
}

module.exports = {
	getOrder,
	getById,
	postOrder,
	update,
	deletion,
}
