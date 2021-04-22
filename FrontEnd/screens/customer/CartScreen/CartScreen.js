import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native'
import BoxCard from '../../../components/BoxCard/BoxCard'
import PlusMinus from '../../../components/PlusMinus/PlusMinus'

import CartService from '../../../services/CartService'
import styles from './CartScreenStyleSheet'
import global_styles from '../../../styles'

import TrashCan from '../../../components/TrashCan/TrashCan'
import Logo from '../../../components/Logo/Logo'
import Button from '../../../components/Button/Button'

import { goToCheckout, goToEditCart } from '../../../Navigator'

const CartScreen = () => {

    const [cartData, setCartData] = React.useState(CartService.instance.getCart())

    const loadCart = () => {
        const increaseBoxQuantity = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)
    
            if(box.box_quantity < 99){
                box.box_quantity += 1
                setCartTotal((Number(cartTotal) + Number(box.box_accumulated_price)).toFixed(2))
            }

        }
    
        const decreaseBoxQuantity = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)
    
            //Product already exists in content list.
            if(box.box_quantity > 1) {
                box.box_quantity -= 1
                setCartTotal((Number(cartTotal) - Number(box.box_accumulated_price)).toFixed(2))
            }

        }
    
        const changeBoxQuantity = (target_box, newQuantity) => {
            if(!newQuantity)
                return

            let box = cartData.find((item) => item._id == target_box._id),
                total = Number(cartTotal) - (Number(box.box_accumulated_price) * Number(box.box_quantity))

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

        const fetchPlaceholder = (target_box) => {
            let box = cartData.find((item) => item._id == target_box._id)

            if(box)
                return box.box_quantity

            return 0
        }

        const removeBoxFromCart = (target_box) => {
            // let box = cartData.find((item) => item._id == target_box._id)

            Alert.alert(
                `¿Seguro que desea eliminar la caja ${target_box.box_name} del carrito?`, "",
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: () => {
                            // Not working perfectly
                            setCartData(cartData.filter((box) => box._id != target_box._id))
                            setCartTotal(Number((Number(cartTotal) - Number(target_box.box_accumulated_price)).toFixed(2)))
                        }
                    }
                ]
            )
           
        }

        return cartData.map((element) =>
            <View key={element._id} style={styles.itemContainer}>
                <TouchableOpacity key={element.box_name} style={styles.cardContainer} onPress={() => goToEditCart(element)}>
                    <BoxCard
                        id={element._id}
                        name={element.box_name}
                        price={element.box_accumulated_price}
                    />

                </TouchableOpacity>

                {/* column container */}
                <View style={styles.secondContainer}> 
                {/* row container with the plusminus and price */}
                    <View style={styles.thirdContainer}> 
                        <View style={styles.plusminus} >
                            <PlusMinus
                                onMinus={() => { decreaseBoxQuantity(element) }}
                                onPlus={() => { increaseBoxQuantity(element) }}
                                onText={(text) => changeBoxQuantity(element, text)}
                                placeholder={fetchPlaceholder(element)}
                            />

                        </View>
                        <Text style={styles.total_text}> = ${(element.box_accumulated_price * element.box_quantity).toFixed(2)}</Text>
                    </View>
                    {/* TrashCan Image needs to be changed */}
                    <TrashCan onTouch={() => removeBoxFromCart(element)} />
                </View>
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