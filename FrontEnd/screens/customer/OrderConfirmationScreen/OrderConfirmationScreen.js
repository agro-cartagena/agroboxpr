import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import Button from '../../../components/Button/Button'

import Navigator from '../../../Navigator'
import Logo from '../../../components/Logo/Logo'
import styles from './OrderConfirmationScreenStyleSheet'

const OrderConfirmationScreen = () => {
    return (
        <ScrollView>
            <Logo/>

            <Text style={styles.text}>¡Su órden ha sido confirmada!</Text>

            <View style={styles.buttonContainer}>
                <Button
                    text="Ver Mis Órdenes"
                    onTouch={() => Navigator.instance.goToViewOrders()}
                 /> 
            </View>
        </ScrollView>
    )
}
export default OrderConfirmationScreen