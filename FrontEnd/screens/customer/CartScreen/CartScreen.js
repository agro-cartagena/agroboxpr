import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import BoxCard from '../../../components/BoxCard/BoxCard'
import QuantitySpecifier from '../../../components/QuantitySpecifier/QuantitySpecifier'

import CartService from '../../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../../styles'

import Logo from '../../../components/Logo/Logo'
import Button from '../../../components/Button/Button'

import Navigator from '../../../Navigator'

const CartScreen = () => {
    const [cartData, setCartData] = React.useState(CartService.instance.getCart())

    const loadCart = () => {
        const increaseBoxQuantity = (box) => {
            if(box.box_quantity < 99){
                box.box_quantity += 1
                let total = (cartTotal + box.box_accumulated_price).toFixed(2)
                setCartTotal(Number(total))
            }
        }
    
        const decreaseBoxQuantity = (box) => {
            if(box.box_quantity > 1) {
                box.box_quantity -= 1
                let total = (cartTotal - box.box_accumulated_price).toFixed(2)
                setCartTotal(Number(total))
            }
        }
    
        const changeBoxQuantity = (box, newQuantity) => {
            if(!newQuantity)
                return

            else if(newQuantity <= 0  || isNaN(newQuantity)){
                alert("Cantidad especificada no es aceptada.")
                return
            } 
            
            else if (newQuantity > 99) {
                alert("Máxima cantidad de cajas es 99.")
                return
            }

            else {
                let total = cartTotal - (box.box_accumulated_price * box.box_quantity)

                box.box_quantity = newQuantity
                total = (total + box.box_accumulated_price * newQuantity).toFixed(2)
                setCartTotal(Number(total))
            }
        }

        return cartData.map((box) => 
            <View style={styles.itemContainer} key={box._id}>
                <TouchableOpacity style={styles.cardContainer} onPress={() => Navigator.instance.goToEditCart(box.box_content)}>
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
        cartData.forEach((item) => {total_price += item.box_accumulated_price * item.box_quantity})

        return Number(total_price.toFixed(2))
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
                    onTouch={Navigator.instance.goToCheckout}
                    text="Continuar"
                />
            </View>
        </ScrollView>
    )
}

export default CartScreen