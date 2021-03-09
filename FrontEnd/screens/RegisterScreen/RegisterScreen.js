import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './RegisterScreenStylesheet';
import global_styles from '../../styles';
import { goToLogin } from '../../Navigator';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[global_styles.container, global_styles.screen]}> 
               
               {/* <View> */}
                   {/* Back button to be implemented HERE*/}
               {/* </View> */}

                <View style={styles.logoContainer}>
                    <Image
                        style = {styles.logo} 
                        source = {require('../../assets/agrobox_logo.png')}
                    />
                </View>

                <View style = {[global_styles.container,styles.form]}>
                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Nombre y Apellido(s)' 
                        placeholderTextColor='black'   
                    />

                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Correo Electrónico'
                        placeholderTextColor='black'
                    />
                    
                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Contraseña'
                        placeholderTextColor='black'
                        secureTextEntry = {true}
                    />  
                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Entre Contraseña Nuevamente'
                        placeholderTextColor='black'
                        secureTextEntry = {true}
                    />  
                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Número de Teléfono'
                        placeholderTextColor='black'
                    />
                </View>

                <View style={global_styles.container}>

                    <TouchableOpacity style = {[global_styles.button, global_styles.shadow]} >
                        <Text style = {global_styles.text}> Registrar</Text>
                    </TouchableOpacity>

                    <Text style = {global_styles.text}> Ya tienes una cuenta? <Text style = {styles.clickText} onPress={goToLogin}> Presione aquí.</Text></Text>
                </View>

            </ScrollView>
        )
    }
}


