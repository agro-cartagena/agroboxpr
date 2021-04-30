import AsyncStorage from '@react-native-async-storage/async-storage'

export default class CartService {
    static instance = CartService.instance || new CartService()

    constructor() { }

    async getCart() {
        return AsyncStorage.getItem('cart')
            .then(async (result) => {
                if(!result) {
                    // If key does not yet exist in storage, create it.
                    await AsyncStorage.setItem('cart', JSON.stringify([]))
                    return []
                } else {
                    return JSON.parse(result)
                }
            })
    }

    async addToCart(item) {
        const randomize = (string) => {
            let arr = string.split(""),
                size = arr.length;
    
            for(let currentIndex = (size-1); currentIndex>0; currentIndex--) {
                let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
                [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
            }

            return arr.join("");
        }

        let cart = await this.getCart()
        item.key = randomize(item._id)

        cart.push(item)

        return AsyncStorage.setItem('cart', JSON.stringify(cart))
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }

    async getCartTotal() {
        let cart = await this.getCart(),
            total = 0

        cart.forEach((item) => total += (item.box_accumulated_price * item.box_quantity))
        return total
    }

    async removeFromCart(target_box) {
        let cart = await this.getCart();
        cart = cart.filter((item) => item.key != target_box.key)

        return await AsyncStorage.setItem('cart', JSON.stringify(cart))
            .then(() => {
                return true;
            })
            .catch(() => {
                alert("Ha ocurrido un error. Por favor intente más tarde.")
                return false;
            })
    }

    async updateCart(box) {
        let cart = await this.getCart(), 
            target_box = cart.find((item) => item.key == box.key)

        target_box.box_accumulated_price = box.box_accumulated_price;
        target_box.box_content = box.box_content;
        
        return await AsyncStorage.setItem('cart', JSON.stringify(cart))
            .then(() => {
                return true;
            })
            .catch(() => {
                alert("Ha ocurrido un error. Por favor intente más tarde.")
                return false;
            })
    }

    async refreshCart() {
        return await AsyncStorage.setItem('cart', JSON.stringify([]))
            .then(() => {
                return true;
            })
            .catch(() => {
                alert("Ha ocurrido un error. Por favor intente más tarde.")
                return false;
            })
    }
}