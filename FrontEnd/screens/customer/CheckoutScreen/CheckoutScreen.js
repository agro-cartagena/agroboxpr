import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import CartService from '../../../services/CartService'
import Logo from '../../../components/Logo/Logo'

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
    const loadPaymentSummary = () => {
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
        <KeyboardAwareScrollView>
            {/* Back Arrow */}
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToCart} />
            </View>

            <Logo />

            <Text style={styles.text}>Información de usuario:</Text>
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
                    // onTouch={() => [goToConfirm, UserService.instance.updateAddress(addressData), UserService.instance.updateUserInformation(userData)] }
                    text="Guardar"
                />
            </View>

            <Text style={styles.text}> Resumen de su orden: </Text>

            <View style={[global_styles.container, styles.cartContainer]}>

                {loadPaymentSummary()}

            </View>

            <Text style={[global_styles.text, styles.total_text]}>Total a pagar:
                <Text style={{ fontWeight: 'bold', color: '#EAC71D', fontSize: 20 }}> ${getTotalPrice()}</Text>
            </Text>

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
                />
                {/* <ATHMButton /> */}
                <Button
                    style={styles.button}
                    text="Efectivo" //Send an alert or popup with conditions of selectiong this payment method and redirect to confirm screen and send info to backend
                    onTouch={() => { alert('Si selecciona el método de pago "Efectivo", usted se compromete a pagar la cantidad al momento de recibir la orden, de lo contrario no podrá adquirir la misma.') }}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}
export default CheckoutScreen