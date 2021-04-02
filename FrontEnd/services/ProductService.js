import Service from './Service'
import catalog from '../db_mockup/product.catalog.db'

export default class ProductService extends Service {
    static instance = ProductService.instance || new ProductService()

    constructor() { super() }

    async getProductCatalog() {
        return fetch(this._url + 'products')
            .then(response => response.json())
            .then((product_catalog) => { 
                return product_catalog 
            })
            .catch((error) => {
                // Temporary. Should properly handle error.
                return catalog
            })
    }
}