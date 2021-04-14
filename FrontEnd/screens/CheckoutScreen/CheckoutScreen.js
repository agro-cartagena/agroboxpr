import React from 'react'
import {Text,View, ScrollView} from 'react-native'
import Button from '../../components/Button/Button'
import BackArrow from '../../components/BackArrow/BackArrow'

import { goToCart, goToPayment } from '../../Navigator'
import styles from './CheckoutScreenStyleSheet'
import global_styles from '../../styles'

const CheckoutScreen = () => {
    return(
        <ScrollView>
            <View>
                <View style={styles.arrowContainer}>
                    <BackArrow onTouch={goToCart} />
                </View>

                <View>
                    {/*  User information */}
                    {/* FormInputs for user information */}
                    <Text> Checkout Screen works! </Text>

                    {/* user address information */}
                    {/* FormInputs */}
                </View>
            </View>
            <View>
                {/* Button to continue to next screen */}
                <Button
                    onTouch = {goToPayment}
                    text = "Continuar"
                />
            </View>
        </ScrollView>
    )
}
export default CheckoutScreen