import React from 'react';
import { View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../../components/Button/Button'
import Logo from '../../../components/Logo/Logo'

import styles from './EditAccountScreenStyleSheet'
import global_styles from '../../../styles';

import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import DropDown from '../../../components/DropDown/DropDown'

const EditAccountScreen = () => {

    const [userData, changeUserData] = React.useState({})

    const [passwordData, changePasswordData] = React.useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const [addressData, changeAddressData] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            const [userInfo, addressInfo] = await UserService.instance.getUserData()

            changeUserData(userInfo)
            changeAddressData(addressInfo)
        }

        fetchData()
    }, [])

    const getUserFields = () => {
        return [
            <View style={styles.fContainer} key={'full_name'}>
                <Text style={styles.text}>Nombre: </Text>
                <FormInput                        
                    value = {userData.full_name}
                    onChangeText={text => changeUserData({...userData, full_name: text })}
                    textContentType="name"
                /> 
            </View>,
        
            <View style={styles.fContainer} key={'email'}>
                <Text style={styles.text}>Email: </Text>
                <FormInput
                    keyboardType="email-address"
                    value = {userData.email}
                    onChangeText={text => changeUserData({...userData, email: text})}
                />
            </View>,
            <View style={styles.fContainer} key={'phone'}>
                <Text style={styles.text}>Teléfono: </Text>
                <FormInput
                    keyboardType="phone-pad"
                    value = {userData.phone}
                    onChangeText={text => changeUserData({...userData, phone:text})}
                />
            </View>,
            <View style={styles.buttonContainer} key={'button'}>
                <Button
                    text="Guardar"
                    style={[styles.buttonContainer, styles.saveButton]}
                    onTouch={() => UserService.instance.updateUserInformation(userData)}
                />
            </View>
        ]
    }

    const getAddressFields = () => {
        return [
            <View style={styles.fContainer} key={'street'}>
                <Text style={styles.text}>Calle: </Text>
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
                    onChangeText={text => changePasswordData({...passwordData, confirm_new_password: text})}
                />
            </View>,
            <View style={styles.buttonContainer} key={'button'}>
                <Button
                    text="Guardar"
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
                    title="Actualizar Información Personal"
                    list={getUserFields()}
                />
            </View>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="Actualizar Contraseña"
                    list={getPasswordFields()}
                />
            </View>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="Actualizar Dirección Física"
                    list={getAddressFields()}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EditAccountScreen