import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import Button from '../../../components/Button/Button'
import { goToCheckout,goToViewOrders } from '../../../Navigator'
import BackArrow from '../../../components/BackArrow/BackArrow'

import styles from './ConfirmScreenStyleSheet'
import global_styles from '../../../styles'

const ConfirmScreen = () => {
    return (
        <ScrollView>
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToCheckout} />
            </View>

            <Text style={styles.text}> Su orden ha sido confirmada! </Text>

            <View style={[global_styles.container, styles.buttonContainer]}>
                {/* Select payment method */}
                <Button
                
                    style={styles.button}
                    text="Ver todas mis ordenes" //Send an alert or popup with conditions of selectiong this payment method 
                    onTouch={goToViewOrders}
                 /> 
            </View>
        </ScrollView>
    )
}
export default ConfirmScreen
