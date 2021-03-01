import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text } from 'react-native';

import styles from './LoginScreenStylesheet';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, styles.screen]}>
                <View style={styles.container}>
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

                <View style={styles.container}>
                    <Button
                        style={styles.button}
                        title="Sign in"
                    />
                    <Text>New to AgroBoxPR? </Text>
                    <Text>Register here</Text>                   
                </View>
            </ScrollView>
        )
    }
}