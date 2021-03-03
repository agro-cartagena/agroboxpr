import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './RegisterScreenStylesheet';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container, styles.screen}> 
               
               {/* <View> */}
                   {/* Back button to be implemented HERE*/}
               {/* </View> */}

                <View style={styles.container}>
                    <Image
                        style = {styles.logo} 
                        source = {require('../../assets/agrobox_logo.png')}
                    />
                </View>

                <View style = {styles.container,styles.form}>
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Nombre'    
                    />
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Apellidos'
                    />

                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Nombre de usuario'
                    />
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Correo Electrónico'
                    />
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Número de teléfono'
                    />
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Contraseña'
                        secureTextEntry = {true}
                    />    
                </View>

                <View style={styles.container}>
                    <Button
                        style={styles.button}
                        title="Registrar"
                    />

                    {/* <TouchableOpacity style = {styles.button} >
                        <Text style = {styles.btntext}> Registrar</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        )
    }
}