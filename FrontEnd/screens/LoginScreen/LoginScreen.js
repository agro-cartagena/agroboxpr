import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './LoginScreenStylesheet';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, styles.screen]}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/agrobox_logo.png')}
                    />
                </View>
                
                <View style={[styles.container, styles.form]}>
                    <TextInput
                        style={styles.textEntry}
                        placeholder='email'
                    />

                    <TextInput
                        style={styles.textEntry}
                        placeholder='password'
                    />

                    <Text>Problemas para acceder?<Text style={{color: '#5EAE33'}}> Presione aquí.</Text></Text>
                </View>

                <View style={[styles.container, styles.buttonContainer]}>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Acceder</Text>
                    </TouchableOpacity>

                    <Text style={{textDecorationLine: 'underline'}}>Crear cuenta nueva</Text>                
                </View>
            </ScrollView>
        )
    }
} 

