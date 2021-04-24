import React from 'react'
import { Text, View, ScrollView, Alert, TouchableOpacity, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AppLink from 'react-native-app-link';
import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import CartService from '../../../services/CartService'
import Logo from '../../../components/Logo/Logo'
import BoxCard from '../../../components/BoxCard/BoxCard'

import { goToCart, goToConfirm } from '../../../Navigator'
import styles from './CheckoutScreenStyleSheet'
import global_styles from '../../../styles'

const CheckoutScreen = () => {
    const [userData, changeUserData] = React.useState({})

    const [addressData, changeAddressData] = React.useState({})

    const [paymentData, setPaymentData] = React.useState(CartService.instance.getCart())

    React.useEffect(() => {
        async function fetchData() {
            const [userInfo, addressInfo] = await UserService.instance.getUserData()

            changeUserData(userInfo)
            changeAddressData(addressInfo)
        }

        fetchData()
    }, [])

    const getTotalPrice = () => {
        let total_price = 0

        paymentData.forEach((item) => { total_price += Number(item.box_accumulated_price) * Number(item.box_quantity) })

        return total_price
    }
    
    const loadPaymentSummary = () => {
        return paymentData.map((element) =>
            <View style={styles.itemContainer} key={element._id}>
                <Text style={styles.nameText}>{element.box_name}</Text>
                {/* <TouchableOpacity key={element.box_name} style={styles.cardContainer}>
                    <BoxCard
                        id={element._id}
                        name={element.box_name}
                        price={element.box_accumulated_price}
                    />
                </TouchableOpacity> */}

                <View>
                    <Text style={{ fontSize: 15 }}>  {element.box_quantity} cajas</Text>
                </View>
               
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}> = ${element.box_accumulated_price * element.box_quantity}</Text>
            </View>
        )
    }
    
    const cashSelected = ()=>{
        Alert.alert(
            `Si selecciona el método de pago "Efectivo", usted se compromete a pagar la cantidad al momento de recibir la orden, de lo contrario no podrá adquirir la misma.`, '',
            [
                {
                    text: 'Acepto',
                    //not working!!!
                    onPress: async() => {goToConfirm} //Se envia la informacion de la orden a backEnd y se envia al confirm screen
                }
            ]
        )
    }

    const goToATHMovilApp = ()=>{
        // Linking.canOpenURL("app://athmovil").catch(err => console.error('An error occurred', err))
        AppLink.maybeOpenURL("app://athmovil", { appName: 'ATH Movil', appStoreId: '658539297', appStoreLocale:'us', playStoreId:'com.evertec.athmovil.android'}).then(() => {
            // do stuff
          })
          .catch((err) => {
            alert('Ha ocurrido un error')
          });
    }
    return (
        <KeyboardAwareScrollView>
            {/* Back Arrow */}
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToCart} />
            </View>

            <Logo />

            <Text style={styles.text}>Información de comprador:</Text>
            {/* User information */}
            <View style={[global_styles.container, styles.formContainer]}>
                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}>Nombre: </Text>
                    <FormInput
                        value={userData.full_name}
                        onChangeText={text => changeUserData({ ...userData, full_name: text })}
                        textContentType="name"
                    />
                </View>

                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}>Teléfono: </Text>
                    <FormInput
                        value={userData.phone}
                        onChangeText={text => changeUserData({ ...userData, phone: text })}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* User address information */}

                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}>Dirección: </Text>
                    <FormInput
                        value={addressData.street}
                        onChangeText={text => changeAddressData({ ...addressData, street: text })}
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}> Ciudad: </Text>
                    <FormInput
                        value={addressData.city}
                        onChangeText={text => changeAddressData({ ...addressData, city: text })} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}>Estado: </Text>
                    <FormInput
                        value={addressData.state}
                        onChangeText={text => changeAddressData({ ...addressData, state: text })} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.form_text}>Zipcode: </Text>
                    <FormInput
                        value={addressData.zipcode}
                        onChangeText={text => changeAddressData({ ...addressData, zipcode: text })} />
                </View>
            </View>

            {/* Button to continue to next screen */}
            <View style={styles.button}>
                <Button
                    // onTouch={} //send information to backend
                    // onTouch={() => [UserService.instance.updateAddress(addressData), UserService.instance.updateUserInformation(userData)] }
                    text="Guardar"
                />
            </View>

            <Text style={styles.text}> Resumen de su orden: </Text>

            <View style={[global_styles.container, styles.cartContainer]}>

                {loadPaymentSummary()}

            </View>

            <View style={styles.textContainer}>
                <Text style={[global_styles.text, styles.total_text]}>Total a pagar:
                    <Text style={{ fontWeight: 'bold', color: 'rgb(151, 184, 56)', fontSize: 20 }}> ${getTotalPrice()}</Text>
                </Text>
            </View>
            
            <View style={[global_styles.container, styles.buttonContainer]}>
                {/* Select payment method */}
                {/* <script src="https://www.paypal.com/sdk/js?client-id=test"></script> */}
                {/* <script>paypal.Buttons().render('body');</script>        */}


                <Text style={styles.text}>Selecciona el método de pago:</Text>
                <Button
                    style={styles.button}

                    text="Paypal" //They have their own buttons
                />

                <Button
                    style={styles.button}
                    text="ATH Móvil" //They have their own buttons
                    onTouch={goToATHMovilApp}
                />
                {/* <ATHMButton /> */}
                <Button
                    style={styles.button}
                    text="Efectivo" //Send an alert or popup with conditions of selectiong this payment method and redirect to confirm screen and send info to backend
                    onTouch={cashSelected}
                    // onTouch={() => { alert('Si selecciona el método de pago "Efectivo", usted se compromete a pagar la cantidad al momento de recibir la orden, de lo contrario no podrá adquirir la misma.') }}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}
export default CheckoutScreen