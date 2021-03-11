import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './LoginScreenStylesheet';
import global_styles from '../../styles';
import { goToRegister } from '../../Navigator';

import FormInput from '../../components/FormInput/FormInput'
import UserAuthenticationService from '../../services/UserAuthenticationService'

const LoginScreen = () => {
    const [form, changeForm] = React.useState({
        email: '',
        password: ''
    })

    const sendCredentials = () => {
        UserAuthenticationService.instance.sendLogin(form)
    }

    return (
        <ScrollView contentContainerStyle={[global_styles.container, global_styles.screen]}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/agrobox_logo.png')}
                />
            </View>
            
            <View style={[global_styles.container, styles.form]}>
                <FormInput
                    placeholder = 'Correo Electrónico'
                    onChangeText = {text => form.email = text} 
                    keyboardType = "email-address"
                    autoCompleteType = "email"
                />

                <FormInput
                    placeholder = 'Contraseña'
                    onChangeText = {text => form.password = text} 
                    textContentType="password"
                    autoCompleteType="password"
                    secureTextEntry = {true}
                />
                <Text style={global_styles.text}>Problemas para acceder?<Text style={styles.clickText}> Presione aquí.</Text></Text>
            </View>

            <View style={global_styles.container}>

                <TouchableOpacity style={[global_styles.button, global_styles.shadow]}>
                    <Text 
                        style={global_styles.text} 
                        onPress={sendCredentials}>Acceder</Text>
                </TouchableOpacity>

                <Text style={global_styles.text}  onPress={goToRegister}>Crear cuenta nueva</Text>                
            </View>
        </ScrollView>
    )
}

export default LoginScreen