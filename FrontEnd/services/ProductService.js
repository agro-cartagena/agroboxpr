import Service from './Service'
import catalog from '../db_mockup/product.catalog.db'
import UserService from './UserService'

export default class ProductService extends Service {
    static instance = ProductService.instance || new ProductService()

    constructor() { super() }

    async getProductCatalog() {
        return fetch(this._url + 'product')
            .then(response => response.json())
            .then((product_catalog) => { 
                // Sort object by keys.
                const ordered = Object.keys(product_catalog).sort().reduce(
                    (obj, key) => { 
                      obj[key] = product_catalog[key]; 
                      return obj;
                    }, 
                    {}
                  );

                return ordered 
            })
            .catch((error) => {
                // Temporary. Should properly handle error.
                alert("Error de conexión.")
                return catalog
            })
    }

    async addNewProduct(product) {
        for(detail in product){
            if(! product[detail]){
                alert("Entrada vacía.")
                return false
            }
        }

        let payload = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify(product)
        }

        return fetch(this._url + 'product', payload)
            .then(response => {
                if(response.status == 201)
                    return true
                
                else{
                    alert("Ha ocurrido un error. Por favor intente de nuevo.")
                    return false
                }
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
    }

    async updateProduct(product) {
        for(detail in product){
            if(! product[detail]){
                alert("Entrada vacía.")
                return false
            }
        }

        // Store productId separately and remove from request body,
        // to avoid error when updating in DB. WILL NOT WORK IF NOT LIKE THIS.
        const productId = product._id
        delete product._id

        let payload = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': UserService.instance.webToken
            },
            body: JSON.stringify(product)
        }

        return fetch(this._url + `product/${productId}`, payload)
            .then(response => {
                if(response.status == 200)
                    return true
                
                else{
                    alert("Ha ocurrido un error. Por favor intente de nuevo.")
                    return false
                }
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
    }

    async removeProduct(product_id) {
        let payload = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'x-access-token': UserService.instance.webToken
            }
        }

        return true
        return fetch(this._url + `product/remove/${product_id}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true

                    default: 
                        return false
                }
            })  
            .catch(() => {
                alert("Error de conexión.")
                return false
            })
    }
}