import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './LoginScreenStylesheet';
import global_styles from '../../styles';
import { goToRegister } from '../../Navigator';

import FormInput from '../../components/FormInput/FormInput'
import UserAuthenticationService from '../../services/UserAuthenticationService'
import Logo from '../../components/Logo/Logo';

import Button from '../../components/Button/Button'

const LoginScreen = () => {
    const [formData, changeFormData] = React.useState({
        email: '',
        password: ''
    })

    const sendCredentials = () => {
        UserAuthenticationService.instance.sendLogin(formData)
    }

    // This method is for debugging only.
    const displayToken = () => {
        alert(UserAuthenticationService.instance.webToken)
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={[global_styles.container, global_styles.screen, {height: '100%'}]}
            resetScrollToCoords={{x: 0, y: 0}}
        >
            <Logo/>
            
            <View style={[styles.form]}>
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
            
            <Text style={global_styles.text} onPress={goToRegister}>Crear cuenta nueva</Text>                
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen