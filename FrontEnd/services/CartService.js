import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CartService {
    static instance = CartService.instance || new CartService()
    _cart = []

    constructor() { 
        // this.loadCart().catch(error => this._cart = []) 
    }

    async loadCart() {
        await AsyncStorage.getItem('user_cart')
            .then(cart => this._cart = cart)
            .catch(error => this._cart = [])
    }

    async saveCart() {
        await AsyncStorage.setItem('user_cart', this._cart)
            .catch(error => alert('error saving cart.'))
    }

    addToCart(item) {
        this._cart.push(item)
        // this.saveCart();
    }

    getCart() {
        return this._cart
    }
}