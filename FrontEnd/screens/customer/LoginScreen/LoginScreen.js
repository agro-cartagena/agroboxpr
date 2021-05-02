import React from 'react';
import { View, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './LoginScreenStylesheet';
import global_styles from '../../../styles';
import Navigator from '../../../Navigator'
import Loader from '../../../components/Loader/Loader'

import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import Logo from '../../../components/Logo/Logo';

import Button from '../../../components/Button/Button'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = (props) => {
    const[isCompatible, setIsCompatible] = React.useState(false)
    const[isEnrolled, setIsEnrolled] = React.useState(false)
    const[validating, setValidating] = React.useState(false)

    const [formData, changeFormData] = React.useState({
        email: '',
        password: ''
    })

    React.useEffect(() => {
        async function fetchData() {
            setIsCompatible(await LocalAuthentication.hasHardwareAsync())
            setIsEnrolled(await LocalAuthentication.isEnrolledAsync())
        }

        fetchData()
    }, [])

    const sendCredentials = async () => {
        setValidating(true)

        if(await UserService.instance.sendLogin(formData)) {
            setValidating(false)
        
            // To enable biometrics authentication,
            // Remove if(false) and uncomment the three lines prior to that one.

            // let local_password = await SecureStore.getItemAsync(formData.email)
            // local_password = atob(local_password)
            // if(local_password != formData.password) {
            if(false) {
                Alert.alert(
                    '¿Desea actualizar o guardar su contraseña?', '',
                    [
                        {
                            text: 'No',
                            style: 'cancel',
                            onPress: async () => {
                                // redirect == true
                                if(props.params)
                                    Navigator.instance.goToCart()
            
                                else
                                    Navigator.instance.goToHome()   
                            }
                        },
                        {
                            text: 'Aceptar',
                            onPress: async () => {
                                // Functionality needs to be properly tested.
                                let password = btoa(formData.password)
                                await SecureStore.setItemAsync(formData.email, password)

                                // redirect == true
                                if(props.params)
                                    Navigator.instance.goToCart()
                
                                else
                                    Navigator.instance.goToHome()  
                            }
                        }
                    ]
                )
            }  else {
                setValidating(false)

                // redirect == true
                if(props.params)
                    Navigator.instance.goToCart()

                else
                    Navigator.instance.goToHome() 
            }    
        } else { setValidating(false) }
    }

    // This method is for debugging only.
    const displayToken = () => {
        alert(UserService.instance.webToken)
    }

    const validateBiometrics = async () => {
        // To enable biometrics authentication (FaceID/ TouchID),
        // Remove if(false) and uncomment the line prior to that one.

        // if(isCompatible && isEnrolled) {
        if(false) {
            let password = await SecureStore.getItemAsync(formData.email)
            password = atob(password)

            if(password) {
                if(await LocalAuthentication.authenticateAsync()) {
                    changeFormData({...formData, password })
                    sendCredentials()
                }
            }   
        }
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={styles.screen}
            resetScrollToCoords={{x: 0, y: 0}}
        >
            <TouchableWithoutFeedback style={styles.loaderOverlay}>
                <Loader
                    loading={validating}
                />
            </TouchableWithoutFeedback>

            <Logo/>
            
            <View style={[styles.form]}>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Correo Electrónico'
                        onChangeText = {text => changeFormData({...formData, email: text})} 
                        onEndEditing={validateBiometrics}
                        keyboardType = "email-address"
                        autoCompleteType = "email"
                        autoCapitalize="none"
                    />
                </View>

                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Contraseña'
                        onChangeText = {text => changeFormData({...formData, password: text})} 
                        textContentType="password"
                        autoCompleteType="password"
                        secureTextEntry = {true}
                    />
                </View>
            </View>

            <Text style={[global_styles.text, styles.problemText]}>Problemas para acceder?
                <Text style={styles.clickText} onPress={displayToken}> Presione aquí.</Text>
            </Text>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button
                    onTouch={sendCredentials}
                    text="Acceder"
                />
            </View>
            
            <Text style={global_styles.text} onPress={() => Navigator.instance.goToRegister(props.params)}>Crear cuenta nueva</Text>                
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen