import React from 'react';
import { View, Text, Alert, LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Buffer } from 'buffer'

import styles from './LoginScreenStylesheet';
import global_styles from '../../../styles';
import Navigator from '../../../Navigator'

import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import Logo from '../../../components/Logo/Logo';
import PopUp from '../../../components/PopUp/PopUp'

import Button from '../../../components/Button/Button'
import * as LocalAuthentication from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'

// Ignore harmless warnings.
LogBox.ignoreLogs(['FaceID is not available in Expo Client.', 
    'Invalid key provided to SecureStore.'])

const LoginScreen = (props) => {
    const [isCompatible, setIsCompatible] = React.useState(false)
    const [isEnrolled, setIsEnrolled] = React.useState(false)
    const [showPopup, setShowPopup] = React.useState(false)

    const [formData, changeFormData] = React.useState({
        email: '',
        password: ''
    })

    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        async function fetchData() {
            setIsCompatible(await LocalAuthentication.hasHardwareAsync())
            setIsEnrolled(await LocalAuthentication.isEnrolledAsync())
        }

        fetchData()
    }, [])

    const sendCredentials = async (userData) => {
        if(await UserService.instance.sendLogin(userData)) {
            
            let key = Buffer.from(userData.email),
                local_password = await SecureStore.getItemAsync(key.toString('hex'))

            if(local_password != userData.password) {

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
                                // Use Hexadecimal encoding to store password in SecureStore.
                                await SecureStore.setItemAsync(key.toString('hex'), userData.password)

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
                // redirect == true
                if(props.params)
                    Navigator.instance.goToCart()

                else
                    Navigator.instance.goToHome() 
            }    
        }
    }

    const validateBiometrics = async () => {
        // To enable biometrics authentication (FaceID/ TouchID),
        // Remove return statement. Feature only works in production.

        // return
        if(isCompatible && isEnrolled) {
            let key = Buffer.from(formData.email),
                password = await SecureStore.getItemAsync(key.toString('hex'))

            if(password) {
                let authenticated = await LocalAuthentication.authenticateAsync()
                if(authenticated.success) {
                    sendCredentials({ email: formData.email, password: password })
                }
            }   
        }
    }

    const displayForgotPassword = () => {
        return (
            <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Por favor ingrese su correo electrónico para restablecer su contraseña.</Text>

                <View style={styles.forgotPasswordFormInput}>
                    <FormInput
                        placeholder = 'Correo Electrónico'
                        onChangeText = {text => setEmail(text)} 
                        value={email.email}
                        keyboardType = "email-address"
                        autoCompleteType = "email"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.forgotPasswordButton}>
                    <Button
                        text="Enviar"
                        onTouch={async () => {
                            if(await UserService.instance.sendForgotPassword(email))
                                setTimeout(() => setShowPopup(false), 2500)
                        }}
                    />
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={styles.screen}
            resetScrollToCoords={{x: 0, y: 0}}
        >
            <Logo/>

            <PopUp
                state={showPopup}
                handler={setShowPopup}
                content={displayForgotPassword()}
            />
            
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
                        // textContentType="password"
                        secureTextEntry = {true}
                    />
                </View>
            </View>

            <Text style={[global_styles.text, styles.problemText]}>Problemas para acceder?
                <Text style={styles.clickText} onPress={() => setShowPopup(true)}> Presione aquí.</Text>
            </Text>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button
                    onTouch={() => sendCredentials(formData)}
                    text="Acceder"
                />
            </View>
            
            <Text style={global_styles.text} onPress={() => Navigator.instance.goToRegister(props.params)}>Crear cuenta nueva</Text>                
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen