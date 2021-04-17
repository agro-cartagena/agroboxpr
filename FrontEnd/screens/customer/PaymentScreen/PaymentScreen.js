import React from 'react'
import {Text,View, ScrollView} from 'react-native'
import Button from '../../../components/Button/Button'
import { goToCheckout } from '../../../Navigator'
import BackArrow from '../../../components/BackArrow/BackArrow'

import styles from './PaymentScreenStyleSheet'
import global_styles from '../../../styles'

const CheckoutScreen = () => {
    return(
        <ScrollView>
            <View>
                <View style={styles.arrowContainer}>
                    <BackArrow onTouch={goToCheckout} />
                </View>

                <View>
                    <Text> Resumen de su orden: </Text>
                        {/* Order review */}
                        {/* Plus shipping cost */}
                        {/* Total of the order */}
                </View>
            </View>
            <View>
                {/* Select payment method */}
                <Button
                    text = "Paypal" //They have their own buttons
                />
                <Button
                    text = "ATH Móvil" //They have their own buttons
                />
                <Button
                    text = "Efectivo" //Send an alert or popup with conditions of selectiong this payment method
                />
            </View>
        </ScrollView>
    )
}
export default CheckoutScreen
