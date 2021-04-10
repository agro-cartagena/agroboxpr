import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'

import styles from './CustomerAccountScreenStylesheet';
import global_styles from '../../styles';
import AccountInfo from '../../components/AccountInfo/AccountInfo'
import FormInput from '../../components/FormInput/FormInput'
import user from '../../db_mockup/user.db'
import UserService from '../../services/UserService'
import DropDown from '../../components/DropDown/DropDown'

import { goToHome, goToUserInfo } from '../../Navigator';

const CustomerAccountScreen = () => {

    const [formData, changeFormData] = React.useState({
        // full_name: 'Juan Del Pueblo',
        // email: 'juanito@gmail.com',
        // phone: '7875555555'
    })

    const [passwordData, changePasswordData] = React.useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const [addressData, changeAddressData] = React.useState({
        // street: 'Pueblito',
        // state: 'Puerto Rico',
        // city: 'San Juan',
        // zipcode: '00766'
    })

    React.useEffect(() => {
        async function fetchData() {
            // get user data and address data from api
            [userInfo, addressInfo] = await UserService.instance.getUserData()

            // set formData and addressData with fetched data. (triggers a re-render)
            // changeFormData(userInfo)
            // changeAddressData(addressInfo)
        }

        fetchData()
    }, [])

    const showAlert = () =>
        Alert.alert(
            "Alerta",
            "Estas seguro de que quieres cancelar los cambios?",
            [
                {
                    text: "Cancelar",
                    onPress: () => Alert.alert("Cancel Pressed"), //Function goes here?
                    style: "cancel",
                },
            ],
            {
                cancelable: true,

                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            }
        );

    const displayButton = () => {
        alert(JSON.stringify(addressData))
    }

    const getUserData = () => {
        return [
            <View style={styles.fContainer} key={'full_name'}>
                <Text style={styles.text}>Nombre: </Text>
                <FormInput                        
                    value = {formData.full_name}
                    onChangeText={text => changeFormData({...formData, full_name: text })}
                    textContentType="name"
                /> 
            </View>,
        
            <View style={styles.fContainer} key={'email'}>
                <Text style={styles.text}>Email: </Text>
                <FormInput
                    keyboardType="email-address"
                    value = {formData.email}
                    onChangeText={text => changeFormData({...formData, email: text})}
                />
            </View>,
            <View style={styles.fContainer} key={'phone'}>
                <Text style={styles.text}>Teléfono: </Text>
                <FormInput
                    keyboardType="phone-pad"
                    value = {formData.phone}
                    onChangeText={text => changeFormData({...formData, phone:text})}
                />
            </View>,
            <View style={styles.buttonContainer} key={'button'}>
                <Button
                    text="Guardar"
                    onTouch= {displayButton}
                    style={[styles.buttonContainer, styles.saveButton]}
                    onTouch={() => UserService.instance.updateUserInformation(formData)}
                />
            </View>
        ]
    }

    const getAddressData = () => {
        return [
            <View style={styles.fContainer} key={'street'}>
                <Text style={styles.text}>Dirección: </Text>
                <FormInput
                    value={addressData.street}
                    onChangeText={text => changeAddressData({...addressData, street: text })}
                />
               
            </View>,

            <View style={styles.fContainer} key={'city'}>
                <Text style={styles.text}>Ciudad: </Text>
                <FormInput
                    value={addressData.city}
                    onChangeText={text => changeAddressData({...addressData, city: text })}
                />
            </View>,

            <View style={styles.fContainer} key={'state'}>
                <Text style={styles.text}>Estado: </Text>
                <FormInput
                    value={addressData.state}
                    onChangeText={text => changeAddressData({...addressData, state: text })}
                />
            </View>,

            <View style={styles.fContainer} key={'zipcode'}>
                <Text style={styles.text}>Código postal: </Text>
                <FormInput
                    value={addressData.zipcode}
                    onChangeText={text => changeAddressData({...addressData, zipcode: text})}
                />
            </View>,
            <View style={styles.buttonContainer} key={'button'}>
                <Button
                    text="Guardar"
                    onTouch= {displayButton}
                    style={[styles.buttonContainer, styles.saveButton]}
                    onTouch={() => UserService.instance.updateAddress(addressData)}
                />
            </View>
        ]
    }

    const getPasswordFields = () => {
        return [
            <View style={styles.fContainer} key={'current_password'}>
                <Text style={styles.text}>Contraseña Actual: </Text>
                <FormInput
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={text => changePasswordData({...passwordData, current_password: text })}
                />
            </View>,

            <View style={styles.fContainer} key={'new_password'}>
                <Text style={styles.text}>Contraseña Nueva: </Text>
                <FormInput
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={text => changePasswordData({...passwordData, new_password: text })}
                />
            </View>,

            <View style={styles.fContainer} key={'confirm_new_password'}>
                <Text style={styles.text}>Confirmar Contraseña Nueva: </Text>
                <FormInput
                    textContentType="password"
                    secureTextEntry = {true}
                    onChangeText={text => changeAddressData({...passwordData, confirm_new_password: text})}
                />
            </View>,
            <View style={styles.buttonContainer} key={'button'}>
                <Button
                    text="Guardar"
                    onTouch= {displayButton}
                    style={[styles.buttonContainer, styles.saveButton]}
                    onTouch={() => UserService.instance.updatePassword(passwordData)}
                />
            </View>
        ]
    }

    return (

        <KeyboardAwareScrollView
            contentContainerStyle={[global_styles.container]}
        >
            <View style={styles.logo}>
                <Logo/>
            </View>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="User Data"
                    list={getUserData()}
                />
            </View>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="Password Data"
                    list={getPasswordFields()}
                />
            </View>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="Address Data"
                    list={getAddressData()}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default CustomerAccountScreen

{/* <Button
text="Cancelar"
onTouch={showAlert}
style={[styles.buttonContainer, styles.cancelButton]}
// onTouch={() => alert(JSON.stringify(boxData))}
/> */}