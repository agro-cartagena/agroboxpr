import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text } from 'react-native';

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
                        placeholder='username'
                    />

                    <TextInput
                        style={styles.textEntry}
                        placeholder='password'
                    />
                </View>

                <View style={[styles.container, styles.buttonContainer]}>
                    <Text>Olvidó contraseña o nombre de usuario?</Text>

                    <Button
                        style={styles.button}
                        title="Acceder"
                    />

                    <Text>Crear cuenta nueva</Text>                   
                </View>
            </ScrollView>
        )
    }
} 

