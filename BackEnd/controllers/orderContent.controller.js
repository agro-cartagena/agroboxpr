const { orderContentService } = require('../services')
const { createOrderContent, getOrderContent, getOrderContentById } = orderContentService

const postOrderContent = async (req, res, next) => {
    const orderContent = req.body
    try {
        await createOrderContent(orderContent)
        res.status(201) && next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)&& next(e)
    }
}

const getContent = async (req, res, next) => {
    try {
        await getOrderContent().then((result) => {
            res.status(200).send(result)
            next()
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)&& next(e)
    }
}

const getContentById = async (req, res, next) => {
    const id = req.params.id
    try {
        await getOrderContentById(id).then((result) => {
            res.status(200).send(result)
            next()
        })
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)&& next(e)
    }
}

module.exports = {
    postOrderContent,
    getContent,
    getContentById
}
