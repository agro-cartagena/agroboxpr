import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Linking, Image, Alert, TouchableWithoutFeedback } from 'react-native'
import { WebView } from 'react-native-webview'

import Navigator from '../../../Navigator'
import BackArrow from '../../../components/BackArrow/BackArrow'
import PopUp from '../../../components/PopUp/PopUp'
import Loader from '../../../components/Loader/Loader'

import OrderService from '../../../services/OrderService'
import CartService from '../../../services/CartService'
import Logo from '../../../components/Logo/Logo'
import styles from './PaymentScreenStyleSheet'


const PaymentScreen = (props) => {
    const [showPayPal, togglePayPal] = React.useState(false)
    const [price, setPrice] = React.useState(0)
    const [transactionId, setTransactionId] = React.useState('N/A')
    const [uploading, setUploading] = React.useState(false)

    React.useEffect(() => {
        setPrice(props.params.order_info.total_price)
    }, [])

    const submitOrder = async (payment_method) => {
        setUploading(true)
        const order = {
            order: {
                ...props.params.order_info,
                payment_method: payment_method, 
                transaction_id: transactionId, 
                order_status: "Pendiente"
            }, 
            order_content: props.params.order_content
        }

        if(await OrderService.instance.submitOrder(order)) {
            await CartService.instance.refreshCart();
            
            setUploading(false)
            Navigator.instance.goToOrderConfirmation()
        }
    }

    const displayPayPal = () => {
        const handlePayPal = async (data) => {
            switch(data.title) {
                case 'success':
                    togglePayPal(!showPayPal)

                    submitOrder("PayPal")
                    break;

                case 'cancel':
                    togglePayPal(!showPayPal)
                    break;

                default: 
                    return
            }
        }

        return (
            <WebView
                style={{width: '100%', height: '100%'}}
                // Change uri source to deployed route url.
                source={{uri: 'http://10.0.0.6:5000/api/payment/paypal'}}
                onNavigationStateChange={handlePayPal}
                onMessage={(event) => {setTransactionId(event.nativeEvent.data)}}
                injectedJavaScript={`document.getElementById("price").value=${price}; document.f1.submit(); true;`}
            />
        )
    }

    const handleCash = () => {
        Alert.alert(
            'Términos y Condiciones', 
            `Al escoger el metodo de pago "Cash" usted se compromete 
            a hacer el pagarés en el momento de entregársele su orden. 
            De no ser así, su orden puede quedar anulada y no se le 
            entregarán los productos. Por favor indique si acepta nuestros 
            términos y condiciones.`, 
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Aceptar',
                    onPress: () => {
                        submitOrder("Cash")
                    }
                }
            ]
        )
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback style={styles.loaderOverlay}>
                <Loader
                    loading={uploading}
                />
            </TouchableWithoutFeedback>

            <BackArrow onTouch={Navigator.instance.goToCheckout} />

            <Logo/>

            <Text style={styles.header}>Total a pagar: <Text style={{color: '#EAC71D'}}>${price}</Text></Text>

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

                <TouchableOpacity style={styles.button} onPress={handleCash}>
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
