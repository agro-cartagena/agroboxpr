import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'

import { goToCart, goToPayment } from '../../../Navigator'
import styles from './CheckoutScreenStyleSheet'
import global_styles from '../../../styles'

const CheckoutScreen = () => {
    const [userData, changeUserData] = React.useState({})

    const [addressData, changeAddressData] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            const [userInfo, addressInfo] = await UserService.instance.getUserData()

            changeUserData(userInfo)
            changeAddressData(addressInfo)
        }

        fetchData()
    }, [])

    return (
        <KeyboardAwareScrollView>
            {/* Back Arrow */}
            <View style={styles.arrowContainer}>
                <BackArrow onTouch={goToCart} />
            </View>
            {/* User information */}
            <View style={[global_styles.container, styles.formContainer]}>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Nombre: </Text>
                    <FormInput
                        value={userData.full_name}
                        onChangeText={text => changeUserData({ ...userData, full_name: text })}
                        textContentType="name"
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Email: </Text>
                    <FormInput
                        value={userData.email}
                        onChangeText={text => changeUserData({ ...userData, email: text })}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Teléfono: </Text>
                    <FormInput
                        value={userData.phone}
                        onChangeText={text => changeUserData({ ...userData, phone: text })}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* User address information */}

                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Dirección: </Text>
                    <FormInput
                        value={addressData.street}
                        onChangeText={text => changeAddressData({ ...addressData, street: text })}
                    />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}> Ciudad: </Text>
                    <FormInput
                        value={addressData.city}
                        onChangeText={text => changeAddressData({ ...addressData, city: text })} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Estado: </Text>
                    <FormInput
                        value={addressData.state}
                        onChangeText={text => changeAddressData({ ...addressData, state: text })} />
                </View>
                <View style={styles.formInputContainer}>
                    <Text style={styles.text}>Zipcode: </Text>
                    <FormInput
                        value={addressData.zipcode}
                        onChangeText={text => changeAddressData({ ...addressData, zipcode: text })} />
                </View>
            </View>
            
            {/* Button to continue to next screen */}
            <View style={styles.button}>
                <Button
                    onTouch={goToPayment}
                    // onTouch={() => [goToPayment, UserService.instance.updateAddress(addressData), UserService.instance.updateUserInformation(userData)] }
                    text="Continuar"
                />
            </View>
        </KeyboardAwareScrollView>
    )
}
export default CheckoutScreen