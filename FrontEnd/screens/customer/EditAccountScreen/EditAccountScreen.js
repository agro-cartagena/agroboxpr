import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../../components/Button/Button'

import styles from './EditAccountScreenStyleSheet'
import global_styles from '../../../styles';

import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'

import DropDown from '../../../components/DropDown/DropDown'
import Localizer from '../../../components/Localizer/Localizer'

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
                    value = {userData.name}
                    onChangeText={text => changeUserData({...userData, name: text })}
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
                    value = {String(userData.phone)}
                    onChangeText={text => changeUserData({...userData, phone:text})}
                />
            </View>,

            <View style={styles.buttonContainer} key={'buttons'}>
                <View style={styles.button}>
                    <Button
                        text="Guardar"
                        style={{backgroundColor: '#EAC71D'}}
                        onTouch={async () => {
                            if(await UserService.instance.updateUserInformation(userData))
                                changeUserData({...userData})
                        }}
                    />
                </View>
            </View>   
        ]
    }

    const getAddressFields = () => {
        return [
            <View style={styles.fContainer} key={'address'}>
                <Text style={styles.text}>Calle: </Text>
                <FormInput
                    value={addressData.address}
                    onChangeText={text => changeAddressData({...addressData, address: text })}
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
                <View style={styles.button}>
                    <Button
                        text="Guardar"
                        style={{backgroundColor: '#EAC71D'}}
                        onTouch={async () => {
                            if(await UserService.instance.updateAddress(addressData))
                                changeAddressData({...addressData})
                        }}
                    />
                </View>

                <View style={styles.localizerContainer}>
                    <Localizer
                        addressHandler={changeAddressData}
                    />
                </View>
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
                    placeholder={""}
                />
            </View>,

            <View style={styles.fContainer} key={'new_password'}>
                <Text style={styles.text}>Contraseña Nueva: </Text>
                <FormInput
                    textContentType="password"
                    secureTextEntry={true}
                    onChangeText={text => changePasswordData({...passwordData, new_password: text })}
                    placeholder={""}
                />
            </View>,

            <View style={styles.fContainer} key={'confirm_new_password'}>
                <Text style={styles.text}>Confirmar Contraseña Nueva: </Text>
                <FormInput
                    textContentType="password"
                    secureTextEntry = {true}
                    onChangeText={text => changePasswordData({...passwordData, confirm_new_password: text})}
                    placeholder={""}
                />
            </View>,

            <View style={styles.buttonContainer} key={'button'}>
                <View style={styles.button}>
                    <Button
                        text="Guardar"
                        style={{backgroundColor: '#EAC71D'}}
                        onTouch={async () => {
                            if(await UserService.instance.updatePassword(passwordData)) 
                                changePasswordData({})
                            
                        }}
                    />
                </View>
            </View>
        ]
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[global_styles.container]}
        >
            <Text style={styles.header}>Mi Información</Text>

            <View style={[global_styles.container, styles.formContainer]}>
                <DropDown
                    title="Personal"
                    list={getUserFields()}
                    active={true}
                />
                <DropDown
                    title="Contraseña"
                    list={getPasswordFields()}
                />
                <DropDown
                    title="Dirección Física"
                    list={getAddressFields()}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default EditAccountScreen