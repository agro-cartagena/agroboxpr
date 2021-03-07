import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './RegisterScreenStylesheet';
import global_styles from '../../styles';

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
                        placeholder = 'Nombre y Apellidos' 
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
                        placeholder = 'Entre la Contraseña nuevamente'
                        placeholderTextColor='black'
                        secureTextEntry = {true}
                    />  
                    <TextInput
                        style = {[global_styles.textEntry, global_styles.shadow]}
                        placeholder = 'Número de teléfono'
                        placeholderTextColor='black'
                    />
                </View>

                <View style={global_styles.container}>

                    <TouchableOpacity style = {[global_styles.button, global_styles.shadow]} >
                        <Text style = {styles.btntext}> Registrar</Text>
                    </TouchableOpacity>

                    <Text style = {styles.textDecoration}> Ya tienes una cuenta? <Text style = {styles.textClick}> Presione aquí</Text></Text>
                </View>

            </ScrollView>
        )
    }
}


