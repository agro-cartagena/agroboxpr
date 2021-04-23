import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import BoxCard from '../../../components/BoxCard/BoxCard'
import QuantitySpecifier from '../../../components/QuantitySpecifier/QuantitySpecifier'

import CartService from '../../../services/CartService'
import UserService from '../../../services/UserService'
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

        const askToRemove = (target_box) => {
            Alert.alert(
                `¿Desea remover ${target_box.box_name} del carrito?`, '',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Remover',
                        onPress: () => {
                            CartService.instance.removeFromCart(target_box)
                            setCartData(CartService.instance.getCart())
                        }
                    }
                ]
            )
        }

        return cartData.map((box, index) => 
            <View style={[styles.itemContainer, cartData[index+1] ? styles.hr : {}]} key={box._id}>
                <TouchableOpacity style={styles.cardContainer} 
                    onPress={() => Navigator.instance.goToEditCart([...box.box_content])}>
                    <BoxCard
                        id={box._id}
                        name={box.box_name}
                        price={`$${box.box_accumulated_price}`}
                        fontSize={{fontSize: RFPercentage(2)}}
                        
                    />
                </TouchableOpacity>

                <View style={styles.boxPriceContainer}>
                    <View style={styles.quantitySpecifier} >
                        <QuantitySpecifier
                            onMinus={() => {decreaseBoxQuantity(box)}}
                            onPlus={() => {increaseBoxQuantity(box)}}
                            onText={(text) => changeBoxQuantity(box, text)}
                            placeholder={box.box_quantity}
                        />
                    </View>

                    <Text style={styles.quantityText}> = ${(box.box_accumulated_price * box.box_quantity).toFixed(2)}</Text>
                </View>
                
                <TouchableOpacity style={styles.iconContainer} onPress={() => askToRemove(box)}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/icons/Trash(Fill).png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const getTotalPrice = () => {
        let total_price = 0
        cartData.forEach((item) => {total_price += item.box_accumulated_price * item.box_quantity})

        return Number(total_price.toFixed(2))
    }

    const displayCart = () => {
        if(cartData.length == 0) {
            return (
                <View style={styles.emptyCartTextContainer}>
                    <Text style={[styles.emptyCartText, styles.text]}>Sus artículos a comprar aparecerán aquí.</Text>
                    <Text style={[styles.redirectionText, styles.text]} onPress={Navigator.instance.goToHome}>¡Llenar carrito!</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.cartContainer}>
                        {loadCart()}
                    </View>

                    <Text style={[global_styles.text, styles.text]}>Total de compra: 
                        <Text style={{fontWeight: 'bold', color: '#EAC71D'}}> ${cartTotal}</Text>
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            onTouch={() => {
                                if(!UserService.instance.isAuthenticated()) {
                                    alert("Por favor inicie una sesión o cree una cuenta nueva para proceder con su orden.")
                                    Navigator.instance.goToLogin(true)
                                } else {
                                    Navigator.instance.goToCheckout()
                                }
                                
                            }}
                            text="Continuar"
                        />
                    </View>
                </View>
            )
        }
    }

    const [cartTotal, setCartTotal] = React.useState(getTotalPrice())

    return(
        <ScrollView>
            <Logo/>

            {displayCart()}
        </ScrollView>
    )
}

export default CartScreen