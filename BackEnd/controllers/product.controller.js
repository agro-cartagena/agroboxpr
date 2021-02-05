

const postProduct = async (req, res, next) => {
    const product = req.body

    console.log("Product to post: ", product)

    // try {
    //     await insertApplications(applications, req.query.isSendSupplierEmails, req.query.isSendBuyerEmail)
    //     res.sendStatus(201)
    //     next()
    // } catch (e) {
    //     console.log(e.message)
    //     res.sendStatus(500) && next(error)
    // }
}

const getProducts = async (req, res, next) => {

    console.log("Get all products")

    // try {
    //     await readApplicationsByCompanyIds(companyIdList).then(applicationsList => {
    //         res.status(200).send(applicationsList)
    //     }).catch(error => console.error(error))
    //     next()
    // } catch (e) {
    //     console.log(e.message)
    //     res.sendStatus(500) && next(e)
    // }
}

module.exports = {
    postProduct,
    getProducts,
}