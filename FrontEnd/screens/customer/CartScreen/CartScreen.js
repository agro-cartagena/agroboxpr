import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import BoxCard from '../../../components/BoxCard/BoxCard'
import QuantitySpecifier from '../../../components/QuantitySpecifier/QuantitySpecifier'

import CartService from '../../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../../styles'

import Logo from '../../../components/Logo/Logo'
import Button from '../../../components/Button/Button'

import { goToCheckout, goToEditCart } from '../../../Navigator'

const CartScreen = () => {

    const [cartData, setCartData] = React.useState(CartService.instance.getCart())

    const loadCart = () => {
        const increaseBoxQuantity = (box) => {
            if(box.box_quantity < 99){
                box.box_quantity += 1
                setCartTotal((Number(cartTotal) + Number(box.box_accumulated_price)).toFixed(2))
            }
        }
    
        const decreaseBoxQuantity = (box) => {
            if(box.box_quantity > 1) {
                box.box_quantity -= 1
                setCartTotal((Number(cartTotal) - Number(box.box_accumulated_price)).toFixed(2))
            }
        }
    
        const changeBoxQuantity = (box, newQuantity) => {
            if(!newQuantity)
                return

            let total = Number(cartTotal) - (Number(box.box_accumulated_price) * Number(box.box_quantity))

            if(newQuantity <= 0  || isNaN(newQuantity)){
                box.box_quantity = 1
                setCartTotal((total + Number(box.box_accumulated_price)).toFixed(2))
                alert("Mínima cantidad de cajas es 1.")
            }

            else if (newQuantity > 99) {
                box.box_quantity = 99
                setCartTotal((total + Number(box.box_accumulated_price) * 99).toFixed(2))
                alert("Máxima cantidad de cajas es 99.")
            }

            else {
                box.box_quantity = Number(newQuantity)
                setCartTotal((total + Number(box.box_accumulated_price) * Number(newQuantity)).toFixed(2))
            }
        }

        return cartData.map((box) => 
            <View style={styles.itemContainer} key={box._id}>
                <TouchableOpacity style={styles.cardContainer} onPress={() => goToEditCart(box.box_content)}>
                    <BoxCard
                        id={box._id}
                        name={box.box_name}
                        price={box.box_accumulated_price}
                    />
                </TouchableOpacity>

                <View style={styles.QuantitySpecifier} >
                    <QuantitySpecifier
                        onMinus={() => {decreaseBoxQuantity(box)}}
                        onPlus={() => {increaseBoxQuantity(box)}}
                        onText={(text) => changeBoxQuantity(box, text)}
                        placeholder={box.box_quantity}
                    />
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> = ${(box.box_accumulated_price * box.box_quantity).toFixed(2)}</Text>

            </View>
        )
    }

    const getTotalPrice = () => {
        let total_price = 0

        cartData.forEach((item) => {total_price += Number(item.box_accumulated_price) * Number(item.box_quantity)})

        return total_price.toFixed(2)
    }

    const [cartTotal, setCartTotal] = React.useState(getTotalPrice())

    return(
        <ScrollView>
            <Logo/>

            <View style={styles.cartContainer}>
                {loadCart()}
            </View>

            <Text style={[global_styles.text, styles.text]}>Total de compra: 
                <Text style={{fontWeight: 'bold', color: '#EAC71D'}}> ${cartTotal}</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    onTouch={goToCheckout}
                    text="Continuar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen