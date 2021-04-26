import React from 'react'

export default class CartService {
    static instance = CartService.instance || new CartService()
    _cart = []

    constructor() { }

    addToCart(item) {
        const randomize = (string) => {
            let arr = string.split(""),
                size = arr.length;
    
            for(let currentIndex = (size-1); currentIndex>0; currentIndex--) {
                let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
                [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
            }

            return arr.join("");
        }

        item._id = randomize(item._id)
        this._cart.push({...item})
    }

    getCart() {
        return [...this._cart]
    }

    getCartTotal() {
        let total = 0
        this._cart.forEach((item) => total = total + (item.box_accumulated_price * item.box_quantity))
        return total
    }

    updateCart(box_id, content) {
        this._cart.find((item) => item._id == box_id).box_content = content
    }

    removeFromCart(target_box) {
        let index = this._cart.indexOf(target_box)
        if(index != -1)
            this._cart.splice(index, 1);
    }
}