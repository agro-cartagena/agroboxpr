import React from 'react'

export default class CartService {
    static instance = CartService.instance || new CartService()
    _cart = []

    constructor() { }

    addToCart(item) {
        this._cart.push(item)
    }

    getCart() {
        return this._cart
    }
}