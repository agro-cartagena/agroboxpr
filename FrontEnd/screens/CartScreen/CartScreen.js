import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import BoxCard from '../../components/BoxCard/BoxCard'

import CartService from '../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../styles'

import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import cart_list from '../../db_mockup/cart.db'

const CartScreen = () => {
    let cart = []

    const loadCart = async () => {
        cart_list.forEach((item) => {
            // alert(JSON.stringify(item))
            cart.push(
                <View style={styles.itemContainer}>
                    <View key={item.box_name} style={styles.cardContainer}>
                        <BoxCard
                            id={item.box_id}
                            name={item.box_name}
                            image={item.box_image}
                        />
                    </View>

                    <Text>${item.box_price} </Text>
                    <Text>x{item.quantity} </Text>
                    <Text>= ${item.box_price*item.quantity}</Text>
                </View>


                // Need to wrap BoxCard in a View and
                // add another View for price, quantity, and total
            )
        })
    }

    loadCart()

    return(
        <ScrollView>
            <Logo/>

            <View style={styles.cartContainer}>
                {cart}
            </View>

            <Text style={[global_styles.text, styles.text]}>Total de compra: 
                <Text style={{fontWeight: 'bold'}}> ${80}</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    text="Confirmar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen