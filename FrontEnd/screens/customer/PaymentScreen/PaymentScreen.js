import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Button from '../../../components/Button/Button'
import { goToCheckout } from '../../../Navigator'
import BackArrow from '../../../components/BackArrow/BackArrow'
import BoxCard from '../../../components/BoxCard/BoxCard'

import CartService from '../../../services/CartService'

import styles from './PaymentScreenStyleSheet'
import global_styles from '../../../styles'

const PaymentScreen = () => {

    const [paymentData, setPaymentData] = React.useState(CartService.instance.getCart())

    const loadPaymentSummary = () => {

        //     const fetchPlaceholder = (target_box) => {
        //         let box = paymentData.find((item) => item._id == target_box._id)

        //         if(box)
        //             return box.box_quantity

        //         return 0
        //     }

        return paymentData.map((element) =>
            <View style={styles.itemContainer} key={element._id}>
                <TouchableOpacity key={element.box_name} style={styles.cardContainer}>
                    <BoxCard
                        id={element._id}
                        name={element.box_name}
                        price={element.box_accumulated_price}
                    />
                </TouchableOpacity>

                <View>
                    <Text style={{ fontSize: 15 }}>  {element.box_quantity} cajas</Text>
                </View>
                {/* <View> */}
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> = ${element.box_accumulated_price * element.box_quantity}</Text>
                {/* </View>  */}
            </View>
        )
    }
    const getTotalPrice = () => {
        let total_price = 0

        paymentData.forEach((item) => { total_price += Number(item.box_accumulated_price) * Number(item.box_quantity) })

        return total_price
    }
    return (
        <ScrollView>
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToCheckout} />
            </View>

            <Text style={styles.text}> Resumen de su orden: </Text>

            <View style={[global_styles.container, styles.cartContainer]}>

                {loadPaymentSummary()}

            </View>

            <Text style={[global_styles.text, styles.total_text]}>Total a pagar:
                <Text style={{ fontWeight: 'bold', color: '#EAC71D', fontSize:20 }}> ${getTotalPrice()}</Text>
            </Text>

            <View style={[global_styles.container, styles.buttonContainer]}>
                {/* Select payment method */}
                <Button
                    style={styles.button}
                    text="Paypal" //They have their own buttons
                />
                <Button
                    style={styles.button}
                    text="ATH Móvil" //They have their own buttons
                />
                <Button
                    style={styles.button}
                    text="Efectivo" //Send an alert or popup with conditions of selectiong this payment method
                />
            </View>
        </ScrollView>
    )
}
export default PaymentScreen
