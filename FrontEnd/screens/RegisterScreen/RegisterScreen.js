import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './RegisterScreenStylesheet';
import global_styles from '../../styles';
import { goToLogin } from '../../Navigator';

import FormInput from '../../components/FormInput/FormInput'
import UserService from '../../services/UserService'
import Logo from '../../components/Logo/Logo'
import Button from '../../components/Button/Button'

const RegisterScreen = () => {

    const [formData, changeFormData] = React.useState({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })

    const sendCredentials = () => {
        UserService.instance.sendRegistration(formData)
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={[global_styles.container, global_styles.screen, {height: '100%'}]}
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
                    onTouch={sendCredentials}
                    text="Registrar"
                />
            </View>

            <Text style = {global_styles.text}> Ya tienes una cuenta? 
                <Text style = {styles.clickText} onPress={goToLogin}> Presione aquí.</Text>
            </Text>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen