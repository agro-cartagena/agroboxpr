import React from 'react';
import { View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as SecureStore from 'expo-secure-store'
import { Buffer } from 'buffer'

import styles from './RegisterScreenStylesheet';
import global_styles from '../../../styles';
import Navigator from '../../../Navigator'

import FormInput from '../../../components/FormInput/FormInput'
import UserService from '../../../services/UserService'
import Logo from '../../../components/Logo/Logo'
import Button from '../../../components/Button/Button'

const RegisterScreen = (props) => {

    const [formData, changeFormData] = React.useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })

    const sendCredentials = async (userData) => {
        if(await UserService.instance.sendRegistration(userData)) {
            Alert.alert(
                '¡Gracias por registrarse!', '¿Desea guardar su contraseña para acceso sencillo a su cuenta?',
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
                            let key = Buffer.from(userData.email)

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
        }
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={styles.screen}
            resetScrollToCoords={{x: 0, y: 0}}
        > 
            <Logo/>

            <View style = {[styles.form]}>
                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Nombre y Apellido(s)'
                        onChangeText = {text => changeFormData({...formData, full_name: text})} 
                        textContentType="name"
                    />
                </View>

                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Correo Electrónico'
                        onChangeText = {text => changeFormData({...formData, email: text})} 
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
                        secureTextEntry = {true}
                    />  
                </View>

                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Entre Contraseña Nuevamente'
                        onChangeText = {text => changeFormData({...formData, password_confirmation: text})} 
                        textContentType="password"
                        secureTextEntry = {true}
                    />
                </View>

                <View style={global_styles.formEntry}>
                    <FormInput
                        placeholder = 'Número de Teléfono'
                        onChangeText = {text => changeFormData({...formData, phone: text})} 
                        keyboardType = "phone-pad"
                    />
                </View>
            </View>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button
                    onTouch={() => sendCredentials(formData)}
                    text="Registrar"
                />
            </View>

            <Text style = {global_styles.text}> Ya tienes una cuenta? 
                <Text style = {styles.clickText} onPress={() => Navigator.instance.goToLogin(props.params)}> Presione aquí.</Text>
            </Text>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen