import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import BoxCard from '../../components/BoxCard/BoxCard'
import PlusMinus from '../../components/PlusMinus/PlusMinus'

import CartService from '../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../styles'

import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'
import cart_list from '../../db_mockup/cart.db'

const CartScreen = () => {
    let cart = []

    const [boxData, setBoxData] = React.useState({})

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
                    
                    <View style={styles.plusminus}>
                        <PlusMinus 
                             onMinus={() => { if(boxData.box_quantity > 1) setBoxData({ ...boxData, box_quantity: boxData.box_quantity -= 1})}}
                             onPlus={()=>{ if(boxData.box_quantity < 100) setBoxData({ ...boxData, box_quantity: boxData.box_quantity += 1})}}
                             placeholder={ boxData.box_quantity }
                        />
                    </View>
                    
                    {/* <Text>${item.box_price} </Text> */}
                    {/* <Text>x{item.quantity} </Text> */}
                    <Text style={{fontWeight: 'bold', fontSize: 15}}> = ${item.box_price*item.quantity}</Text>
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
                <Text style={{fontWeight: 'bold', color: '#EAC71D'}}> ${80}</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    text="Pagar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen