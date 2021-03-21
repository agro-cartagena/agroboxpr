import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './RegisterScreenStylesheet';
import global_styles from '../../styles';
import { goToLogin } from '../../Navigator';

import FormInput from '../../components/FormInput/FormInput'
import UserAuthenticationService from '../../services/UserAuthenticationService'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'

const RegisterScreen = () => {

    const [form, changeForm] = React.useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })

    const sendCredentials = () => {
        UserAuthenticationService.instance.sendRegistration(form)
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={[global_styles.container, global_styles.screen]}
            resetScrollToCoords={{x: 0, y: 0}}
        > 
            <Logo/>

            <View style = {[global_styles.container,styles.form]}>
                <FormInput
                    placeholder = 'Nombre y Apellido(s)'
                    onChangeText = {text => form.full_name = text} 
                    textContentType="name"
                />

                <FormInput
                    placeholder = 'Correo Electrónico'
                    onChangeText = {text => form.email = text} 
                    keyboardType = "email-address"
                    autoCompleteType = "email"
                    autoCapitalize="none"
                />
                
                <FormInput
                    placeholder = 'Contraseña'
                    onChangeText = {text => form.password = text} 
                    textContentType="password"
                    secureTextEntry = {true}
                />  

                <FormInput
                    placeholder = 'Entre Contraseña Nuevamente'
                    onChangeText = {text => form.password_confirmation = text} 
                    textContentType="password"
                    secureTextEntry = {true}
                />  

                <FormInput
                    placeholder = 'Número de Teléfono'
                    onChangeText = {text => form.phone = text} 
                    keyboardType = "phone-pad"
                />
            </View>

            <View style={[global_styles.container, styles.buttonContainer]}>
                <Button
                    onTouch={sendCredentials}
                    text="Registrar"
                />
            </View>
            <Text style = {global_styles.text}> Ya tienes una cuenta? <Text style = {styles.clickText} onPress={goToLogin}> Presione aquí.</Text></Text>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen