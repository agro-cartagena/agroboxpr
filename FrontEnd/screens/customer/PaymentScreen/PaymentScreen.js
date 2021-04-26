import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Linking, Image } from 'react-native'
import { WebView } from 'react-native-webview'

import Navigator from '../../../Navigator'
import BackArrow from '../../../components/BackArrow/BackArrow'
import BoxCard from '../../../components/BoxCard/BoxCard'

import CartService from '../../../services/CartService'
import Logo from '../../../components/Logo/Logo'
import styles from './PaymentScreenStyleSheet'

import PopUp from '../../../components/PopUp/PopUp'

const PaymentScreen = (props) => {

    const [paymentData, setPaymentData] = React.useState(CartService.instance.getCart())
    const [showPayPal, togglePayPal] = React.useState(false)

    const getTotalPrice = () => {
        return CartService.instance.getCartTotal()
    }

    const displayPayPal = () => {
        const handlePayPal = (data) => {
            switch(data.title) {
                case 'success':
                    // Submit order.
                    togglePayPal(!showPayPal)
                    break;

                case 'cancel':
                    alert("Canceled")
                    togglePayPal(!showPayPal)
                    break;

                default: 
                    return
            }
        }

        return (
            <WebView
                style={{width: '100%', height: '100%'}}
                source={{uri: 'http://10.0.0.6:5000/api/payment/paypal'}}
                onNavigationStateChange={handlePayPal}
            />
        )
    }

    return (
        <ScrollView>
            <BackArrow onTouch={Navigator.instance.goToCheckout} />

            <Logo/>

            <Text style={styles.header}>Total a pagar: <Text style={{color: '#EAC71D'}}>${getTotalPrice()}</Text></Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('http://10.0.0.6:5000/api/payment/athm')}>
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>ATH Móvil</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/icons/ATHM.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => togglePayPal(!showPayPal)}>
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>PayPal</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/icons/PayPal.png')}
                        />
                    </View>

                    <PopUp
                        state={showPayPal}
                        handler={togglePayPal}
                        content={displayPayPal()}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>Cash</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <View style={[styles.cash]}>
                            <Image
                                style={styles.icon}
                                source={require('../../../assets/icons/Dollar.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default PaymentScreen
