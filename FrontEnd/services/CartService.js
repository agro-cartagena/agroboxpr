import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CartService {
    static instance = CartService.instance || new CartService()
    _cart = [
        {
            box_id: 1,
            box_name: "AgroBox",
            box_price: "47.33",
            quantity: 2,
            box_content: [
                {

                }
            ]
        },
        {
            box_id: 2,
            box_name: "SancochoBox",
            box_price: "40.00",
            quantity: 1,
            box_content: [
                {

                }
            ]
        },
        {
            box_id: 3,
            box_name: "SofritoBox",
            box_price: "37.00",
            quantity: 4,
            box_content: [
                {

                }
            ]
        }
    ];

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
        // console.log(this._cart)
        // JSON.stringify(this._cart)
        return this._cart

    }
}