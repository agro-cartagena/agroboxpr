import Service from './Service'
import catalog from '../db_mockup/product.catalog.db'
import UserService from './UserService'

export default class ProductService extends Service {
    static instance = ProductService.instance || new ProductService()

    constructor() { super() }

    async getProductCatalog() {
        return fetch(this._url + 'product')
            .then(response => {
                switch(response.status){
                    case 200:
                        return response.json()

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
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
                alert("Error de conexión.")
                return catalog
            })
    }

    async addNewProduct(product) {
        for(let detail in product){
            if(! product[detail]){
                alert("Entrada vacía.")
                return false
            }
        }

        const body = new FormData()
        for(let attr in product) 
            body.append(attr, typeof product[attr] != "string" ? JSON.stringify(product[attr]) : product[attr])
        
        body.append('file', product.product_image)

        let payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': UserService.instance.webToken
            },
            body: body
        }

        return fetch(this._url + 'product', payload)
            .then(response => {
                switch(response.status){
                    case 201: 
                        return true;

                    case 409:
                        alert("Producto con el mismo nombre ya existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
                }
            })
            .catch(() => {
                alert("Error de conexión.")
                return false;
            })
    }

    async updateProduct(product) {
        for(let detail in product){
            if(! product[detail]){
                alert("Entrada vacía.")
                return false
            }
        }

        // Store productId separately and remove from request body,
        // to avoid error when updating in DB. WILL NOT WORK IF NOT LIKE THIS.
        const productId = product._id
        delete product._id

        const body = new FormData()
        let hasFile = false;
        // New image was uploaded.
        if(typeof product.product_image != 'string') {
            body.append('file', product.product_image)
            hasFile = true;
        }

        for(let attr in product) {
            if (attr == "product_image" && hasFile)
                continue
            else
                body.append(attr, typeof product[attr] != "string" ? JSON.stringify(product[attr]) : product[attr])
        }

        let payload = {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': UserService.instance.webToken
            },
            body: body
        }

        return fetch(this._url + `product/${productId}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true;

                    case 404:
                        alert("Producto no existe en el sistema.")
                        return false;

                    case 409:
                        alert("Producto con el mismo nombre ya existe en el sistema.")
                        return false;

                    default:
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false;
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
                'x-access-token': UserService.instance.webToken
            }
        }

        return fetch(this._url + `product/${product_id}`, payload)
            .then(response => {
                switch(response.status){
                    case 200:
                        return true

                    case 404:
                        alert("Producto no existe en el sistema.")
                        return false;

                    default: 
                        alert("Ha ocurrido un error. Por favor intente más tarde.")
                        return false
                }
            })  
            .catch(() => {
                alert("Error de conexión.")
                return false
            })
    }
}