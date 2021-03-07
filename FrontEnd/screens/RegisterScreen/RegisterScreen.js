import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './RegisterScreenStylesheet';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, styles.screen]}> 
               
               {/* <View> */}
                   {/* Back button to be implemented HERE*/}
               {/* </View> */}

                <View style={styles.logoContainer}>
                    <Image
                        style = {styles.logo} 
                        source = {require('../../assets/agrobox_logo.png')}
                    />
                </View>

                <View style = {[styles.container,styles.form]}>
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Nombre y Apellidos'    
                    />

                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Correo Electrónico'
                    />
                    
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Contraseña'
                        secureTextEntry = {true}
                    />  
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Entre la Contraseña nuevamente'
                        secureTextEntry = {true}
                    />  
                    <TextInput
                        style = {styles.textinput}
                        placeholder = 'Número de teléfono'
                    />
                </View>

<<<<<<< HEAD
                <View style={[styles.container,styles.buttonContainer]}>
=======
                <View style={styles.container}>
                    {/* <Button
                        style={styles.button}
                        title="Registrar"
                    /> */}
>>>>>>> ad59f5abd20308ecabaa78e9ca66d84b51bf3937

                    <TouchableOpacity style = {styles.button} >
                        <Text style = {styles.btntext}> Registrar</Text>
                    </TouchableOpacity>
<<<<<<< HEAD

                    <Text style = {styles.textDecoration}> Ya tienes una cuenta? <Text style = {styles.textClick}> Presione aquí</Text></Text>
=======
>>>>>>> ad59f5abd20308ecabaa78e9ca66d84b51bf3937
                </View>

            </ScrollView>
        )
    }
}


