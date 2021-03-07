import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './LoginScreenStylesheet';
import global_styles from '../../styles';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[global_styles.container, global_styles.screen]}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/agrobox_logo.png')}
                    />
                </View>
                
                <View style={[global_styles.container, styles.form]}>
                    <TextInput
                        style={[global_styles.textEntry, global_styles.shadow]}
                        placeholder='Correo Electrónico'
                        placeholderTextColor='black'
                    />

                    <TextInput
                        style={[global_styles.textEntry, global_styles.shadow]}
                        placeholder='Contraseña'
                        placeholderTextColor='black'
                    />

                    <Text style={styles.text}>Problemas para acceder?<Text style={{color: '#5EAE33'}}> Presione aquí.</Text></Text>
                </View>

                <View style={global_styles.container}>

                    <TouchableOpacity style={[global_styles.button, global_styles.shadow]}>
                        <Text style={styles.text}>Acceder</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>Crear cuenta nueva</Text>                
                </View>
            </ScrollView>
        )
    }
} 

