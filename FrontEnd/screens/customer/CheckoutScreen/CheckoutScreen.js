import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Button from '../../../components/Button/Button'
import BackArrow from '../../../components/BackArrow/BackArrow'
import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'

import Navigator from '../../../Navigator'
import styles from './CheckoutScreenStyleSheet'
import global_styles from '../../../styles'

import Localizer from '../../../components/Localizer/Localizer'
import Loader from '../../../components/Loader/Loader'

const CheckoutScreen = (props) => {

    const [userData, changeUserData] = React.useState({})
    const [addressData, changeAddressData] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            const [userInfo, addressInfo] = await UserService.instance.getUserData()

            changeUserData(userInfo)
            changeAddressData(addressInfo)
            setLoading(false)
        }

        fetchData()
    }, [])

    const submitHandler = () => {
        for(let property in userData){
            if(!userData[property]) {
                alert("Entrada vacía.")
                return
            }
        }

        for(let property in addressData) {
            if(!addressData[property]) {
                alert("Entrada vacía.")
                return
            }
        }

        const order = {
            order_info: {
                ...props.params.order_info,
                order_name: userData.name,
                order_number: userData.phone,
                delivery_address: addressData.address,
                delivery_city: addressData.city,
                delivery_state: addressData.state,
                delivery_zipcode: addressData.zipcode
            }, 
            order_content: props.params.order_content
        }

        Navigator.instance.goToPayment(order)
    }

    return loading 
        ? 
            (   
                <Loader loading={loading}/>
            )
        :
            (
                <KeyboardAwareScrollView>
                    {/* Back Arrow */}
                    <BackArrow onTouch={Navigator.instance.goToCart} />

                    <Text style={styles.header}>Información de Entrega</Text>

                    {/* User information */}
                    <View style={[global_styles.container, styles.formContainer]}>
                        <View style={styles.formInputContainer}>
                            <Text style={styles.text}>Nombre: </Text>
                            <FormInput
                                value={userData.name}
                                onChangeText={text => changeUserData({ ...userData, name: text })}
                                textContentType="name"
                            />
                        </View>

                        <View style={styles.formInputContainer}>
                            <Text style={styles.text}>Teléfono: </Text>
                            <FormInput
                                value={String(userData.phone)}
                                onChangeText={text => changeUserData({ ...userData, phone: text })}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* User address information */}

                        <View style={styles.hrContainer}>
                            <View style={styles.hr} />
                        </View>

                        <View style={[styles.formInputContainer]}>
                            <Text style={styles.text}>Calle: </Text>
                            <FormInput
                                value={addressData.address}
                                onChangeText={text => changeAddressData({ ...addressData, address: text })}
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
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                onTouch={submitHandler}
                                text="Continuar"
                            />
                        </View>

                        <View style={styles.localizerContainer}>
                            <Localizer
                                addressHandler={changeAddressData}
                            />
                        </View>
                    </View>
                    
                </KeyboardAwareScrollView>
            )
}
export default CheckoutScreen